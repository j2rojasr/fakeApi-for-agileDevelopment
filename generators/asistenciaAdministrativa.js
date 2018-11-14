const faker = require(`faker/locale/es_MX`)
const helper = require(`../src/helper/helper`)

const sedes = require(`../static/sedes/sedes.json`)
const areaLaboral = require(`../static/areaLaboral/areaLaboral.json`)
let estadoAsistencia = require(`../static/estadoAsistencia/estadoAsistencia.json`).estadoAsistencia
//llamada a json generados
let trabajadores
try {
  trabajadores = require(`../generated/trabajadores/trabajadores.json`)
} catch (error) {  
  trabajadores = require(`../trabajadores.json`)
}

let amount = 0

const func = next => create => {
  const path = `asistenciaAdministrativa/asistenciaAdministrativa.json`
  const data = (amount) => {
    let areaLaboralIdArray = []
    let areaLaboralArray = []
    areaLaboral.areaLaboral.forEach((value, index) => {
      areaLaboralIdArray.push(value.id)
      areaLaboralArray.push(value.nombre)
    })

    let fechas_asistencia = [
      `01/09/2018`,
      `02/09/2018`,
      `03/09/2018`,
      `04/09/2018`,
      `05/09/2018`,
      `06/09/2018`,
      `07/09/2018`,
      `08/09/2018`,
      `09/09/2018`,
      `10/09/2018`
    ]

    let temp = []
    for (let index = 0; index < fechas_asistencia.length; index++) {
      let fecha_entrada = fechas_asistencia[index]

      let amount_por_fecha = faker.random.number({ min: 15, max: 20 })
      for (let i = 1; i <= amount_por_fecha; i++) {
        // cantidad
        amount++

        // random
        let randomAreaLaboral = helper.randomIntFromInterval(0, areaLaboralArray.length - 1)
        // nombresApellidos        
        //let nombres = faker.name.firstName()
        //let apellido_paterno = faker.name.lastName()
        // let apellido_materno = faker.name.lastName()

        let randomTrabajadores = helper.randomIntFromInterval(0, trabajadores.trabajadores.length - 1)

        let nombres = trabajadores.trabajadores[randomTrabajadores].nombres
        let apellidos = trabajadores.trabajadores[randomTrabajadores].apellidos
        debugger
        estadoAsistencia = estadoAsistencia.filter(e => e.codigo != 10 && e.codigo != 11)
        estadoAsistencia.push({codigo: ``, nombre: ``, descripcion: ``})
        let huella_entrada = helper.randomIntFromInterval(0, 1)
        let marco_entrada = 1

        if (huella_entrada == 0) {
        	marco_entrada = helper.randomIntFromInterval(0, 1)
        }

        // estadoAsistencia
        let randomEstadoAsistencia = helper.randomIntFromInterval(0, estadoAsistencia.length - 1)
        let randomSedes = helper.randomIntFromInterval(0, sedes.sedes.length - 1)
        let marcacion_entrada = helper.randomIntFromInterval(6, 7) + `:` + helper.randomIntFromInterval(0, 59)

        let estadoasistencia_codigo = ``
        let estadoasistencia_nombre = ``
        let estadoasistencia_descripcion = ``
        if (estadoAsistencia[randomEstadoAsistencia].codigo) {
        	estadoasistencia_codigo = estadoAsistencia[randomEstadoAsistencia].codigo
          estadoasistencia_nombre = estadoAsistencia[randomEstadoAsistencia].nombre
          estadoasistencia_descripcion = estadoAsistencia[randomEstadoAsistencia].descripcion
        } else {
        	marcacion_entrada = ``
        	huella_entrada = ``
        	marco_entrada = ``
        }

        temp.push(
          {
            id: i + 1,
            trabajador_id: trabajadores.trabajadores[randomTrabajadores].id,
            nombres,
            apellidos,
            cargo: areaLaboralArray[randomAreaLaboral],
            sede_base_descripcion: sedes.sedes[randomSedes].descripcion,
            sede_base_id: sedes.sedes[randomSedes].codigo,
            horario: `L-S`,
            entradaLV: `7:30`,
            entradaS: `8:00`,
            fecha_entrada,
            marcacion_entrada,
            huella_entrada,
            estadoasistencia_codigo,
            estadoasistencia_nombre,
            estadoasistencia_descripcion,
            observacion: '',
            estado: 1
          }
        )
      }
    }

    return temp
  }

  create({ data: { asistenciaAdministrativa: data(amount) }, path: path })
  next(create)
}

module.exports = func
