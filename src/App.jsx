import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [tipoImpresion, setTipoImpresion] = useState("DTF")



  const redondearA5 = (a) => {
    return Math.ceil(a / 5) * 5
  }

  const handlerAlto = (event) => {
    setAlto(event.target.value)
  }
  const handlerAncho = (event) => {
    setAncho(event.target.value)
  }
  const handlerTipoImpresion = (event) => {
    setTipoImpresion(event.target.value)
    console.log(event.target.value)
  }
  useEffect(() => {

  }, [])

  const handlerCantidad = (event) => {
    setCantidad(event.target.value)

  }
  const CalcularTotal = () => {
    setTotal(subTotal * cantidad)

  }



  const calcularDTF = () => {
    var resultadoCal = (ancho * alto) * cantidad

    if (resultadoCal <= 125) {
      resultadoCal = 125
    }
    else if (resultadoCal >= 125 && resultadoCal <= 186) {
      resultadoCal = redondearA5(resultadoCal)
    }
    else if (resultadoCal >= 187 && resultadoCal <= 396) {
      resultadoCal = 200
    }
    else if (resultadoCal > 396) {
      resultadoCal = redondearA5(resultadoCal * 0.5050505050505051)
    }
    setSubTotal(resultadoCal)
  }

  const calcularSublimacion = () => {
    var resultadoCal = (ancho * alto) * cantidad
    if (resultadoCal <= 450) {
      resultadoCal = 50
    } else if (resultadoCal > 450) {
      resultadoCal = redondearA5(resultadoCal * 0.1111111111111111)

    }
    setSubTotal(resultadoCal)
  }

  const calcularUVDTF = () => {
    var resultadoCal = (ancho * alto) * cantidad
    if (resultadoCal <= 88) {
      resultadoCal = 200

    }
    else if (resultadoCal >= 89 && resultadoCal <= 143) {
      resultadoCal = redondearA5(resultadoCal * 2.272727272727271)
    }
    else if (resultadoCal >= 144 && resultadoCal <= 165) {
      resultadoCal = 350
    }

    else if (resultadoCal >= 176 && resultadoCal <= 263) {
      resultadoCal = redondearA5(resultadoCal * 1.988636363636363)

    }
    else if (resultadoCal >= 264) {
      resultadoCal = redondearA5(resultadoCal * 1.818181818181818)

    }
    setSubTotal(resultadoCal)

  }
  const calcularImpresionDirecta = () => { }
  const calcularAcrílico = () => { }

  const operaciones = {
    DTF: calcularDTF,
    Sublimación: calcularSublimacion,
    UVDTF: calcularUVDTF,
    ImpresionDirecta: calcularImpresionDirecta,
    Acrílico: calcularAcrílico,

  };


  function ejecutarOperacion() {
    // Obtiene la función del objeto y la ejecuta
    const funcion = operaciones[tipoImpresion] || (() => console.log("Operación no válida"));
    return funcion(ancho, alto);
  }

  return (
    <>
      <label htmlFor="">An</label>
      <input type="number" name="" id="" onChange={handlerAncho} />
      <label htmlFor="">Al</label>
      <input type="number" name="" id="" onChange={handlerAlto} />
      <label htmlFor="">Cantidad</label>
      <input type="number" name="" id="" defaultValue={cantidad} onChange={handlerCantidad} />

      <select name="" id="" onChange={handlerTipoImpresion}>
        <option value="DTF">DTF</option>
        <option value="Sublimación">Sublimación</option>
        <option value="UVDTF">UV-DTF</option>
        <option value="ImpresionDirecta">Impresion Directa</option>
        <option value="Acrílico">Acrílico</option>
      </select>


      <select name="" id="" >
        <option value="Transparente">Transparente</option>
        <option value="Colores">Colores</option>
        <option value="Dorado">Dorado</option>
      </select>


      <select name="" id="" >
        <option value="3mn">3mm</option>
        <option value="4.5mm">4.5mm</option>
        <option value="6mm">6mm</option>
      </select>
      <input type="button" name="" id="" value="Calcular" onClick={ejecutarOperacion} />
      <div>

        <h3>
        {cantidad} {cantidad>1?"veces":"vez"} - {ancho} x {alto} pulgs
        </h3>

        <h1>
          {subTotal}
        </h1>
      </div>

    </>
  )
}


export default App
