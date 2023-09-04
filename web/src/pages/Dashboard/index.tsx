import { SideNavigation } from '../../components/SideNavigation';
import { Client } from './components/Clients';

export function Dashboard() {
  return (
    <main className='flex bg-gray-50 gap-4'>
      <SideNavigation />
      <Client />
    </main>
  )
}