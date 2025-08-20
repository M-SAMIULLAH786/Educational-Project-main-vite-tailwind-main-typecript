import React, { useContext, useState } from "react";
import Modal from "./Modal";
import CartItem from "./CartItem";
import CartContext from "./CartContext";
import OrderForm from "./OrderForm";
interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id: string) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item: any) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const cartItems = (
        <ul className="max-h-60 overflow-auto">
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={() => cartItemRemoveHandler(item.id)}
                    onAdd={() => cartItemAddHandler(item)}
                />
            ))}
        </ul>
    );

    return (
        <Modal onClose={onClose}>
            {cartItems}
            <div className="flex justify-between items-center font-bold text-xl my-4">
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <OrderForm onCancel={onClose} />}
            {!isCheckout && (
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    {hasItems && (
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            onClick={orderHandler}
                        >
                            Order
                        </button>
                    )}
                </div>
            )}
        </Modal>
    );
};

export default Cart;
