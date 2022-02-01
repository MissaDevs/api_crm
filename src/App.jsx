import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layout/layout"
import Inicio from "./paginas/inicio"
import NuevoCliente from "./paginas/NuevoCliente"
import EditarCliente from "./paginas/EditarCliente"
import VerCliente from "./paginas/VerCliente"


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Inicio />}/>
              <Route path='clientes/nuevo' element={<NuevoCliente />}/>
              <Route path='clientes/editar/:id' element={<EditarCliente />}/>
              <Route path='clientes/:id' element={<VerCliente />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
