import { CrossCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "../../app/utils/cn";
import { formatDate } from "../../app/utils/formatDate";
import { DatePicker } from "./DatePicker";
import { Popover } from "./Popover";

interface DatePickerInputProps {
  className?: string,
  error?: string,
}

export function DatePickerInput({ className, error }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

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
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
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
