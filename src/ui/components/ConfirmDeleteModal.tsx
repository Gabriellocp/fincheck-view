import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onConfirm: () => void,
  onClose: () => void,
  open: boolean,
  title: string,
  description?: string,
  isLoading?: boolean
}

export function ConfirmDeleteModal({ onConfirm, onClose, open, description, title, isLoading }: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Excluir">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-13 h-13 bg-red-50 rounded-full flex justify-center items-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="font-bold max-w-45 text-gray-800 tracking-[-0.5px]">{title}</p>
        {description && <p className="tracking-[-0.5px] text-gray-800">
          {description}
        </p>
        }
      </div>
      <div className="mt-10 space-y-4">
        <Button className="w-full" variant="danger" onClick={onConfirm} isLoading={isLoading}>Sim, desejo excluir</Button>
        <Button className="w-full" variant="ghost" onClick={onClose} disabled={isLoading}>Cancelar</Button>
      </div>
    </Modal>
  )
}
