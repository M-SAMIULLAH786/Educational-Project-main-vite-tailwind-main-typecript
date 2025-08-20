import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import CartContext from "./CartContext";

interface HeaderCartButtonProps {
    onClick: () => void;
}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = ({ onClick }) => {
    const [isBumping, setIsBumping] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full transition ${isBumping ? "animate-bounce" : ""
        }`;

    useEffect(() => {
        if (items.length === 0) return;

        setIsBumping(true);

        const timer = setTimeout(() => setIsBumping(false), 300);
        return () => clearTimeout(timer);
    }, [items]);

    return (
        <button className={btnClasses} onClick={onClick}>
            <span>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className="bg-green-500 px-2 py-1 rounded-full text-sm">
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;
