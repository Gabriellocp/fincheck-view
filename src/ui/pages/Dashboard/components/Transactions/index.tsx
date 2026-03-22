import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import EmptyState from '../../../../../assets/images/empty-state.svg?react';
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactionsController";
export function Transactions() {
  const { isValueVisible, isLoading, isInitialLoading, transactions } = useTransactionsController()
  const hasTransactions = transactions.length > 0
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && <div className='flex items-center justify-center flex-1'>
        <Spinner className='h-10 w-10 text-teal-900 fill-white' />
      </div>}
      {!isInitialLoading && <>
        <header>
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2">
              <TransactionsIcon />
              <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
              <ChevronDownIcon className="text-gray-900" />
            </button>

            <button>
              <FilterIcon />
            </button>
          </div>

          <div className="mt-6 relative">
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              centeredSlides
              allowTouchMove={false}
            >
              <SliderNavigation />
              {MONTHS.map((month, index) => <SwiperSlide key={month}>
                {({ isActive }) => {
                  return <SliderOption isActive={isActive} text={month} index={index} />
                }}
              </SwiperSlide>)}
            </Swiper>
          </div>
        </header>
        {(!hasTransactions || isLoading) && <div className="flex flex-col items-center justify-center flex-1">
          {isLoading && <Spinner className='h-10 w-10 text-teal-900 fill-white' />}
          {!isLoading && <>
            <EmptyState />
            <p className="text-gray-700">Não encontramos nenhuma transação</p>
          </>}
        </div>}
        {(hasTransactions && !isLoading) && <div
          className="mt-4 space-y-2 flex-1 overflow-y-auto"
        >
          <div className="rounded-2xl bg-white flex items-center justify-between gap-4 p-4">
            <div className="flex flex-1 gap-3 items-center">
              <CategoryIcon type="expense" />
              <div className="flex flex-col">
                <span className="font-bold tracking-[-0.5px]">Almoço</span>
                <span className="text-sm text-gray-600">10/10/2020</span>
              </div>
            </div>
            <span className={cn("text-red-600 tacking-[-0.5px] font-medium", !isValueVisible && "blur-sm")}>
              - {formatCurrency(120397)}
            </span>
          </div>
          <div className="rounded-2xl bg-white flex items-center justify-between gap-4 p-4">
            <div className="flex flex-1 gap-3 items-center">
              <CategoryIcon type="income" />
              <div className="flex flex-col">
                <span className="font-bold tracking-[-0.5px]">Almoço</span>
                <span className="text-sm text-gray-600">10/10/2020</span>
              </div>
            </div>
            <span className={cn("text-green-800 tacking-[-0.5px] font-medium", !isValueVisible && "blur-sm")}>
              + {formatCurrency(120397)}
            </span>
          </div>
        </div>}
      </>}
    </div>
  )
}
