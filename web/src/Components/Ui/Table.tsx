import { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react"

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement>{}
interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement>{}
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement>{}
interface TableCaptionProps extends HTMLAttributes<HTMLElement>{}

const Table = ({...props}:TableProps) => {
  return (
    <div className="rounded-lg border border-solid border-gray-100 p">
      <table className={`w-full text-sm`} {...props}/>
    </div>
  )
}


const TableHeader = ({...props}:TableHeaderProps) => {
  return (
    <thead className={`[&_tr]:border-b border-gray-100 text-center ${props.className}`}  {...props}/>
  )
}

const TableBody = ({...props}:TableBodyProps) => {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${props.className}`}  {...props}/>
  )
}

const TableFooter = ({...props}:TableFooterProps) => {
  return (
    <tfoot className={`bg-gray-100 font-medium text-gray-500 ${props.className}`}  {...props}/>
  )
}

const TableRow = ({...props}:TableRowProps) => {
  return (
    <tr className={`border-b transition-colors  ${props.className}`}  {...props}/>
  )
}

const TableHead = ({...props}:TableHeadProps) => {
  return (
    <th className={`h-10 px-4 font-bold py-1 text-left align-middle text-gray-400 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${props.className}`}  {...props}/>
  )
}

const TableCell = ({...props}:TableCellProps) => {
  return (
    <td className={`'p-2 text-left px-4 py-2 text-gray-500 ${props.className}`}  {...props}/>
  )
}

const TableCaption = ({...props}:TableCaptionProps) => {
  return (
    <caption className={`mt-4 text-sm text-gray-100 ${props.className}`}  {...props}/>
  )
}

export { 
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
}

