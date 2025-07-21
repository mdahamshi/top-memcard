import { useEffect, useState } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children }) {
  const [showClass, setShowClass] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowClass(true), 10);
    } else {
      setShowClass(false);
    }
  }, [isOpen]);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${showClass ? 'show' : ''}`}
      onClick={onClose}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
