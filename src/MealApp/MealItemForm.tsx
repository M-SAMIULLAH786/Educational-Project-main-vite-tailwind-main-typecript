import React, { useRef } from "react";
import Input from "./Input";

interface MealItemFormProps {
    id: string;
    onAddToCart: (amount: number) => void;
}

const MealItemForm: React.FC<MealItemFormProps> = ({ id, onAddToCart }) => {
    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current?.value || "0";
        const enteredAmountNumber = +enteredAmount;

        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            return;
        }

        onAddToCart(enteredAmountNumber);
    };

    return (
        <form onSubmit={submitHandler} className="flex items-center space-x-2">
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: "amount_" + id,
                    type: "number",
                    min: "1",
                    max: "5",
                    step: "1",
                    defaultValue: "1",
                }}
            />
            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                + Add
            </button>
        </form>
    );
};

export default MealItemForm;
