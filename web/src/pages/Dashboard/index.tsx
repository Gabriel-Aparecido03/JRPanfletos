import { useEffect, useState } from 'react';
import { Workers } from './components/Workers';
import { Users, Buildings, Handshake, Key } from 'phosphor-react';
import { Tab } from '../../components/ui/Tab';
import { Tabs } from '../../components/ui/Tabs';
import { Report } from './components/Report';
import { Authorization } from './components/Authorization';
import { Button } from '../../components/ui/Button';
import { useUser } from '../../hooks/useUser';
import { Loading } from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { Client } from './components/Client';

export function Dashboard() {

  const [selectTab, setSelectTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { getUserProfile,logout,user,hasLogginSaveAtCookies } = useUser()

  function handleMakeLogout() {
    logout()
    navigate('/')
  }

  async function gettingUserInfos() {
    setIsLoading(true)
    try {
      const hasTokenSaved = hasLogginSaveAtCookies()
      await getUserProfile()
      if(!hasTokenSaved){
        setIsLoading(false)
      }
      setIsLoading(false)
    } catch (error) {}
  }

  useEffect(()=>{
    gettingUserInfos()
  },[])
  
  if( isLoading ) return null

  return (
    <>
      {isLoading && <Loading />}
      <main className='flex bg-gray-100 gap-4'>
        <Tabs>
          <div className='h-full flex flex-col justify-between items-stretch'>
            <div>
              <Tab
                icon={<Users className='text-gray-300 font-extraboldight text-xl' />}
                text='Gerenciamento de funcionários'
                isSelected={selectTab === 0}
                onClick={() => { setSelectTab(0) }}
              />
              <Tab
                icon={<Buildings className='text-gray-300 font-extraboldight text-xl' />}
                text='Gerenciamento de empresas'
                isSelected={selectTab === 1}
                onClick={() => { setSelectTab(1) }}
              />
              <Tab
                icon={<Key className='text-gray-300 font-extraboldight text-xl' />}
                text='Autorização de distribuição'
                isSelected={selectTab === 2}
                onClick={() => { setSelectTab(2) }}
              />
              <Tab
                icon={<Handshake className='text-gray-300 font-extraboldight text-xl' />}
                text='Relatório de distribuição'
                isSelected={selectTab === 3}
                onClick={() => { setSelectTab(3) }}
              />
            </div>
            <Button onClick={handleMakeLogout} variant='secondary' className='w-1/2'>Sair</Button>
          </div>
        </Tabs>
        <div className='flex items-center w-[90%] max-w-[1000px]'>
          {selectTab === 0 && <Workers />}
          {selectTab === 1 && <Client />}
          {selectTab === 2 && <Authorization />}
          {selectTab === 3 && <Report />}
        </div>
      </main>
    </>
  )
}