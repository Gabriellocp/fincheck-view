import { useSwiper } from "swiper/react"
import { cn } from "../../../../../app/utils/cn"

interface SliderOptionProps {
  isActive: boolean,
  text: string,
  index: number
}

export function SliderOption({ isActive, text, index }: SliderOptionProps) {
  const swiper = useSwiper()
  return (<button
    className={cn("rounded-full w-full h-12 text-sm tracking-[-0.5px] font-medium text-gray-800",
      isActive && 'bg-white')}
    onClick={() => swiper.slideTo(index)}
  >
    {text}
  </button>)
}
