export interface Producto {
    id: number;
    name: string;
    category: string;
    description?: string;
    image?: string;
    price: number;
    quantity:   number;
    images?: string[];
}