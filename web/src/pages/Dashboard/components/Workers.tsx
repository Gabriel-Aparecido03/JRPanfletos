import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { TextField } from "../../../components/ui/TextField";
import { useWorkers } from "../hooks/useWorkers";
import { useEffect, useState } from "react";
import { UpdateWorker } from "../../../components/UpdateWorker";
import { useUser } from "../../../hooks/useUser";
import { DeleteWorker } from "../../../components/DeleteWorkers";
import { CreateWorkers } from "../../../components/CreateWorkers";
import { Loading } from "../../../components/Loading";

export function Workers() {

  const { workers, gettingAllWorkers } = useWorkers()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const filteredByName = searchText.length > 0 ? workers?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : workers

  useEffect(() => {
    setIsLoading(true)
    gettingAllWorkers()
    setIsLoading(false)
  }, [])



  return (
    <>
      {isLoading && <Loading />}
      <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
        <h4 className="text-3xl font-extrabold ">Gerenciamento de funcionários</h4>
        <div className="w-1/3 mt-5">
          <TextField onChange={e => setSearchText(e.target.value)} placeholder="pesquisar funcionário por nome" />
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cpf</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead />
            </TableHeader>
            <TableBody>
              {filteredByName?.map(item => (
                <TableRow>
                  <TableCell> {item.name}</TableCell>
                  <TableCell> {item.email}</TableCell>
                  <TableCell> {item.cpf_number}</TableCell>
                  <TableCell> {item.role === "ADMIN" ? "Administrador" : "Comum"}</TableCell>
                  <TableCell className="w-[10%]">
                    <div
                      className="px-2 flex justify-start items-center gap-6">
                      <DeleteWorker 
                        id={item.id} 
                        refresh={gettingAllWorkers}
                      />
                      <UpdateWorker
                        refresh={gettingAllWorkers}
                        infos={{
                          cpf_number: item.cpf_number,
                          created_at: item.created_at,
                          email: item.email,
                          id: item.id,
                          name: item.name,
                          office: item.office,
                          password: item.password_hash,
                          role: item.role,
                          updated_at: item.updated_at,
                          work_card_number: item.work_card_number,
                          userActionId: user!.id
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-5">
          <CreateWorkers refresh={gettingAllWorkers} />
        </div>
      </div>
    </>
  )
}