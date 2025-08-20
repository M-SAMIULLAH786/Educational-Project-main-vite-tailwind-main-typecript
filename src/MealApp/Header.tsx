import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealImage from "./meals.jpg";

interface HeaderProps {
    onShowCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowCart }) => {
    return (
        <>
            <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-2xl font-bold">Flavor Haven</h1>
                <HeaderCartButton onClick={onShowCart} />
            </header>

            <div className="w-full h-64 overflow-hidden">
                <img
                    src={mealImage}
                    alt="Delicious meals"
                    className="w-full h-full object-cover"
                />
            </div>
        </>
    );
};

export default Header;
