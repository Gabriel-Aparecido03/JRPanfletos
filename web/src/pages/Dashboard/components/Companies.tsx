import { Trash, Pencil, Plus } from "phosphor-react";
import { Button } from "../../../components/Ui/Button";
import { TableHeader, TableHead, TableBody, TableRow, TableCell,Table } from "../../../components/Ui/Table";
import { TextField } from "../../../components/Ui/TextField";

export function Companies() {
  return (
    <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
      <h4 className="text-3xl font-extrabold ">Gerenciamento de empresas</h4>
      <div className="w-1/3 mt-5">
        <TextField placeholder="pesquisar funcionário por nome"/>
      </div>
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableHead>Lorem</TableHead>
            <TableHead>Lorem</TableHead>
            <TableHead>Lorem</TableHead>
            <TableHead>Lorem</TableHead>
            <TableHead />
          </TableHeader>
          <TableBody>
            <TableRow> 
              <TableCell> lorem</TableCell>
              <TableCell> lorem</TableCell>
              <TableCell> lorem</TableCell>
              <TableCell> lorem</TableCell>
              <TableCell className="w-[10%]"> 
                <div className="px-2 flex justify-start items-center gap-6"><Trash className="text-red-500 font-extralight" /> <Pencil className="font-extralight" /></div> 
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="mt-5">
        <Button><Plus className="mr-3"/> Adicionar</Button>
      </div>
    </div>
  )
}