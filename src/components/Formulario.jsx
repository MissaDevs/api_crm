import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import Errores from "./Errores";
import Spinner from "./Spinner";

const Formulario = ({cliente, cargando}) => {

  const navigate = useNavigate()

  const schema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(40, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().email('El email no es valido').required('El email es obligatorio'),
        telefono: Yup.number().integer('El numero no valido').positive('El numero no es valido').typeError('El numero no es valido')
  })

  const handleSubmit = async (valores) => {
      try {
        let respuesta;
        if (cliente.id) {
            //Editando registro
            const url = `http://localhost:4000/clientes/${cliente.id}`

            respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(valores),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const resultado = await respuesta.json()

            navigate('/')
        } else {
            //Nuevo registro
            const url = 'http://localhost:4000/clientes'

            respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }

        await respuesta.json()
        navigate('/')
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
      cargando ? <Spinner/> : (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}</h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '',
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={async (values, {resetForm}) => {
                    await handleSubmit(values)

                    resetForm()
                }}

                validationSchema={schema}
            >
                {({errors, touched}) => {
                    return (
                        <Form className="mt-10">
                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="nombre">Nombre:</label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder='Nombre del cliente'
                                    name="nombre"
                                />
                                
                                {errors.nombre && touched.nombre ? (
                                    <Errores>{errors.nombre}</Errores>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="empresa">Empresa:</label>
                                <Field
                                    id='empresa'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder='Empresa del cliente'
                                    name='empresa'
                                />
                                {errors.empresa && touched.empresa ? (
                                    <Errores>{errors.empresa}</Errores>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="email">Email:</label>
                                <Field
                                    id='email'
                                    type='email'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder='Email del cliente'
                                    name='email'
                                />
                                {errors.email && touched.email ? (
                                    <Errores>{errors.email}</Errores>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="telefono">Telefono:</label>
                                <Field
                                    id='telefono'
                                    type='tel'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    placeholder='Telefono del cliente'
                                    name='telefono'
                                />
                                {errors.telefono && touched.telefono ? (
                                    <Errores>{errors.telefono}</Errores>
                                ) : null}
                            </div>

                            <div className="mb-4">
                                <label className="text-gray-800" htmlFor="notas">Notas:</label>
                                <Field
                                    as='textarea'
                                    id='notas'
                                    type='text'
                                    className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                    placeholder='Notas del cliente'
                                    name='notas'
                                />
                                {errors.notas && touched.notas ? (
                                    <Errores>{errors.notas}</Errores>
                                ) : null}
                            </div>

                            <input type="submit" value={cliente?.nombre ? "Editar Cliente" : "Agregar cliente"} className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer"/>
                        </Form>
                )}}
            </Formik>
        </div>
      )
  )
};

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario;
