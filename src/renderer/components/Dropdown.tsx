import * as React from 'react';
import { useRef, useState } from 'react';

export type DropdownProps = {
  /** Extra class name to add to dropdown frame */
  className?: string;
  headerClassName?: string;
  /** Element(s) to show in the drop-down element (only visible when expanded). */
  children: React.ReactNode;
  /** Text to show in the text field (always visible). */
  text: string;
  form?: boolean;
};

// A text element, with a drop-down element that can be shown/hidden.
export function Dropdown(props: DropdownProps) {
  // Hooks
  const [expanded, setExpanded] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Close dropdown when clicking outside of it
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  React.useEffect(() => {
    // Add event listener to handle clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const baseClass = props.form ? 'simple-dropdown-form' : 'simple-dropdown';

  // Render
  return (
    <div
      className={`${baseClass} ${props.className}`}
      onClick={onToggleExpanded}>
      <div
        className={`${baseClass}__select-box ${props.headerClassName}`}
        tabIndex={0}>
        <div className={`${baseClass}__select-text`}>
          {props.text}
        </div>
        <div className={`${baseClass}__select-icon`} />
      </div>
      <div
        className={`${baseClass}__content` + (expanded ? '' : ` ${baseClass}__content--hidden`)}
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}>
        {expanded && (
          props.children
        )}
      </div>
    </div>
  );
}
