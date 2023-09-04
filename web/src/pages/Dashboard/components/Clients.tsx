import { MagnifyingGlass, Plus } from "phosphor-react";
import { Button } from "../../../components/Ui/Button";
import { TextField } from "../../../components/Ui/TextField";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/Ui/Table";

export function Client() {
  return (
    <div className="w-[920px] p-6 bg-white my-10 mx-auto rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 p-4">Gerenciamento de funcionarios</h1>
      <div className="">
        <div className="flex items-center justify-between">
          <TextField 
            className="w-[35%]" 
            variantsSize="sm" 
            placeholder="pesquisar por nome" 
            startIconAdornments={<MagnifyingGlass 
              weight="thin"
            className="h-4 w-4" /> }
          />
          <Button size="md">
            <div className="flex items-center gap-3">
              <Plus />
              <span>Adicionar</span>
            </div>
          </Button>
        </div>
        <div className="bg-white rounded-lg mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Nome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Nome</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}