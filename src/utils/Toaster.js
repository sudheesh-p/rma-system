import React, { useState, useEffect } from 'react';

const Toaster = ({ message, show, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [show, duration, onClose]);

    return (
        <div
            className={`toast align-items-center text-bg-success position-fixed bottom-0 end-0 m-3 ${show ? 'show' : 'hide'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button
                    type="button"
                    className="btn-close me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
};

export default Toaster;
