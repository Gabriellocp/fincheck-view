import { NumericFormat } from 'react-number-format'
export function InputCurrency() {
  return (
    <NumericFormat
      className='w-full font-bold text-[32px] tracking-[-1px] outline-none'
      decimalSeparator=','
      thousandSeparator='.'
      defaultValue={123}
    />
  )

}
