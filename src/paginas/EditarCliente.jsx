import Formulario from "../components/Formulario";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

const EditarCliente = () => {

  const { id } = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerClienteAPI = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        } catch (error) {
            console.log(error)
        }

        setCargando(!cargando)
    }
    
    obtenerClienteAPI()
  }, []);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos del cliente</p>

      {cliente?.nombre ? (
        <Formulario
          cliente={cliente}  
          cargando={cargando}
        />
      ) : <p>Cliente id no valido</p>}
    </>
  )
};

export default EditarCliente;
