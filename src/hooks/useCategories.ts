import { useState, useEffect } from "react";
import { ENV } from "../config/env.config";

export interface Category {
    id: string;
    name: string;
    description?: string;
    image?: string | null;
    _count?: {
        products: number;
    };
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${ENV.API_BASE_URL}/api/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch categories:", err);
                setLoading(false);
            });
    }, []);

    return { categories, loading };
}
