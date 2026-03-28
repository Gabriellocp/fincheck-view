import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Content } from "./Content";

interface ModalProps {
  open: boolean,
  children: React.ReactNode,
  title: string,
  trailingAction?: React.ReactNode
}

export function Modal({ open, title, trailingAction, children }: ModalProps) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 data-[state=open]:animate-overlay-show" />
        <Dialog.Content className={`
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 data-[state=open]:animate-content-show
        bg-white rounded-2xl p-6 space-y-10 z-50 outline-none shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]
        w-full max-w-100
        `}>
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button className="w-12 h-12">
              <Cross2Icon className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold tracking-[-1px]">{title}</span>
            <div className="w-12 h-12 flex items-center justify-center">{trailingAction}</div>
          </header>
          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  )
}

Modal.Content = Content;
