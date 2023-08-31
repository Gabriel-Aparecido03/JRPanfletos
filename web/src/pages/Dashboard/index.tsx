import { SideNavigation } from '../../components/SideNavigation';
import { Workers } from './components/Workers';

export function Dashboard() {
  return (
    <main className='flex bg-gray-50 gap-4'>
      <SideNavigation />
      <Workers />
    </main>
  )
}