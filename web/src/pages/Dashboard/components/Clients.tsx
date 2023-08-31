import { MagnifyingGlass, Pencil, Trash } from "phosphor-react";
import { Button } from "../../../components/Ui/Button";
import { TextField } from "../../../components/Ui/TextField";

export function Client() {
  return (
    <div className="w-full p-8">
      <h1 className="text-3xl font-bold text-gray-950 p-4">Gerenciamento de funcionarios</h1>
      <div className="">
        <div className="flex items-center justify-between mt-4 mb-10">
          <TextField placeholder="pesquisar por nome" startIconAdornments={<MagnifyingGlass weight="thin" /> }/>
          <Button text="adicionar"/>
        </div>
        <div className="bg-white rounded-lg">
          <table className="w-full rounded-lg">
            <thead className="w-full bg-white cursor-pointer hover:bg-gray-100/70">
              <th className="text-gray-800 font-bold text-base text-start p-2">Nome</th>
              <th className="text-gray-800 font-bold text-base text-start p-2">Cpf</th>
              <th className="text-gray-800 font-bold text-base text-start p-2">Cargo</th>
              <th className="text-gray-800 font-bold text-base text-start p-2">Carteira de trabalho</th>
              <th />
            </thead>
            <tbody className="rounded-lg">
              <tr className="hover:bg-gray-100/70 cursor-pointer">
                <td className="text-gray-950 font-medium text-base text-start p-2">Teste</td>
                <td className="text-gray-950 font-medium text-base text-start p-2">13987928173490812</td>
                <td className="text-gray-950 font-medium text-base text-start p-2">Lore lore lore lore</td>
                <td className="text-gray-950 font-medium text-base text-start p-2">097145674568618405</td>
                <td className="flex items-baseline gap-4 p-2">
                  <Pencil />
                  <Trash />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}