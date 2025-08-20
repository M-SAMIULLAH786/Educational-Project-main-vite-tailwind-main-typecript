import React from "react";
import MealSummary from "./MealSummary";
import AvailableMeals from "./AvailableMeals";

const Meals: React.FC = () => {
    return (
        <>
            <MealSummary />
            <AvailableMeals />
        </>
    );
};

export default Meals;
