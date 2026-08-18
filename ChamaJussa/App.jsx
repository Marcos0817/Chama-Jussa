import { Login } from "./src/screens/login/Login";
import { ListaOS } from "./src/screens/listaOS/ListaOS";
import { DetalheOS } from "./src/screens/detalheOS/DetalheOS";
import { CriarOS } from "./src/screens/criarOS/CriarOS";

export default function App() {
  return (
    <>
      <Login />
      <ListaOS />
      <CriarOS />
      <DetalheOS />
    </>
  );
}