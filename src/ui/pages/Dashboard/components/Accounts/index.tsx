import { PlusIcon } from '@radix-ui/react-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { Spinner } from '../../../../components/Spinner';
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Card } from "./Card";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from './useAccountsController';
export function Accounts() {
  const { sliderState, setSliderState, size, isValueVisible, toggleValueVisibility, isLoading, accounts } = useAccountsController()
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && <div className='flex items-center justify-center flex-1'>
        <Spinner className='h-10 w-10 text-white fill-teal-900' />
      </div>}
      {!isLoading && <>
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
          {accounts.length === 0 && <>
            <div className="mb-4">
              <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>
            </div>
            <button className='
            mt-4 h-51 border-2 border-dashed border-teal-600 rounded-2xl
            flex flex-col items-center justify-center gap-4 text-white
            '>
              <div className='h-11 w-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                <PlusIcon className='w-6 h-6' />
              </div>
              <span className='font-medium tracking-[-0.5px] block w-30 text-center'>Cadastre uma nova conta</span>
            </button>
          </>}
          {accounts.length > 0 &&
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
          }
        </div>
      </>}
    </div >
  )
}
