import React from "react";

const MealSummary: React.FC = () => {
    return (
        <section className="text-center max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">
                Delicious Food, Delivered To You
            </h2>
            <p className="mb-2 text-gray-700">
                Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p className="text-gray-700">
                All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chefs!
            </p>
        </section>
    );
};

export default MealSummary;
