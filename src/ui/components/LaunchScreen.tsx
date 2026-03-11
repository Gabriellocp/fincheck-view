import { Transition } from '@headlessui/react';
import Logo from '../../assets/images/logo.svg?react';
import { Spinner } from './Spinner';
interface LaunchScreenProps {
  isLoading?: boolean
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition show={isLoading}>
      <div className="
      transition duration-300 ease-in data-closed:opacity-0
      bg-teal-900 fixed top-0 left-0 h-full w-full grid place-items-center">
        <div className='flex flex-col gap-2 justify-center items-center'>
          <Logo className="text-white h-10" />
          <Spinner className='fill-white text-teal-800' />
        </div>
      </div>
    </Transition>
  )
}
