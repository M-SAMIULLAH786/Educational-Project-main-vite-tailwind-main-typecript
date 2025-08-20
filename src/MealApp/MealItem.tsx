import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "./CartContext";

interface MealItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
}

const MealItem: React.FC<MealItemProps> = ({ id, name, description, price }) => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (amount: number) => {
        cartCtx.addItem({ id, name, amount, price });
    };

    const formattedPrice = `$${price.toFixed(2)}`;

    return (
        <li className="border-b border-gray-300 py-4 flex justify-between">
            <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-500 italic">{description}</p>
                <span className="text-green-600 font-bold">{formattedPrice}</span>
            </div>
            <MealItemForm id={id} onAddToCart={addToCartHandler} />
        </li>
    );
};

export default MealItem;
