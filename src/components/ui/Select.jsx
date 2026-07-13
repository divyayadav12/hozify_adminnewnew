import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ 
  value, 
  defaultValue,
  onChange, 
  options = [], 
  className = '', 
  placeholder = 'Select...',
  disabled = false,
  name,
  id,
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === currentValue) || 
                         (options.length > 0 && !placeholder ? options[0] : null);

  const handleSelect = (optionValue) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    if (onChange) {
      onChange({ target: { value: optionValue, name, id } });
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', minWidth: '140px', opacity: disabled ? 0.6 : 1, ...style }} className={className}>
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '40px',
          padding: '0 14px',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#1e293b',
          backgroundColor: disabled ? '#f8fafc' : '#fff',
          cursor: disabled ? 'not-allowed' : 'pointer',
          outline: 'none',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.borderColor = '#94a3b8'; }}
        onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.borderColor = '#cbd5e1'; }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} style={{ color: '#64748b', flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {isOpen && !disabled && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          maxHeight: '260px',
          overflowY: 'auto',
          padding: '4px'
        }}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                fontSize: '14px',
                fontWeight: '500',
                color: currentValue === option.value ? '#1d4ed8' : '#334155',
                backgroundColor: currentValue === option.value ? '#eff6ff' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (currentValue !== option.value) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.color = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (currentValue !== option.value) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#334155';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
