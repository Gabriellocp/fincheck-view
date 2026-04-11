import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  className?: string,
  error?: string,
  value?: Date,
  onChange?: (value: Date) => void
}

export function DatePickerInput({ className, error, value, onChange }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date())
  const handleChangeDate = (date: Date) => {
    setSelectedDate(date)
    onChange?.(date)
  }
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              `bg-white w-full rounded-lg border border-gray-500 px-3 h-13
          focus:border-gray-800 transition-all outline-none text-left relative text-gray-700 pt-4`,
              error && 'border-red-900!',
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs left-3.25 pointer-events-none top-2">Data</span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>
        <Popover.Content className="z-50">
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>
      {error ? <div className="flex gap-2 mt-2 text-red-900 items-center">
        <CrossCircledIcon />
        <span className="text-xs">
          {error}
        </span>
      </div> : null}
    </div>
  )
}
