import type { CSSProperties } from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function SectionLabel({ text, className = '', style }: SectionLabelProps) {
  return (
    <div className={`section-label ${className}`} style={style}>
      <span className="section-label__line" aria-hidden="true" />
      <span className="label label-lime">{text}</span>
    </div>
  );
}
