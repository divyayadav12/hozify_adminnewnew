import React, { useEffect, useRef } from 'react';
import { useShell } from './ShellContext';

function isEqual(a, b, seen = new WeakSet()) {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }
  
  // Prevent traversing React elements (which have a $$typeof symbol and circular references)
  if (a.$$typeof || b.$$typeof) {
    return a === b;
  }

  // Prevent infinite loops on circular references
  if (seen.has(a) || seen.has(b)) {
    return true;
  }
  seen.add(a);
  seen.add(b);

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], seen)) return false;
    }
    return true;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (let key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!isEqual(a[key], b[key], seen)) return false;
  }
  return true;
}

export default function AdminShell({ children, ...props }) {
  const { setShellProps } = useShell();
  const prevProps = useRef(null);

  useEffect(() => {
    let changed = false;
    if (!prevProps.current) {
      changed = true;
    } else {
      const prev = prevProps.current;
      const keys = new Set([...Object.keys(prev), ...Object.keys(props)]);
      for (let key of keys) {
        if (!isEqual(prev[key], props[key])) {
          changed = true;
          break;
        }
      }
    }

    if (changed) {
      prevProps.current = props;
      setShellProps(props);
    }
  }, [props, setShellProps]);

  useEffect(() => {
    return () => setShellProps({});
  }, [setShellProps]);

  return <>{children}</>;
}
