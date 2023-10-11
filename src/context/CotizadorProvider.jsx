import {useState, createContext } from "react";
import { obtenerDiferenciaYear,calcularMarca,calcularPlan,formatearDinero} from "../helpers/index.js";


const CotizadorContext = createContext();

const CotizadorProvider = ({children}) =>{

    const [datos,setDatos] = useState({
        marca : '',
        year:'',
        plan:''
    })

    const [error,setError] = useState('')
    const [resultado,setResultado] = useState(0)
    const [cargando,setCargando] = useState(false)


    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () =>{
        // Una base
        let resultado = 2000

        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

         // -3%
        resultado -= ((diferencia*3) *resultado )/100

        resultado *= calcularMarca(datos.marca)

        resultado *= calcularPlan(datos.plan)

        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setCargando(false)
        },3000)
        setResultado(resultado)
       
    }
    
    return(
        <CotizadorContext.Provider
        value={{
            datos,
            resultado,
            error,
            setError,
            handleChangeDatos,
            cotizarSeguro,
            cargando
            
        }}
        > 
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext