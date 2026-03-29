import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import { capitalizeFirstLetter } from '../../app/utils/capitalizeFirstLetter';
interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange?.(date ?? new Date())}
      classNames={{
        months: 'relative',
        month: 'space-y-4',
        month_caption: 'flex justify-between items-center h-10 relative mb-4',
        caption_label: 'text-gray-900 tracking-[-0.408px] font-bold text-sm',
        button_previous: 'flex items-center justify-center !bg-transparent p-2 hover:bg-teal-50 rounded-full transition-colors',
        button_next: 'flex items-center justify-center !bg-transparent p-2 hover:bg-teal-50 rounded-full transition-colors',
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'text-gray-500 uppercase text-[10px] font-medium w-10 h-10 flex items-center justify-center',
        week: 'flex w-full mt-2',
        day: 'text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full flex items-center justify-center transition-colors text-sm',
        today: 'bg-gray-100 font-bold text-gray-900',
        selected: '!bg-teal-900 text-white font-medium hover:!bg-teal-800',
        chevron: 'fill-teal-800'
      }}
      navLayout='after'
      formatters={{
        formatCaption: (date, options) => capitalizeFirstLetter(format(date, 'LLLL yyyy', options)),
      }}
    />
  );
}
