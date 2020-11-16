import { useState, useEffect } from 'react';

export function useAbortController(): AbortController | undefined {
  
  const controller = getController();

  function getController() {
    try {
      return new AbortController();
    } catch (error) {
      return undefined;
    }
  };

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, []);

  return controller;

}