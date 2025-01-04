/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import puppeteer from 'puppeteer'; // For handling dynamic content

const deleteAllImages = (directory) => {
  if (fs.existsSync(directory)) {
    // Read all files in the directory
    const files = fs.readdirSync(directory);

    // Delete each file
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.unlinkSync(filePath); // Delete the file
    });

    console.log(`Deleted ${files.length} files from ${directory}`);
  } else {
    console.log(`Directory ${directory} does not exist.`);
  }
};

export async function extractImagesFromUrl(
  url,
  saveDirectory = 'extracted_images'
) {
  try {
    // Create the save directory if it doesn't exist

    // Delete all existing images in the folder
    deleteAllImages(saveDirectory);

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory, { recursive: true });
      console.log(`Created directory: ${saveDirectory}`);
    }

    // Fetch the HTML content of the website
    const response = await axios.get(url);
    const html = response.data;

    // Load the HTML into cheerio
    const $ = cheerio.load(html);

    // Extract all image and SVG elements
    const imageElements = $('img, svg');
    const imageUrls = [];
    const savedFiles = [];

    // Function to extract URLs from background-image
    const extractBackgroundImageUrl = (style) => {
      const match = style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/i);
      return match ? match[1] : null;
    };

    // Check for background images in inline styles
    $('*').each((_, element) => {
      const style = $(element).attr('style');
      if (style) {
        const bgImageUrl = extractBackgroundImageUrl(style);
        if (bgImageUrl) {
          imageUrls.push(bgImageUrl);
        }
      }
    });

    // Check for background images in external stylesheets
    const stylesheets = $('link[rel="stylesheet"]');
    for (const stylesheet of stylesheets) {
      const href = $(stylesheet).attr('href');
      if (href) {
        try {
          const stylesheetUrl = new URL(href, url).href;
          const stylesheetResponse = await axios.get(stylesheetUrl);
          const cssContent = stylesheetResponse.data;

          // Extract background-image URLs from CSS
          const bgImageUrls =
            cssContent.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/gi) ||
            [];
          for (const bgImage of bgImageUrls) {
            const bgImageUrl = extractBackgroundImageUrl(bgImage);
            if (bgImageUrl) {
              imageUrls.push(bgImageUrl);
            }
          }
        } catch (error) {
          console.error(`Error fetching stylesheet ${href}: ${error.message}`);
        }
      }
    }

    // Extract images and SVGs
    imageElements.each((_, element) => {
      if (element.tagName === 'img') {
        // Get the src attribute for images
        const src = $(element).attr('src');
        if (src) {
          imageUrls.push(src);
        }
      } else if (element.tagName === 'svg') {
        // Get the inner HTML for SVGs
        const svgContent = $(element).html();
        if (svgContent) {
          const svgFileName = `svg_${imageUrls.length + 1}.svg`;
          const svgFilePath = path.join(saveDirectory, svgFileName);

          // Wrap the SVG content in a valid <svg> tag
          const wrapSvgContent = (svgContent) => {
            // Extract the viewBox from the original SVG content (if it exists)
            const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/);
            const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 100 100'; // Default viewBox

            // Wrap the SVG content in a valid <svg> tag
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${svgContent}</svg>`;
          };

          // Usage
          const wrappedSvgContent = wrapSvgContent(svgContent);

          fs.writeFileSync(svgFilePath, wrappedSvgContent);
          savedFiles.push(svgFilePath);
          console.log(`Saved SVG: ${svgFilePath}`);
        }
      }
    });

    // Function to sanitize filenames
    const sanitizeFilename = (url) => {
      // Remove query strings and hashes
      const cleanUrl = url.split('?')[0].split('#')[0];

      // Extract the filename from the URL
      let filename = path.basename(cleanUrl);

      // Replace invalid characters with underscores
      filename = filename.replace(/[^a-zA-Z0-9\-_.]/g, '_');

      // Truncate filename to a reasonable length (e.g., 100 characters)
      const maxLength = 100;
      if (filename.length > maxLength) {
        const extension = path.extname(filename);
        const baseName = path.basename(filename, extension);
        filename = `${baseName.substring(0, maxLength - extension.length)}${extension}`;
      }

      return filename;
    };

    // Function to ensure directory exists
    const ensureDirectoryExists = (filePath) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    };

    // Function to download image with retry mechanism
    const downloadImageWithRetry = async (imageUrl, filePath, retries = 3) => {
      const protocol = imageUrl.startsWith('https') ? https : http;

      for (let i = 0; i < retries; i++) {
        try {
          await new Promise((resolve, reject) => {
            protocol
              .get(imageUrl, (response) => {
                const file = fs.createWriteStream(filePath);
                response.pipe(file);
                file.on('finish', () => {
                  file.close();
                  resolve();
                });
              })
              .on('error', (err) => {
                reject(err);
              });
          });
          return; // Success, exit the retry loop
        } catch (error) {
          console.error(`Attempt ${i + 1} failed: ${error.message}`);
          if (i === retries - 1) throw error; // Throw error if all retries fail
        }
      }
    };

    // Download and save images
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      let fullImageUrl;

      try {
        // Handle relative URLs and URLs starting with '//'
        if (imageUrl.startsWith('//')) {
          fullImageUrl = new URL(`https:${imageUrl}`).href;
        } else if (imageUrl.startsWith('/')) {
          fullImageUrl = new URL(imageUrl, url).href;
        } else {
          fullImageUrl = new URL(imageUrl, url).href;
        }

        // Sanitize the filename
        const imageFileName = `image_${i + 1}_${sanitizeFilename(imageUrl)}`;
        const imageFilePath = path.join(saveDirectory, imageFileName);

        // Ensure the directory exists
        ensureDirectoryExists(imageFilePath);

        // Download the image with retry mechanism
        await downloadImageWithRetry(fullImageUrl, imageFilePath);
        savedFiles.push(imageFilePath);
        console.log(`Downloaded: ${imageFilePath}`);
      } catch (error) {
        console.error(`Error processing ${imageUrl}: ${error.message}`);
      }
    }

    return {
      success: true,
      savedFiles,
      message: 'Images extracted successfully!',
    };
  } catch (error) {
    console.error(`Error extracting images: ${error.message}`);
    return {
      success: false,
      message: `Failed to extract images: ${error.message}`,
    };
  }
}
