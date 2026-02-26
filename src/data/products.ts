export interface Product {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    category: string;
    tag: string;
    img: string;
    gallery: string[];
    rating: number;
    reviewCount: number;
    description: string;
    details: {
        material: string;
        dimensions: string;
        finish: string;
        weight: string;
    };
    features: string[];
}

// No seed data - fetching from backend
export const products: Product[] = [];
