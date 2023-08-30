import { DataGrid } from '@mui/x-data-grid';
import { Button } from '../Components/Ui/Button';
import { SideNavigation } from '../Components/SideNavigation';

export function Dashboard() {

  const columns = [
    { field: 'name', headerName: 'Nome'},
    { field: 'cpf', headerName: 'Cpf'},
    { field: 'workerCard', headerName: 'Carteira de trabalho'},
    { field: 'office', headerName: 'Cargo' },
  ];

  const rows = [
    { id: 1, name: 'Teste', cpf : '123123123123',workerCard:'1203907320984732',office:'teste' }
  ];
  
  return (
    <main className='flex'>
      <SideNavigation />
      <div className="ml-[-20px] p-16 bg-gray-50 w-full rounded-tl-3xl">
        <h1 className='font-extrabold text-4xl text-gray-950 '>Gerenciamento de Funcionários</h1>
        <div className='bg-white mt-4 p-2 rounded-lg'>
          <DataGrid rows={rows} columns={columns} />
          <div className='mt-4'>
            <Button size='md' text='Cadastrar' />
          </div>
        </div>
      </div>
    </main>
  )
}