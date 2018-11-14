const faker = require(`faker/locale/es_MX`)
let trabajadores
try {
  trabajadores = require(`../generated/trabajadores/trabajadores.json`)
} catch (error) {  
  trabajadores = require(`../trabajadores.json`)
}

const amount = 1000

const func = next => create => {
  const path = `descuentoMensualAdministrativos/descuentoMensualAdministrativos.json`
  const data = (amount) => {


    let temp = []
    let randomTrabajador
    for (let i = 1; i <= amount; i++) {
      // nombresApellidos
      randomTrabajador = faker.random.arrayElement(trabajadores.trabajadores)

      let trabajador_id = randomTrabajador.id
      let trabajador_documentoidentidad = randomTrabajador.documentoidentidad
      let trabajador_nombres = randomTrabajador.nombres
      let trabajador_apellidos = randomTrabajador.apellidos
      let cargolaboral_id = randomTrabajador.cargoLaboral_id
      let cargolaboral_nombre = randomTrabajador.cargoLaboral_nombre
      let descuento_total = faker.random.number({
        min: 0,
        max: 150
      })
      let sede_id = randomTrabajador.sede_id
      let sede_nombre = randomTrabajador.sede_nombre
      let estado = 1


      temp.push({
        id: i + 946,
        numero_orden: `${i}`,
        trabajador_id,
        trabajador_documentoidentidad,
        trabajador_nombres,
        trabajador_apellidos,
        cargolaboral_id,
        cargolaboral_nombre,
        descuento_total,
        sede_id,
        sede_nombre,
        estado
      })
    }

    return temp
  }

  create({
    data: {
      descuentoMensualAdministrativos: data(amount)
    },
    path: path
  })
  next(create)
}

module.exports = func