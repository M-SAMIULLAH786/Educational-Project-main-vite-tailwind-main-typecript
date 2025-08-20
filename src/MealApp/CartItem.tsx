import React from "react";

interface CartItemProps {
    name: string;
    amount: number;
    price: number;
    onRemove: () => void;
    onAdd: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, amount, price, onRemove, onAdd }) => {
    const formattedPrice = `$${price.toFixed(2)}`;

    return (
        <li className="flex justify-between items-center border-b border-gray-300 py-4">
            <div>
                <h2 className="font-semibold text-lg">{name}</h2>
                <div className="flex gap-4 items-center">
                    <span className="text-green-600 font-bold">{formattedPrice}</span>
                    <span className="bg-gray-200 px-2 py-1 rounded-md">x {amount}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                    onClick={onRemove}
                >
                    −
                </button>
                <button
                    className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white"
                    onClick={onAdd}
                >
                    +
                </button>
            </div>
        </li>
    );
};

export default CartItem;
