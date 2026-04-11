import { CrossCircledIcon } from '@radix-ui/react-icons'
import { NumericFormat } from 'react-number-format'

interface InputCurrencyProps {
  error?: string,
  onChange?: (value: string) => void,
  value?: string | number
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        className='w-full font-bold text-[32px] tracking-[-1px] outline-none'
        decimalSeparator=','
        thousandSeparator='.'
        value={value}
        onValueChange={({ value }) => onChange?.(value)}
      />
      {error ? <div className="flex gap-2 mt-2 text-red-900 items-center">
        <CrossCircledIcon />
        <span className="text-xs">
          {error}
        </span>
      </div> : null}
    </div>
  )

}
