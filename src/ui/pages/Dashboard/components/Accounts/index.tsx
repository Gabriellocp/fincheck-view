import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Card } from "./Card";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from './useAccountsController';
export function Accounts() {
  const { sliderState, setSliderState, size, isValueVisible, toggleValueVisibility } = useAccountsController()
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div className="text-white">
        <span className="tracking-[-0.5px] block">Saldo total</span>
        <div className="flex flex-row items-center gap-2">
          <strong className={cn("text-2xl tracking-[-1px]", !isValueVisible && "blur-md")}>{formatCurrency(1000)}</strong>
          <button
            className="w-8 h-12 flex items-center justify-center"
            onClick={toggleValueVisibility}
          >
            <EyeIcon open={!isValueVisible} />
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end max-w-full mt-10 md:mt-0">
        <Swiper
          spaceBetween={16}
          slidesPerView={size === 'lg' ? 2.1 : 1.2}
          className='w-full'
          onSlideChange={(swiper) => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd
            })
          }}
        >
          <div className="flex flex-row items-center justify-between mb-4" slot='container-start'>
            <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
            <SliderNavigation {...sliderState} />
          </div>
          <SwiperSlide>
            <Card balance={1230} color="red" name="Nubank" type="CHECKING" />
          </SwiperSlide>
          <SwiperSlide>
            <Card balance={12313} color="black" name="XP" type="INVESTMENT" />
          </SwiperSlide>
          <SwiperSlide>
            <Card balance={5346} color="orange" name="Inter" type="CHECKING" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div >
  )
}
