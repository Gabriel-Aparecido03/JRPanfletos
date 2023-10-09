import * as Primitive from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

const Dialog = Primitive.Root

const DialogTrigger = Primitive.Trigger

const DialogPortal = ({...props}:Primitive.DialogPortalProps) => {
  return (
    <Primitive.Portal { ...props} />
  )   
}

const DialogOverplay = ({className,...props}:Primitive.DialogOverlayProps) => {
  return (
    <Primitive.Overlay
      className={`bg-black/20 data-[state=open]:animate-overlayShow fixed inset-0 ${className}`}
      {...props}
    />
  )
}

const DialogContent = ({ className, ...props}:Primitive.DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverplay />
      <Primitive.Content {...props} className={`fixed top-[50%] max-h-[540px] left-[50%] w-[850px] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg p-[25px] ${className}`}>
        <Primitive.Close className='w-full flex justify-end'>
          <X />
        </Primitive.Close>
        { props.children }
      </Primitive.Content>
      
    </DialogPortal>
  )
}

export { Dialog,DialogContent,DialogOverplay,DialogPortal,DialogTrigger }