import { useState, useEffect } from 'react';

export function useScroll(): { scrollY: number } {
  
  const [ scrollY, setScrollY ] = useState<number>(0);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY };

}