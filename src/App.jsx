import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [ancho, setAncho] = useState(0)
  const [alto, setAlto] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [subTotal, setSubTotal] = useState(0)
  const [color, setColor] = useState("Transparente")
  const [grosor, setGrosor] = useState("3mm")
  const [total, setTotal] = useState(0)
  const [tipoImpresion, setTipoImpresion] = useState("DTF")



  const colorAcrilico = {
    "Transparente": 1.5,
    "Colores": 1.8,
    "Dorado": 2.25
  }
  const grosorAcrilico = {
    "3mm": 1,
    "4.5mm": 1.5,
    "6mm": 2

  }

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
  const handlerColor = (event) => {
    setColor(event.target.value)

  }
  const handlerGrosor = (event) => {
    setGrosor(event.target.value)

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
  const calcularAcrílico = () => {
    var resultadoCal = (ancho * alto) * (colorAcrilico[color] * grosorAcrilico[grosor]) * cantidad

    setSubTotal(redondearA5(resultadoCal))
  }

  const operaciones = {
    DTF: calcularDTF,
    Sublimación: calcularSublimacion,
    UVDTF: calcularUVDTF,
    ImpresionDirecta: calcularImpresionDirecta,
    Acrílico: calcularAcrílico,

  };




  function ejecutarOperacion() {
    // Obtiene la función del objeto y la ejecuta
    if (ancho != 0 && alto != 0) {
      const funcion = operaciones[tipoImpresion] || (() => alert("Operación no definida"));
      return funcion(ancho, alto, colorAcrilico[color], grosorAcrilico[grosor]);
    } else {
      alert("Campos Vacío")
    }
  }
  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      ejecutarOperacion();
    }
  };
  return (
    <>
      <select name="" id="" onChange={handlerTipoImpresion}>
        <option value="DTF">DTF</option>
        <option value="Sublimación">Sublimación</option>
        <option value="UVDTF">UV-DTF</option>
        <option value="ImpresionDirecta">Impresion Directa</option>
        <option value="Acrílico">Acrílico</option>
        <option value="Banner">Banner</option>
        <option value="Vinil">Acrílico</option>
      </select>
      <div>
        <div>

          <label htmlFor="">Ancho</label>
        </div>
        <input type="number" name="" id="" onChange={handlerAncho} onKeyDown={handleKeyDown} />

      </div>
      <div>
        <div>

          <label htmlFor="">Alto</label>
        </div>
        <input type="number" name="" id="" onChange={handlerAlto} onKeyDown={handleKeyDown} />
        <div>

          <label htmlFor="">Cantidad</label>
        </div>
      </div>
      <input type="number" name="" id="" defaultValue={cantidad} onChange={handlerCantidad} onKeyDown={handleKeyDown} />

      {tipoImpresion == "Acrílico" ?
        <div>
          <select name="" id="" onChange={handlerColor} >
            <option value="Transparente">Transparente</option>
            <option value="Colores">Colores</option>
            <option value="Dorado">Dorado</option>
          </select>


          <select name="" id="" onChange={handlerGrosor} >
            <option value="3mn">3mm</option>
            <option value="4.5mm">4.5mm</option>
            <option value="6mm">6mm</option>
          </select>
        </div> : undefined

      }
      <div>
        <input type="button" name="" id="" value="Calcular" onClick={ejecutarOperacion || handleKeyDown} />
      </div>
      <div>

        <h3>
          {cantidad} {cantidad > 1 ? "veces" : "vez"} - {ancho} x {alto} pulgs
        </h3>

        <h1>
          RD$ {separator(subTotal)}
        </h1>
      </div>

    </>
  )
}


export default App
