export interface Product {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    category: string;
    tag: string;
    image: string;
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

export const products: Product[] = [
    {
        id: "velvet-lounge-sofa",
        name: "Velvet Lounge Sofa",
        price: "$2,499",
        category: "Living Room",
        tag: "Best Seller",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.9,
        reviewCount: 124,
        description: "Indulge in the ultimate luxury with our signature Velvet Lounge Sofa. Hand-tufted with premium Italian velvet and supported by a solid walnut frame, this piece combines timeless elegance with unparalleled comfort.",
        details: {
            material: "Premium Italian Velvet, Solid American Walnut",
            dimensions: "90\"W x 38\"D x 32\"H",
            finish: "Hand-rubbed Walnut Oil",
            weight: "145 lbs"
        },
        features: [
            "High-density foam cushions with down toppers",
            "Reinforced corner-blocked joinery",
            "Removable back cushions for easy maintenance",
            "Solid walnut tapered legs"
        ]
    },
    {
        id: "nordic-oak-dining",
        name: "Nordic Oak Dining",
        price: "$1,850",
        category: "Dining",
        tag: "New Arrival",
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1577146313131-408992b23a7c?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewCount: 92,
        description: "Minimalist Scandinavian design meets exceptional craftsmanship. The Nordic Oak Dining table features clean lines and a subtle tapered edge, making it the perfect centerpiece for modern gatherings.",
        details: {
            material: "Solid White Oak",
            dimensions: "72\"W x 36\"D x 30\"H",
            finish: "Matte Natural Lacquer",
            weight: "110 lbs"
        },
        features: [
            "Comfortably seats up to 6 adults",
            "Traditional mortise and tenon joinery",
            "Eco-friendly sustainable wood sourcing",
            "Heat and water-resistant finish"
        ]
    },
    {
        id: "minimalist-pendant",
        name: "Minimalist Pendant",
        price: "$420",
        category: "Lighting",
        tag: "Luxury",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524484430852-c0732899479e?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.7,
        reviewCount: 56,
        description: "Add a touch of architectural elegance to your home. This minimalist pendant light crafted from brushed brass provides a soft, warm glow that enhances any interior atmosphere.",
        details: {
            material: "Brushed Brass, Hand-blown Glass",
            dimensions: "12\" Diameter",
            finish: "Antique Brass",
            weight: "8 lbs"
        },
        features: [
            "Adjustable drop length up to 60\"",
            "Dimmable LED compatibility",
            "Easy installation mounting kit included",
            "UL listed for dry locations"
        ]
    },
    {
        id: "walnut-coffee-table",
        name: "Walnut Coffee Table",
        price: "$890",
        category: "Living Room",
        tag: "Artisan",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.9,
        reviewCount: 78,
        description: "Organic forms meet modern precision. Our Walnut Coffee Table features a live-edge inspired silhouette and architectural blackened steel legs, creating a stunning balance of materials.",
        details: {
            material: "Solid Black Walnut, Powder-coated Steel",
            dimensions: "48\"W x 24\"D x 16\"H",
            finish: "Satin Clear Coat",
            weight: "55 lbs"
        },
        features: [
            "Solid 1.5\" thick walnut top",
            "Industrial grade steel frame",
            "Unique grain patterns in every piece",
            "Anti-scratch floor protectors"
        ]
    },
    {
        id: "modern-armchair",
        name: "Modern Armchair",
        price: "$950",
        category: "Living Room",
        tag: "Trending",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.6,
        reviewCount: 45,
        description: "The perfect companion for your reading nook. This modern armchair features a deep seat and ergonomic backrest, upholstered in our most durable linen-blend fabric.",
        details: {
            material: "Linen Blend, Solid Birch Wood",
            dimensions: "32\"W x 34\"D x 35\"H",
            finish: "Black Stained Wood",
            weight: "48 lbs"
        },
        features: [
            "Sinuous spring suspension system",
            "Removable seat cushion",
            "Stain-resistant fabric treatment",
            "Ships fully assembled"
        ]
    },
    {
        id: "marble-side-table",
        name: "Marble Side Table",
        price: "$580",
        category: "Living Room",
        tag: "Classic",
        image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=800",
        gallery: [
            "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewCount: 31,
        description: "Elegance in small proportions. A solid Carrara marble top rests upon a slender tripod base, offering a sophisticated surface for your essentials.",
        details: {
            material: "Carrara Marble, Iron",
            dimensions: "18\" Diameter x 22\"H",
            finish: "Matte Black Powder Coat",
            weight: "32 lbs"
        },
        features: [
            "Genuine Italian marble top",
            "Naturally unique veining",
            "Sturdy three-leg design",
            "Ideal for small spaces"
        ]
    }
];
