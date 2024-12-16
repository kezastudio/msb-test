// components/Modal.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-50"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        aria-hidden="true"
      >
        <div className="relative bg-white p-6 rounded-md shadow-lg max-w-md w-full">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;




