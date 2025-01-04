/* eslint-disable prettier/prettier */
export type NavState = 'Extract' | 'Pricing & Plans' | 'API Intergration';

export type Prices = {
    plan: string;
    text: string;
    amount: number;
    traits: string[];
    button: { 
        text: string
        class: string
    };
    style: string;
};

export type ImageData = {
    name: string
    size: number
    type: string
    path: string
  }