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

  const preciosBase = {
    precioDTF: 400,
    precioSublimación: 240,
    precioUVDTF: 720,
    precioCalandra: 300
  }

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
  const calcularImpresionDirecta = () => {
    var resultadoCal = (ancho * alto) * cantidad
    if (resultadoCal >= 1 && resultadoCal <= 4) {
      resultadoCal = resultadoCal * 22.5
    }
    else if (resultadoCal >= 5 && resultadoCal <= 9) {
      resultadoCal = resultadoCal * 6.25
    }
    else if (resultadoCal >= 10 && resultadoCal <= 16) {
      resultadoCal = resultadoCal * 3
    }
    else if (resultadoCal >= 17 && resultadoCal <= 25) {
      resultadoCal = resultadoCal * 1.58
    }
    else if (resultadoCal >= 26 && resultadoCal <= 36) {
      resultadoCal = resultadoCal * 1
    }
    else if (resultadoCal >= 65 && resultadoCal <= 172.8) {
      resultadoCal = 150
    }

    else if (resultadoCal >= 173) {
      resultadoCal = redondearA5(resultadoCal * 0.8680555555555556)
    }
    setSubTotal(redondearA5(resultadoCal))
  }

  const calcularBanner = () => {
    var resultadoCal = (ancho * alto)
    if (resultadoCal <= 699) {
      resultadoCal = 175
    }
    else if (resultadoCal >= 700) {
      resultadoCal = redondearA5(resultadoCal * 0.2430555555555555)
    }
    setSubTotal(resultadoCal * cantidad)
  }

  const calcularVinil = () => {
    var resultadoCal = (ancho * alto) * cantidad
    if (resultadoCal <= 699) {
      resultadoCal = 175
    }
    else if (resultadoCal >= 700) {
      resultadoCal = redondearA5(resultadoCal * 0.2430555555555555)
    }
    setSubTotal(resultadoCal)
  }


  const calcularAcrílico = () => {
    var resultadoCal = (ancho * alto) * (colorAcrilico[color] * grosorAcrilico[grosor]) * cantidad

    setSubTotal(redondearA5(resultadoCal))
  }

  const calcularCalandra = () => {
    var resultadoCal = (ancho * alto) * cantidad
    if (resultadoCal <= 2160) {
      resultadoCal = 500
    }
    else if (resultadoCal >= 2161 && resultadoCal <= 8640) {
      resultadoCal = (((Math.ceil(resultadoCal * 0.1111111111111111 / 240)) - 1) * 300) + 500
    }
    else if (resultadoCal >= 8641 && resultadoCal < 43200) {
      resultadoCal = redondearA5(resultadoCal * 0.138888888888888)
    }
    else if (resultadoCal >= 43200) {
      resultadoCal = redondearA5(resultadoCal * 0.129629629629629)
    }
    setSubTotal(resultadoCal)
  }

  const calcularLapiceros = () => {
    var resultadoCal = cantidad
    if (resultadoCal >= 1 && resultadoCal <= 10) {
      resultadoCal = 350
    }
    else if (resultadoCal >= 11 && resultadoCal <= 19) {
      resultadoCal = resultadoCal * 35
    }
    else if (resultadoCal >= 20 && resultadoCal <= 49) {
      resultadoCal = resultadoCal * 20
    }
    else if (resultadoCal >= 50 && resultadoCal <= 99) {
      resultadoCal = resultadoCal * 15
    }
    else if (resultadoCal >= 100 && resultadoCal <= 499) {
      resultadoCal = resultadoCal * 12
    }
    else if (resultadoCal >= 500 && resultadoCal <= 999) {
      resultadoCal = resultadoCal * 10
    }
    else if (resultadoCal >= 1000 && resultadoCal <= 3000) {
      resultadoCal = resultadoCal * 8
    }

    setSubTotal(resultadoCal)
  }


  const operaciones = {
    DTF: calcularDTF,
    Sublimación: calcularSublimacion,
    UVDTF: calcularUVDTF,
    ImpresionDirecta: calcularImpresionDirecta,
    Acrílico: calcularAcrílico,
    Banner: calcularBanner,
    Vinil: calcularVinil,
    Calandra: calcularCalandra,
    Lapiceros: calcularLapiceros

  };




  function ejecutarOperacion() {
    // Obtiene la función del objeto y la ejecuta
    if (ancho != 0 && alto != 0) {
      const funcion = operaciones[tipoImpresion] || (() => alert("Operación no definida"));
      return funcion(ancho, alto, colorAcrilico[color], grosorAcrilico[grosor]);
    } else if (cantidad != 0 && tipoImpresion == "Lapiceros") {

      return calcularLapiceros()
    }
    else {
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
        <option value="Calandra">Calandra</option>
        <option value="UVDTF">UV-DTF</option>
        <option value="ImpresionDirecta">Impresion Directa</option>
        <option value="Acrílico">Acrílico</option>
        <option value="Banner">Banner</option>
        <option value="Vinil">Vinil</option>
        <option value="Lapiceros">Lapiceros</option>
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

        <h2>
          RD$ {(subTotal / cantidad).toFixed(2)} unidad
        </h2>
        <h1>
          RD$ {separator(subTotal)}
        </h1>
      </div>

    </>
  )
}


export default App
