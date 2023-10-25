import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "../../../components/ui/Table";
import { TextField } from "../../../components/ui/TextField";
import { useClients } from "../hooks/useClients";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading";
import { CreateClient } from "../../../components/CreateClient";
import { DeleteClient } from "../../../components/DeleteClient";
import { UpdateClient } from "../../../components/UpdateClient";
import { api } from "../../../services/api";
import { Toast } from "../../../components/ui/Toast";

interface handleUpdateClientParmsType {
  id:string;
  phone :string;
  userActionId:string;
  email:string;
}

export function Client() {

  const { clients, gettingClients } = useClients()

  const [isLoading, setIsLoading] = useState(false)
  const [searchText,setSearchText] = useState('')

  const [openToast,setOpenToast] = useState(false)
  const [message,setMessage] = useState('')
  const [isErrorToast,setIsErrorToast] = useState(false)

  async function loadingClients() {
    setIsLoading(true)
    await gettingClients()
    setIsLoading(false)
  }

  async function handleDeleteClient(id:string) {
    try {
      setIsLoading(true)
      const res = await api.delete(`/clients/${id}`)
      if( res.status === 200 ) {
        setOpenToast(true)
        setMessage('Cliente apagado com sucesso !')
        setIsErrorToast(false)
        await loadingClients()
      }
    } catch (error) { }
    finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateClient({email,id,phone,userActionId }:handleUpdateClientParmsType) {
    try {
      setIsLoading(true)
      const res = await api.put('/clients', {
        id,
        email,
        phone,
        userActionId
      })
      if (res.status === 200) {
        setOpenToast(true)
        setMessage("Cliente alterado com sucesso !")
        loadingClients()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
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
                      <DeleteClient handleDelete={handleDeleteClient} id={item.id} />
                      <UpdateClient infos={item} handleUpdateClient={handleUpdateClient} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-5">
          <CreateClient refresh={loadingClients}/>
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