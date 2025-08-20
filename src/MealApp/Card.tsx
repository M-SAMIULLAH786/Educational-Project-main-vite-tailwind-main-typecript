import React, { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4">{children}</div>
    );
};

export default Card;
