import { Button } from "../../../components/ui/Button";
import { TextField } from "../../../components/ui/TextField";
import { Select } from "../../../components/ui/Select";

export function Report() {
  return (
    <div className="h-[calc(100vh-50px)] w-full bg-white mx-auto p-10 rounded-lg flex flex-col overflow-scroll">
      <h4 className="text-3xl font-extrabold">Relatório de distribuição</h4>
      <div>
        <form action="" className="flex flex-col">
          <div>
            <div className="flex w-full gap-4 mt-4">
              <div className="w-full flex flex-col gap-3">
                <Select placeholder="Selecione o a autorização" />
                <Select placeholder="Selecione o setor de distribuição" />
                <div className="flex items-center justify-center gap-5 mt-4">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                    <Button variant="outline">Adicionar foto</Button>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                    <Button variant="outline">Adicionar foto</Button>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[120px] h-[120px] bg-gray-200 rounded-lg mb-3" />
                    <Button variant="outline">Adicionar foto</Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <TextField placeholder="Coloque o nome da rua" />
                <TextField placeholder="Coloque o nome da rua" />
                <TextField placeholder="Coloque o nome da rua" />
                <Button variant="outline" size="sm">Adicionar rua</Button>
              </div>
            </div>
          </div>
          <Button className="mt-4 w-1/2 mx-auto"> Emitir relatório</Button>
        </form>
      </div>
    </div>
  )
}