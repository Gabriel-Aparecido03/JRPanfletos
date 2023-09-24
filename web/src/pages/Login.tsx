import { Eye, EyeSlash, LockKey, User } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Button } from "../components/Ui/Button";
import { TextField } from "../components/Ui/TextField";

export function Login() {

  const [ isShowPassoword,setIsShowingPassoword ]  = useState(false)

  function handleSubmit(e:FormEvent) {
    e.preventDefault()
  }

  return (
    <main className="font-main antialiased font-normal text-base h-screen w-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[500px] h-[420px] bg-white rounded-lg p-10 flex flex-col justify-start">
        <div className="my-6">
          <h1 className="text-start text-gray-950 font-bold text-3xl">Acesse o sistema</h1>
          <span className="text-start text-gray-300 mt-6 text-base font-light">Preencha os campos abaxo</span>
        </div>
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-stretch justify-center gap-4 flex-1">
          <TextField   
            startIconAdornments={<User size={26} weight="thin" className="text-gray-500"/>} 
            type="text" 
            placeholder="Coloque o cpf"
            variantsSize="md"
          />
          <TextField 
            endIconAdornments={
              <>
                {!isShowPassoword && <Eye 
                onClick={()=>{setIsShowingPassoword(!isShowPassoword)}} 
                size={26}
                weight="thin" 
                className="text-gray-500 cursor-pointer"
                />}
                { 
                  isShowPassoword && <EyeSlash 
                  onClick={()=>{setIsShowingPassoword(!isShowPassoword)}} 
                  size={26}
                  weight="thin" 
                  className="text-gray-500 cursor-pointer"
                  />
                }
              </>
            }
            variantsSize="md"
            startIconAdornments={<LockKey size={26} weight="thin" className="text-gray500"/>}
            type={isShowPassoword ? 'text' : 'password'}
            placeholder="Coloque a senha"
            />
          <Button size="bg" type="submit" >Acessar</Button>
        </form>
      </div>
    </main>
  )
}
