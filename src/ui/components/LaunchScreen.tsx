import Logo from '../../assets/images/logo.svg?react';
import { Spinner } from './Spinner';
export function LaunchScreen() {
  return (
    <div className="bg-teal-900 fixed top-0 left-0 h-full w-full grid place-items-center">
      <div className='flex flex-col gap-2 justify-center items-center'>
        <Logo className="text-white h-10" />
        <Spinner className='fill-white text-teal-800' />
      </div>
    </div>
  )
}
