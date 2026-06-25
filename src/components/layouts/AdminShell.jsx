import React, { useEffect } from 'react';
import { useShell } from './ShellContext';

export default function AdminShell({ children, ...props }) {
  const { setShellProps } = useShell();

  useEffect(() => {
    setShellProps(props);
    // Cleanup on unmount or when props change to ensure no stale props
    return () => setShellProps({});
  }, [props, setShellProps]);

  return <>{children}</>;
}
