import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu'
import type React from 'react'
import { cn } from '../../app/utils/cn'

interface ChildrenProps {
  children: React.ReactNode
}

interface ItemProps extends ChildrenProps {
  className?: string,
  onSelect?: () => void
}
interface ContentProps extends ChildrenProps {
  className?: string
}


function DropdownMenuRoot({ children }: ChildrenProps) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  )
}
function DropdownMenuTrigger({ children }: ChildrenProps) {
  return (
    <RdxDropdownMenu.Trigger className='outline-none'>
      {children}
    </RdxDropdownMenu.Trigger>
  )
}
function DropdownMenuContent({ children, className }: ContentProps) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content className={cn("p-2 rounded-2xl bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0, 0, 0,.1)]", className)}>
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  )
}
function DropdownMenuItem({ children, className, onSelect }: ItemProps) {
  return (
    <RdxDropdownMenu.Item className={cn(`outline-none min-h-10 flex items-center justify-center p-2
    text-sm text-gray-800 data-highlighted:bg-gray-50 rounded-md transition-colors cursor-pointer`, className)}
      onSelect={onSelect}
    >
      {children}
    </RdxDropdownMenu.Item>
  )
}


export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
}
