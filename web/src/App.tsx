import { Routers } from "./Routers";
import { Toast } from "./components/ui/Toast";
import { useToast } from "./hooks/useToast";

export function App() {
  const { color, description, isOpen, title, closeToast } = useToast()
  return (
    <>
      <Routers />
      <Toast
        color={color}
        description={description}
        onClose={() => {
          closeToast()
        }}
        open={isOpen}
        title={title}
      />
    </>
  )
}
