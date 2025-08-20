import React, { useRef, useState } from "react";
import Input from "./Input";

interface OrderFormProps {
    onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onCancel }) => {
    const [formIsValid, setFormIsValid] = useState(true);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);

    const confirmHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredName = nameInputRef.current?.value.trim();
        const enteredAddress = addressInputRef.current?.value.trim();

        if (!enteredName || !enteredAddress) {
            setFormIsValid(false);
            return;
        }

        console.log("Order placed!", {
            name: enteredName,
            address: enteredAddress,
        });

        // Reset or send to backend
    };

    return (
        <form onSubmit={confirmHandler} className="mt-4">
            {!formIsValid && (
                <p className="text-red-500 mb-2">Please fill all fields correctly.</p>
            )}
            <Input
                label="Your Name"
                input={{ id: "name", type: "text" }}
                ref={nameInputRef}
            />
            <Input
                label="Address"
                input={{ id: "address", type: "text" }}
                ref={addressInputRef}
            />
            <div className="flex justify-end gap-2 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default OrderForm;
