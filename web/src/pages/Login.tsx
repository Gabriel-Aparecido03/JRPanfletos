import { Eye, EyeSlash, LockKey, User } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";
import { Toast } from "../components/ui/Toast";
import { isValidEmail as validateEmailRegex } from "../utils/validate-email";

export function Login() {

  const [ isShowPassoword,setIsShowingPassoword ]  = useState(false)

  const [passwordText,setPasswordText] = useState('')
  const [emailText,setEmailText] = useState('')

  const [errorEmail,setErrorEmail] = useState(false)
  const [errorPassword,setErrorPassword] = useState(false)

  const [openToast,setOpenToast ] = useState(false)
  const [colorToast,setColorToast ] = useState<"success" | "danger" | "primary">("primary")
  const [titleToast,setTitleToast ] = useState("")
  const [descriptionToast,setDescriptionToast] = useState("")

  const { saveTokenAtCookie,getUserProfile,logout,hasLogginSaveAtCookies } = useUser()
  const navigate = useNavigate()

  async function handleSubmit(e:FormEvent) {
    e.preventDefault()
    reset()
    const isValidFields = validateFields()
    if(!isValidFields) return

    try {
      const res = await api.post('/session/',{ email : emailText, password : passwordText })
      if(res.status === 200 ) {
        await saveTokenAtCookie(res.data.token)
        await getUserProfile()
        navigate('/dashboard')
      }
    } catch (error) {
      setOpenToast(true)
      setColorToast("danger")
      setTitleToast("Usuário ou senha inválidos")
      setDescriptionToast("Por favor , verifique o email digitado e/ou a senha digitado !")
      setErrorEmail(true)
      setErrorPassword(true)
    }
  }

  async function makeAutoLogin() {
    const hasJwtAtCookie  = await hasLogginSaveAtCookies()
    if(hasJwtAtCookie) {
      await getUserProfile()
      navigate('/dashboard')
    }
    else {
      logout()
      navigate('/')
    }
  }

  function validateFields() {

    const isValidEmail = validateEmailRegex(emailText)
    const isValidPassoword = passwordText.length !== 0

    setErrorEmail(false)
    setErrorPassword(false)

    if(!isValidEmail) {
      setOpenToast(true)
      setColorToast("danger")
      setTitleToast("Email inválido")
      setDescriptionToast("Por favor , verifique o email digitado !")
      setErrorEmail(true)
    }

    if(!isValidPassoword) {
      setErrorPassword(true)
      setOpenToast(true)
      setColorToast("danger")
      setTitleToast("Senha inválida")
      setDescriptionToast("Por favor , verifique a senha digitada !")
    }

    return isValidEmail && isValidPassoword
  }

  useEffect(()=>{
    makeAutoLogin() 
  },[])

  function reset() {
    setErrorEmail(false)
    setErrorPassword(false)
    setDescriptionToast('')
    setTitleToast('')
    setOpenToast(false)
  }

  return (
    <main className="font-main antialiased font-normal text-base h-screen w-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[500px] h-[420px] bg-white rounded-lg p-10 flex flex-col justify-start">
        <div className="my-6">
          <h1 className="text-start text-gray-950 font-bold text-3xl">Acesse o sistema</h1>
          <span className="text-start text-gray-300 mt-6 text-base font-light">Preencha os campos abaixo</span>
        </div>
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-stretch justify-center gap-4 flex-1">
          <TextField   
            startIconAdornments={<User size={26} weight="thin" className="text-gray-500"/>} 
            type="text" 
            placeholder="Coloque o email"
            variantsSize="md"
            error={errorEmail}
            onChange={e => {
              setEmailText(e.target.value)
              setErrorEmail(false)
            }}
          />
          <TextField 
            error={errorPassword}
            onChange={e => {
              setPasswordText(e.target.value)
              setErrorPassword(false)
            }}
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
      <Toast 
        open={openToast} 
        color={colorToast}
        description={descriptionToast}
        onClose={()=>{setOpenToast(false)}}
        title={titleToast}
      />
    </main>
  )
}
