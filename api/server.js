import express from 'express';
import cors from 'cors';
import { extractImagesFromUrl } from './utils/imageExtractor.js'; // Use .js extension for transpiled files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// CORS Middleware
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://172.20.10.3:5173',
      'http://172.20.10.4:5173',
      'http://localhost:5173',
      'http://localhost:3001',
      'https://getimgio.netlify.app', // Add your Netlify frontend URL here
    ];

    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Allow OPTIONS for preflight requests
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials (if needed)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Serve static files from the "extracted_images" directory
app.use(
  '/extracted_images',
  express.static(path.join(__dirname, 'extracted_images'), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === '.svg') {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
      // Explicitly set the Access-Control-Allow-Origin header
      res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.3:5173');
    },
  })
);

// Parse JSON request bodies
app.use(express.json());

// POST endpoint to extract images
app.post('/api/extract-images', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required' });
  }

  try {
    const result = await extractImagesFromUrl(url);
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        savedFiles: result.savedFiles,
      });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error extracting images:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to extract images' });
  }
});

// GET endpoint to fetch extracted images
app.get('/api/images', (req, res) => {
  const imagesDirectory = path.join(__dirname, 'extracted_images');

  // Check if the directory exists
  if (!fs.existsSync(imagesDirectory)) {
    return res.status(404).json({ success: false, message: 'No images found' });
  }

  try {
    const images = fs.readdirSync(imagesDirectory).map((file) => {
      const filePath = path.join(imagesDirectory, file);
      const stats = fs.statSync(filePath); // Get file stats

      // Construct the URL for the frontend to access the image
      const frontendUrl = `/extracted_images/${file}`;

      return {
        name: file,
        path: frontendUrl, // URL for the frontend to access the image
        size: stats.size, // File size in bytes
        type: path.extname(file).replace('.', '').toUpperCase(), // File type (e.g., JPG, PNG)
      };
    });

    // Send the response with the list of images
    res.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch images' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
