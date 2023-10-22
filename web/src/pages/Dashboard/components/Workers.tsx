import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/Table";
import { TextField } from "../../../components/ui/TextField";
import { useWorkers } from "../hooks/useWorkers";
import { useEffect, useState } from "react";
import { UpdateWorker } from "../../../components/UpdateWorker";
import { useUser } from "../../../hooks/useUser";
import { DeleteWorker } from "../../../components/DeleteWorkers";
import { CreateWorkers } from "../../../components/CreateWorkers";
import { Loading } from "../../../components/Loading";
import { api } from "../../../services/api";
import { Toast } from "../../../components/ui/Toast";

interface handleUpdateWorkerParamsType {
  role : "ADMIN" | "COMMOM",
  office : string;
  email : string;
  password: string;
  id : string;
  user_action_id : string
}

interface handleDeleteWorkerParamsType {
  id:string;
  userId:string;
}

export function Workers() {

  const { workers, gettingAllWorkers } = useWorkers()
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const [searchText, setSearchText] = useState('')
  const filteredByName = searchText.length > 0 ? workers?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : workers
  
  const [openToast,setOpenToast] = useState(false)
  const [message,setMessage] = useState('')
  const [isErrorToast,setIsErrorToast] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    gettingAllWorkers()
    setIsLoading(false)
  }, [])

  async function handleUpdateWorker({email,id,office,password,role,user_action_id }:handleUpdateWorkerParamsType) {
    try {
      setIsLoading(true)
      const res = await api.put('/user', {
        role,
        office,
        email,
        password,
        id,
        user_action_id
      })
      if (res.status === 201) {
        await gettingAllWorkers()
        setOpenToast(true)
        setMessage('Funcionário alterado com sucesso !')
      }
    } catch (error) {
      console.log(error)
    } finally { 
      setIsLoading(false)
    }
  }

  async function handleDeleteWorker({ id,userId }:handleDeleteWorkerParamsType) {
    try {
      setIsLoading(true)
      await api.delete(`/user/${id}/${userId}`)
      await gettingAllWorkers()
      setMessage('Usuário apagado com sucesso !')
      setOpenToast(true)
    } catch (error) { }
    finally {
      setIsLoading(false)
    }
  }

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
                        handleDeleteWorker={handleDeleteWorker}
                      />
                      <UpdateWorker
                        handleUpdateWorker={handleUpdateWorker}
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
      <Toast 
        color={isErrorToast ? "danger" : "success"}
        description={message}
        title=""
        onClose={()=>{setOpenToast(false)}}
        open={openToast}
      />
    </>
  )
}