import { InputHTMLAttributes,ReactNode } from "react"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  startIconAdornments? : ReactNode
  endIconAdornments?: ReactNode
  variantsSize?: "sm" | "md" | "bg" | "xl"
  error?: boolean
}

const sizeTextfields = {
  sm : 'h-9 p-4 text-xs rounded-lg',
  md : 'text-sm px-6 py-4 h-10 rounded-lg',
  bg : 'h-12 rounded-lg px-8 py-6',
  xl : 'h-16 rounded-lg px-12 py-10'
}


export function TextField({variantsSize="sm",error=false,startIconAdornments,endIconAdornments,...props}:TextFieldProps) {
  return (
    <div className={`${props.className } border-solid ${error ? 'border-red-500': 'border-gray-100'} p-1 border rounded-lg flex items-center ${endIconAdornments ? 'justify-between' : 'justify-start'}`}>
      {startIconAdornments}
      <input 
        {...props}
        className={`${sizeTextfields[variantsSize]} w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400`}
      />
      {endIconAdornments}
    </div>
  )
}