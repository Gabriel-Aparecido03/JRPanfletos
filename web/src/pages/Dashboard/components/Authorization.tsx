import { Button } from "../../../components/Ui/Button";
import { TextField } from "../../../components/Ui/TextField";
import { Select } from "../../../components/Ui/Select";

export function Authorization() {
  return (
    <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col">
      <h4 className="text-3xl font-extrabold ">Autorização de distribuição</h4>
      <div className="mt-4">
        <form action="">
          <div className="flex flex-col gap-4">
            <Select placeholder="Selecione o cliente"/>
            <Select placeholder="Selecione o setor de distribuição"/>
            <TextField placeholder="Valor do milheiro" />
          </div>
          <Button className="mt-2"> Gerar autorização</Button>
        </form>
      </div>
    </div>
  )
}