import { useState } from "react";
import { useWindowResize } from "../../../../../app/hooks/useWindowResize";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  const { width, size } = useWindowResize()
  return {
    sliderState,
    setSliderState,
    width,
    size
  }
}
