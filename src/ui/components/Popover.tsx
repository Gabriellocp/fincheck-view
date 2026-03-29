import * as RdxPopover from '@radix-ui/react-popover'
import { cn } from '../../app/utils/cn'

interface ChildrenProps {
  children: React.ReactNode
}

interface ContentProps extends ChildrenProps {
  className?: string
}


function PopoverRoot({ children }: ChildrenProps) {
  return (
    <RdxPopover.Root>
      {children}
    </RdxPopover.Root>
  )
}
function PopoverTrigger({ children }: ChildrenProps) {
  return (
    <RdxPopover.Trigger className='outline-none' asChild>
      {children}
    </RdxPopover.Trigger>
  )
}
function PopoverContent({ children, className }: ContentProps) {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content className={cn(`
      rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)] p-4
      data-[side=top]:animate-slide-up-and-fade data-[side=bottom]:animate-slide-down-and-fade
      `, className)}>
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  )
}


export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
}
