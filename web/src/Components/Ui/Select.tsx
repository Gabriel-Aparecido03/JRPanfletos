import { InputHTMLAttributes,ReactNode } from "react"

interface TextFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  startIconAdornments? : ReactNode
  endIconAdornments?: ReactNode
  variantsSize?: "sm" | "md" | "bg" | "xl"
  children : ReactNode
}

const sizeTextfields = {
  sm : 'h-9 px-4 text-xs rounded-lg',
  md : 'text-sm px-6 py-4 h-10 rounded-lg',
  bg : 'h-12 rounded-lg px-8 py-6',
  xl : 'h-16 rounded-lg px-12 py-10'
}


export function Select({variantsSize="sm",children,startIconAdornments,endIconAdornments,...props}:TextFieldProps) {
  return (
    <div className={`${props.className } border-solid border-gray-100 p-1 border rounded-lg flex items-center ${endIconAdornments ? 'justify-between' : 'justify-start'}`}>
      {startIconAdornments}
      <select
        value={props.value}
        {...props}
        onChange={props.onChange}
        className={` p-0 m-0  ${sizeTextfields[variantsSize]} w-full outline-none bg-transparent text-gray-700 placeholder:text-gray-400`}
      >
        {children}
      </select>
      {endIconAdornments}
    </div>
  )
}