import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "../../../components/ui/Table";
import { TextField } from "../../../components/ui/TextField";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading";
import { api } from "../../../services/api";
import { Toast } from "../../../components/ui/Toast";
import { useSectors } from "../hooks/useSectors";
import { DeleteSector } from "../../../components/DeleteSector";
import { UpdateSector } from "../../../components/UpdateSector";
import { CreateSector } from "../../../components/CreateSector";

interface handleUpdateSectorParmsType {
  id: string;
  name: string
}

export function Sectors() {

  const { sectors, gettingSectors } = useSectors()

  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const [openToast, setOpenToast] = useState(false)
  const [message, setMessage] = useState('')
  const [isErrorToast, setIsErrorToast] = useState(false)

  async function loadingSectors() {
    setIsLoading(true)
    await gettingSectors()
    setIsLoading(false)
  }

  async function handleDeleteSector(id: string) {
    try {
      setIsLoading(true)
      const res = await api.delete(`/sector/${id}`)
      if (res.status === 200) {
        setOpenToast(true)
        setMessage('Removido com sucesso !')
        setIsErrorToast(false)
        await loadingSectors()
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateClient({ id, name }: handleUpdateSectorParmsType) {
    try {
      setIsLoading(true)
      const res = await api.put('/sector', {
        id,
        name
      })
      if (res.status === 202) {
        await loadingSectors()
        setOpenToast(true)
        setMessage("Alterado com sucesso !")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(name: string) {
    try {
      setIsLoading(true)
      const res = await api.post('/sector', {
        name
      })
      if (res.status === 202) {
        await loadingSectors()
        setOpenToast(true)
        setMessage("Criado com sucesso !")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadingSectors()
  }, [])

  const filteredArray =
    searchText.length > 3 ?
      sectors.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
      :
      sectors

  return (
    <>
      {isLoading && <Loading />}
      <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
        <h4 className="text-3xl font-extrabold ">Gerenciamento de setores</h4>
        {sectors.length > 0 && <div className="w-1/3 mt-5">
          <TextField
            placeholder="pesquisar clientes por nome"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>}
        {sectors.length > 0 && <div className="mt-6">
          <Table>
            <TableHeader>
              <TableHead>Nome</TableHead>
              <TableHead />
            </TableHeader>
            <TableBody>
              {filteredArray?.map(item => (
                <TableRow>
                  <TableCell>{item.name} </TableCell>
                  <TableCell>
                    <div className="px-2 flex justify-start items-center gap-6">
                      <DeleteSector handleDelete={handleDeleteSector} id={item.id} />
                      <UpdateSector infos={item} handleUpdateSector={handleUpdateClient} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>}
        { sectors.length === 0 && <span>Não há setores cadastrados</span>}
        <div className="mt-5">
          <CreateSector handleCreate={handleCreate} />
        </div>
      </div>
      <Toast
        color={isErrorToast ? "danger" : "success"}
        description={message}
        title="Setor"
        onClose={() => { setOpenToast(false) }}
        open={openToast}
      />
    </>
  )
}