import React from "react";

interface CartItem {
    id: string;
    name: string;
    amount: number;
    price: number;
}

interface CartContextType {
    items: CartItem[];
    totalAmount: number;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
}

const CartContext = React.createContext<CartContextType>({
    items: [],
    totalAmount: 0,
    addItem: () => { },
    removeItem: () => { },
});

export default CartContext;
