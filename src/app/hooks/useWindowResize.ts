import { useEffect, useState } from "react";

type WindowSize = 'sm' | 'md' | 'lg'

export function useWindowResize() {
  const [width, setWidth] = useState(window.innerWidth);

  const [size, setSize] = useState<WindowSize>()

  useEffect(() => {
    let newSize: WindowSize;
    if (width <= 767) {
      newSize = 'sm';
    } else if (width <= 1025) {
      newSize = 'md';
    } else {
      newSize = 'lg';
    }
    setSize(newSize)
  }, [width])

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width, size }
}
