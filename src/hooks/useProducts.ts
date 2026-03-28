import { useState, useEffect } from "react";
import { type Product } from "../data/products";
import { ENV } from "../config/env.config";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ENV.API_BASE_URL}/api/products`)
            .then(res => res.json())
            .then(data => {
                const mappedProducts: Product[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: `₹${item.price.toLocaleString()}`,
                    category: item.category?.name || "General",
                    tag: item.tags?.[1] || "New",
                    img: item.images?.[0]?.url || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
                    gallery: item.images?.map((img: any) => img.url) || [],
                    rating: 4.8, // Mocked rating
                    reviewCount: 42, // Mocked 
                    description: item.description || item.aboutItem || "",
                    details: {
                        material: item.productMaterial || item.material || "Standard",
                        dimensions: item.productDimension || "Standard Dimensions",
                        finish: item.styleAndPatterns || "Standard Finish",
                        weight: item.weight || "0 lbs"
                    },
                    features: item.specialFeatures || item.includedComponents || [],
                    isTopProduct: item.isTopProduct || false
                }));
                setProducts(mappedProducts);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch products:", err);
                setLoading(false);
            });
    }, []);

    return { products, loading };
}
