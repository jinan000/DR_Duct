import type { CSSProperties } from 'react';

interface QuoteButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  id?: string;
  compact?: boolean;
}

export default function QuoteButton({
  label = 'BOOK AN APPOINTMENT',
  onClick,
  className = '',
  style,
  id,
  compact = false,
}: QuoteButtonProps) {
  return (
    <button
      id={id}
      type="button"
      className={`quote-btn ${compact ? 'quote-btn--compact' : ''} ${className}`}
      style={style}
      onClick={onClick}
      aria-label={label}
    >
      <span className="quote-btn__text text-cta">{label}</span>
      <span className="quote-btn__arrow" aria-hidden="true">→</span>
    </button>
  );
}
