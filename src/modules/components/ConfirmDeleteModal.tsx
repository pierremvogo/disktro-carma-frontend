"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// Icône Trash
const Trash = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

type ConfirmDeleteModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  itemName?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDeleteModal({
  open,
  title = "Confirmer la suppression",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est définitive.",
  itemName,
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const isBrowser = typeof window !== "undefined";

  // 🔒 Gestion du scroll : lock quand open = true, restore quand open = false
  useEffect(() => {
    if (!isBrowser) return;

    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open, isBrowser]);

  // En SSR ou si pas open → ne pas rendre la modale
  if (!isBrowser || !open) return null;

  const modalContent = (
    <div
      className="
        fixed inset-0 z-[9999] 
        flex items-center justify-center 
        bg-black/60 backdrop-blur-sm
        px-4
      "
    >
      <div
        className="
          w-full 
          max-w-md sm:max-w-lg 
          bg-[#0a0a15]/90 
          border border-white/20 
          rounded-xl 
          p-5 sm:p-6 
          shadow-xl 
          max-h-[90vh] 
          overflow-y-auto
        "
      >
        {/* Titre */}
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3">
          {title}
        </h3>

        {/* Message */}
        <p className="text-xs sm:text-sm text-white/80 mb-4 leading-relaxed">
          {message}
          {itemName && (
            <>
              <br />
              <span className="font-semibold text-white">{itemName}</span>
            </>
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="
              w-full sm:w-auto
              px-4 py-2 
              rounded-lg 
              bg-white/10 hover:bg-white/20 
              text-white text-xs sm:text-sm 
              transition-all cursor-pointer
            "
          >
            Annuler
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              w-full sm:w-auto
              px-4 py-2 
              rounded-lg 
              bg-red-500/80 hover:bg-red-600/80 
              text-white text-xs sm:text-sm 
              transition-all 
              flex items-center justify-center gap-2 
              disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
            "
          >
            <Trash size={16} />
            {isLoading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
