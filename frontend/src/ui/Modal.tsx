import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
  closeOnBackdrop?: boolean;
}

const ANIMATION_DURATION = 200;

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '720px',
  closeOnBackdrop = true,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }
    if (!shouldRender) return;
    setIsClosing(true);
    const timer = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
    }, ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  const backdropClass = isClosing ? 'fade-out' : 'fade-in';
  const contentClass = isClosing ? 'modal-out' : 'modal-in';

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center bg-black/50 ${backdropClass} p-4 overflow-y-auto`}
      onClick={() => closeOnBackdrop && onClose()}
    >
      <div
        className={`${contentClass} bg-bg rounded-2xl shadow-xl w-full my-8 border border-line`}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title !== undefined && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <h2 className="font-display text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Mbyll"
              className="w-8 h-8 rounded-full hover:bg-surface text-ink-soft flex items-center justify-center text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
