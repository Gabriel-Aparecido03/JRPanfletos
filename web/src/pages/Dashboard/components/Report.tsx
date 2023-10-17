import { Button } from "../../../components/ui/Button";
import { TextField } from "../../../components/ui/TextField";
import { Select } from "../../../components/ui/Select";
import { useAuthorizations } from "../hooks/useAuthorizations";
import { useEffect, useState } from "react";
import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "../../../components/ui/Table";
import { formatDate } from "../../../utils/formatted-data";
import { formattedCoin } from "../../../utils/formatted-coin";
import { CreateReport } from "../../../components/CreateReport";
import { ViewReport } from "../../../components/ViewReport";
import { DeleteReport } from "../../../components/DeleteReport";

export function Report() {

  const [searchText, setSearchText] = useState('')
  const [isLoading,setIsLoading] = useState(false)

  const { authorizations, gettingAuthorizations } = useAuthorizations()

  async function loadingAuthorizations() {
    setIsLoading(true)
    await gettingAuthorizations()
    setIsLoading(false)
  }

  useEffect(()=>{
    loadingAuthorizations()
  },[])

  const filteredArray =
    searchText.length > 3 ?
      authorizations.filter(item => item.clientName.toLowerCase().includes(searchText.toLowerCase()))
      :
      authorizations

  return (
    <>
    {}
    <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col overflow-scroll">
      <h4 className="text-3xl font-extrabold">Relatório de distribuição</h4>
      <div>
        <div className="w-1/3 mt-5">
          <TextField
            placeholder="pesquisar clientes pola razão social"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <Table>
            <TableHeader>
              <TableHead>Criado em</TableHead>
              <TableHead>Razão Social</TableHead>
              <TableHead>Valor do milheiro</TableHead>
              <TableHead>Setores</TableHead>
              <TableHead />
            </TableHeader>
            <TableBody>
              {filteredArray?.map(item => (
                <TableRow>
                  <TableCell>{formatDate.format(new Date(item.created_at))} </TableCell>
                  <TableCell>{item.clientName} </TableCell>
                  <TableCell>{formattedCoin.format(item.value_of_thousand_in_cents)} </TableCell>
                  <TableCell>{item.sectorsOfDistributions.map(sector => <span key={sector.id}>{sector.name}</span>)}</TableCell>
                  { !item.report_id && 
                    <TableCell>
                      <CreateReport authorizationId={item.id} />
                    </TableCell>
                  }
                  {
                    item.report_id && 
                    <TableCell>
                      <div className="px-2 flex justify-start items-center gap-6">
                        <ViewReport photo1="" photo2="" photo3=""/>
                        <DeleteReport id="" refresh={gettingAuthorizations}/>
                      </div>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
    </>
  )
}