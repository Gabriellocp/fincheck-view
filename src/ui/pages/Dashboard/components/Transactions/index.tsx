import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { formatDate } from "../../../../../app/utils/formatDate";
import EmptyState from '../../../../../assets/images/empty-state.svg?react';
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { EditTransaction } from "../../modals/EditTransaction";
import { FilterModal } from "./FilterModal";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";
export function Transactions() {
  const {
    isValueVisible, isLoading, isInitialLoading, transactions,
    handleCloseFilterModal, handleOpenFilterModal, isFilterModalOpen,
    filters, editModal
  } = useTransactionsController()
  const hasTransactions = transactions.length > 0
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isInitialLoading && <div className='flex items-center justify-center flex-1'>
        <Spinner className='h-10 w-10 text-teal-900 fill-white' />
      </div>}
      {!isInitialLoading && <>
        <FilterModal
          onClose={handleCloseFilterModal}
          open={isFilterModalOpen}
          onApplyFilters={(filterData) => {
            filters.handlers('bankAccountId', filterData.bankAccountId);
            filters.handlers('year', filterData.year);
            handleCloseFilterModal();
          }}
        />
        <header>
          <div className="flex items-center justify-between">
            <TransactionTypeDropdown
              onChange={(value) => filters.handlers('type', value)}
              value={filters.values.type}
            />

            <button onClick={handleOpenFilterModal}>
              <FilterIcon />
            </button>
          </div>

          <div className="mt-6 relative">
            <Swiper
              slidesPerView={3}
              spaceBetween={16}
              centeredSlides
              allowTouchMove={false}
              initialSlide={filters.values.month}
              onSlideChange={(swiper) => {
                if (swiper.realIndex === filters.values.month) return;
                filters.handlers('month', swiper.realIndex)
              }}
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
        {(hasTransactions && !isLoading) && (
          <div
            className="mt-4 space-y-2 flex-1 overflow-y-auto"
          >
            <EditTransaction onClose={editModal.setClose} open={editModal.open} transaction={editModal.transaction} />
            {
              transactions.map((transaction) => {
                const isExpense = transaction.type === 'EXPENSE';
                return <div
                  key={transaction.id}
                  role="button"
                  onClick={() => editModal.setOpen(transaction)}
                  className="rounded-2xl bg-white flex items-center justify-between gap-4 p-4">
                  <div className="flex flex-1 gap-3 items-center">
                    <CategoryIcon type={isExpense ? 'expense' : 'income'} category={transaction.category?.icon} />
                    <div className="flex flex-col">
                      <span className="font-bold tracking-[-0.5px]">{transaction.name}</span>
                      <span className="text-sm text-gray-600">{formatDate(new Date(transaction.date))}</span>
                    </div>
                  </div>
                  <span className={cn("text-green-800 tacking-[-0.5px] font-medium",
                    !isValueVisible && "blur-sm",
                    isExpense && "text-red-600"
                  )}>
                    {isExpense ? '-' : '+'} {formatCurrency(transaction.value)}
                  </span>
                </div>

              })
            }
          </div>
        )}
      </>}
    </div>
  )
}
