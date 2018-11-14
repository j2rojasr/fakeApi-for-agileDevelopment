const faker = require(`faker/locale/es_MX`)

const razonSocial = require(`../static/razonSocial/razonSocial.json`)
const documentoIdentidad = require(`../static/documentoIdentidad/documentoIdentidad.json`)
const sedes = require(`../static/sedes/sedes.json`)
const areaLaboral = require(`../static/areaLaboral/areaLaboral.json`)
const cargoLaboral = require(`../static/cargoLaboral/cargoLaboral.json`)
const tipoPlanilla = require(`../static/tipoPlanilla/tipoPlanilla.json`)
const fondoPensionesSeguro = require(`../static/fondoPensionesSeguro/fondoPensionesSeguro.json`)

const amount = 1000

const func = next => create => {
  const path = `trabajadores/trabajadores.json`
  const data = (amount) => {
    let rndm

    //Agregado por Billy, se necesitaba para registrar tolerancias
    let horarioIngreso = [
      {
        "horarioLV": `07:20`,
        "horarioSabado": `07:45`
      },
      {
        "horarioLV": `07:25`,
        "horarioSabado": ``
      },
      {
        "horarioLV": `07:20`,
        "horarioSabado": ``
      },
      {
        "horarioLV": `07:20`,
        "horarioSabado": `07:30`
      },
      {
        "horarioLV": `13:05`,
        "horarioSabado": `07:30`
      },
      {
        "horarioLV": `07:20`,
        "horarioSabado": `07:35`
      },
      {
        "horarioLV": `13:05`,
        "horarioSabado": `07:35`
      },
      {
        "horarioLV": `07:25`,
        "horarioSabado": `07:50`
      },
      {
        "horarioLV": `08:00`,
        "horarioSabado": ``
      },
      {
        "horarioLV": `08:30`,
        "horarioSabado": ``
      },
      {
        "horarioLV": `07:35`,
        "horarioSabado": `08:00`
      },
      {
        "horarioLV": `08:00`,
        "horarioSabado": `08:00`
      },
      {
        "horarioLV": `07:45`,
        "horarioSabado": `07:45`
      },
      {
        "horarioLV": `21:05`,
        "horarioSabado": `14:35`
      },
      {
        "horarioLV": `07:00`,
        "horarioSabado": `07:00`
      }
    ]

    let temp = []

    let arraySobreGiro = [0,50,10]
    let arrayTipoPlanilla = ["Mensual","Horas","Quincenal"]
    let arrayEstado = ["Activo","Inactivo","Bloqueado"]

    for (let i = 1; i <= amount; i++) {
      // nombresApellidos
      let nombres = faker.name.firstName()
      let apellidos = faker.name.lastName()
      let nombresapellidos = `${nombres} ${apellidos}`

      rndm = faker.random.arrayElement(sedes.sedes)
      let sede_id = rndm.codigo, sede_nombre = rndm.descripcion

      rndm = faker.random.arrayElement(razonSocial.razonSocial)
      let razonsocial_id = rndm.id, razonsocial_nombre = rndm.nombre

      rndm = faker.random.arrayElement(documentoIdentidad.documentoIdentidad)
      let documentoidentidad_tipo_id = rndm.id, documentoidentidad_nombre = rndm.nombre


      rndm = faker.random.arrayElement(areaLaboral.areaLaboral)
      let arealaboral_nombre = rndm.id, arealaboral_id = rndm.nombre

      rndm = faker.random.arrayElement(tipoPlanilla.tipoPlanilla)
      let tipoplanilla_nombre = rndm.id, tipoplanilla_id = rndm.nombre

      rndm = faker.random.arrayElement(fondoPensionesSeguro.fondoPensionesSeguro)
      let fondopensionesseguro_nombre = rndm.id, fondopensionesseguro_id = rndm.nombre


      rndm = faker.random.arrayElement(horarioIngreso)
      let horarioLV = rndm.horarioLV
      let horarioSabado = rndm.horarioSabado

      rndm = faker.random.arrayElement(cargoLaboral.cargoLaboral)
      let cargoLaboral_id = rndm.id, cargoLaboral_nombre = rndm.nombre


      let index_tipoPlanilla = faker.random.number({ min: 0, max: 2 })
      let codigo_tipoPlanilla = index_tipoPlanilla + 1
      let tipoPlanilla_remastered = arrayTipoPlanilla[index_tipoPlanilla]
      

      temp.push(
        {
          id: i ,
          numero_orden: `${i}`,
          nombres,
          apellidos,
          nombresapellidos,

          documentoidentidad_tipo_id,
          documentoidentidad_nombre,
          documentoidentidad: faker.random.number({ min: 11284112, max: 85641174 }),

          email: faker.internet.email(),
          foto_personal: faker.image.imageUrl(),
          celular: faker.phone.phoneNumber(),
          direccion: faker.address.streetAddress(),
          pais: faker.address.country(),
          fecha_nacimiento: faker.date.past(),

          razonsocial_nombre,
          razonsocial_id,

          fecha_ingresolaboral: faker.date.past(),
          sueldo_planilla: faker.random.number({ min: 1000, max: 4500 }),
          sueldo_prorrateo_planilla: faker.random.number({ min: 1000, max: 4500 }),
          pago_planilla : faker.random.number({min: 0, max : 200}),
          descuento_planilla : faker.random.number({min: 0, max : 200}),
          reintegro_planilla : 0,
          neto_planilla : faker.random.number({ min: 1000, max: 4500 }),
          sobregiro_planilla : arraySobreGiro[faker.random.number({min: 0, max: 2})],
          observacion_planilla : faker.hacker.phrase(),

          sede_nombre,
          sede_id,

          arealaboral_nombre,
          arealaboral_id,

          cargoLaboral_nombre,
          cargoLaboral_id,

          tipoplanilla_nombre,
          tipoplanilla_id,

          tipoPlanilla_remastered,
          codigo_tipoPlanilla,

          fondopensionesseguro_nombre,
          fondopensionesseguro_id,

          horarioLV,
          horarioSabado,

          estado : faker.random.arrayElement(arrayEstado),

          activo : faker.random.number({min : 1, max : 2})
        }
      )
    }

    return temp
  }

  create({ data: { trabajadores: data(amount) }, path: path })
  next(create)
}

module.exports = func
