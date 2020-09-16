import { useState, useEffect, useRef } from 'react';

setTimeout

export function useTimer(): { 
  timeout: number, 
  setTimer: (handler: (...args: any[]) => void, timeout: number) => number,
  clearTimer: () => void
} {
  
  let timeout = 0;
  const timeoutRef = useRef(timeout);

  function setTimer(handler: (...args: any[]) => void, timeout: number) {
    clearTimer();
    timeoutRef.current = setTimeout(handler, timeout);
    return timeoutRef.current;
  }

  function clearTimer() {
    clearTimeout(timeoutRef.current);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return { timeout, setTimer, clearTimer };

}