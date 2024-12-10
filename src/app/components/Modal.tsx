import { ReactNode, useState, MouseEvent, useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset position when modal closes
  useEffect(() => {
    if (!isOpen) {
      setOffset({ x: 0, y: 0 });
      setDragStart({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div
        ref={modalRef}
        className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-lg w-full mx-4 relative shadow-xl ring-1 ring-black/5 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};
