import { useState, useEffect, useCallback } from "react";
import { type Product } from "../data/products";

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/products/${id}`);
            if (!response.ok) throw new Error("Product not found");
            const item = await response.json();

            const mappedProduct: Product = {
                id: item.id,
                name: item.name,
                price: `$${item.price.toLocaleString()}`,
                category: item.tags?.[0] || item.series || "General",
                tag: item.tags?.[1] || "New",
                image: item.images?.[0]?.url || "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
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
                features: item.specialFeatures || item.includedComponents || []
            };

            setProduct(mappedProduct);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch product:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch product");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return { product, loading, error, refetch: fetchProduct };
}
