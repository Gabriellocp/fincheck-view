import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { AccountsNavigation } from "./AccountsNavigation";
import { useAccountsController } from './useAccountsController';
export function Accounts() {
  const { sliderState, setSliderState, size } = useAccountsController()
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      <div className="text-white">
        <span className="tracking-[-0.5px] block">Saldo total</span>
        <div className="flex flex-row items-center gap-2">
          <strong className="text-2xl tracking-[-1px]">R$1000,00</strong>
          <button className="w-8 h-12 flex items-center justify-center">
            <EyeIcon open />
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
            <AccountsNavigation {...sliderState} />
          </div>
          <SwiperSlide>
            <AccountCard balance={1230} color="red" name="Nubank" type="CHECKING" />
          </SwiperSlide>
          <SwiperSlide>
            <AccountCard balance={12313} color="black" name="XP" type="INVESTMENT" />
          </SwiperSlide>
          <SwiperSlide>
            <AccountCard balance={5346} color="orange" name="Inter" type="CHECKING" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div >
  )
}
