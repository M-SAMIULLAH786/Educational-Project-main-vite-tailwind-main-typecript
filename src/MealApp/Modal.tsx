import React, { Fragment } from "react";
import ReactDOM from "react-dom";

interface BackdropProps {
    onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
        />
    );
};

interface ModalOverlayProps {
    children: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
    return (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg bg-white rounded-lg shadow-lg p-6 z-50">
            {children}
        </div>
    );
};

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

const portalElement = document.getElementById("overlays");

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
    if (!portalElement) return null;

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </Fragment>
    );
};

export default Modal;
