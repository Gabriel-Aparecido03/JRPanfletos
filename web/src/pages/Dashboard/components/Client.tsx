import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "../../../components/ui/Table";
import { TextField } from "../../../components/ui/TextField";
import { useClients } from "../hooks/useClients";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading";
import { CreateClient } from "../../../components/CreateClient";
import { DeleteClient } from "../../../components/DeleteClient";
import { UpdateClient } from "../../../components/UpdateClient";

export function Client() {

  const { clients, gettingClients } = useClients()

  const [isLoading, setIsLoading] = useState(false)
  const [searchText,setSearchText] = useState('')

  async function loadingClients() {
    setIsLoading(true)
    await gettingClients()
    setIsLoading(false)
  }

  useEffect(() => {
    loadingClients()
  }, [])

  const filteredArray = 
    searchText.length > 3 ? 
      clients.filter( item => item.socialName.toLowerCase().includes(searchText.toLowerCase()))
        :
      clients

  return (
    <>
      {isLoading && <Loading />}
      <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
        <h4 className="text-3xl font-extrabold ">Gerenciamento de clientes</h4>
        <div className="w-1/3 mt-5">
          <TextField 
            placeholder="pesquisar clientes por nome" 
            value={searchText}
            onChange={ e => setSearchText(e.target.value )}
          />
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableHead>Razão Social</TableHead>
              <TableHead>Cnpj</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead />
            </TableHeader>
            <TableBody>
              {filteredArray?.map(item => (
                <TableRow>
                  <TableCell>{item.socialName} </TableCell>
                  <TableCell>{item.cnpj} </TableCell>
                  <TableCell>{item.email} </TableCell>
                  <TableCell>{item.phone} </TableCell>
                  <TableCell>
                    <div className="px-2 flex justify-start items-center gap-6">
                      <DeleteClient id={item.id} refresh={loadingClients}/>
                      <UpdateClient infos={item} refresh={loadingClients} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-5">
          <CreateClient />
        </div>
      </div>
    </>
  )
}