import { InputHTMLAttributes,ReactNode } from "react"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  startIconAdornments? : ReactNode
  endIconAdornments?: ReactNode
  variantsSize?: "sm" | "md" | "bg" | "xl"
}

const sizeTextfields = {
  sm : 'h-9 py-2 px-4 text-sm',
  md : 'text-base h-8 rounded-lg px-3',
  bg : 'text-lg h-10 rounded-lg px-8',
  xl : 'text-lg h-12 rounded-lg p-6 py-8'
}


export function TextField({variantsSize="sm",startIconAdornments,endIconAdornments,...props}:TextFieldProps) {
  return (
    <div className={`${props.className } border-solid border-gray-100 p-1 border rounded-lg flex items-center justify-start`}>
      {startIconAdornments}
      <input 
        {...props}
        className={`${sizeTextfields[variantsSize]} outline-none bg-transparent text-gray-700 placeholder:text-gray-400`}
      />
      {endIconAdornments}
    </div>
  )
}