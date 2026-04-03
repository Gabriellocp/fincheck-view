import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossCircledIcon
} from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { useState } from "react";
import { cn } from "../../app/utils/cn";

interface SelectProps {
  className?: string,
  error?: string,
  placeholder?: string,
  options: { value: string, label: string }[],
  onChange?: (value: string) => void,
  value?: string
}

export function Select({ className, error, placeholder, options, onChange, value }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '')
  function handleSelect(value: string) {
    setSelectedValue(value)
    onChange?.(value)
  }
  return (
    <div>
      <div className="relative">
        <label className={cn(
          `absolute z-10 top-1/2 -translate-y-1/2 left-3
          pointer-events-none text-gray-700`,
          selectedValue && 'text-xs left-3.25 top-2 transition-all translate-y-0'
        )}>{placeholder}</label>
        <RdxSelect.Root onValueChange={handleSelect} value={value}>
          <RdxSelect.Trigger
            className={cn(
              `bg-white w-full rounded-lg border border-gray-500 px-3 h-13 text-gray-800
          focus:border-gray-800 transition-all outline-none text-left relative pt-4`,
              error && 'border-red-900!',
              className
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="overflow-hidden bg-white border-gray-100 z-50 rounded-2xl
        shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]

        ">
              <RdxSelect.ScrollUpButton
                className="flex h-6.25 cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>
              <RdxSelect.Viewport className="p-2">

                {options.map(option => {
                  return (
                    <RdxSelect.Item
                      key={option.value}
                      className={cn(
                        `p-2 text-sm text-gray-800 data-[state=checked]:font-bold data-highlighted:bg-gray-100 outline-none rounded-lg transition-colors`,
                      )}
                      value={option.value}
                    >
                      <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                    </RdxSelect.Item>
                  )
                })}

              </RdxSelect.Viewport>
              <RdxSelect.ScrollDownButton
                className="flex h-6.25 cursor-default items-center justify-center bg-white text-gray-800">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>
      {error ? <div className="flex gap-2 mt-2 text-red-900 items-center">
        <CrossCircledIcon />
        <span className="text-xs">
          {error}
        </span>
      </div> : null}

    </div>
  )
}


