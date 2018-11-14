const faker = require(`faker/locale/es_MX`)

const razonSocial = require(`../static/razonSocial/razonSocial.json`)
const documentoIdentidad = require(`../static/documentoIdentidad/documentoIdentidad.json`)
const sedes = require(`../static/sedes/sedes.json`)
const areaLaboral = require(`../static/areaLaboral/areaLaboral.json`)
const cargoLaboral = require(`../static/cargoLaboral/cargoLaboral.json`)
const tipoPlanilla = require(`../static/tipoPlanilla/tipoPlanilla.json`)
const fondoPensionesSeguro = require(`../static/fondoPensionesSeguro/fondoPensionesSeguro.json`)

const amount = 650

const func = next => create => {
  const path = `planillaComparativo/planillaComparativo.json`
  const data = (amount) => {
    let rndm

    rndm = faker.random.arrayElement(razonSocial.razonSocial)
    let razonsocial_id = rndm.id, razonsocial_nombre = rndm.nombre

    rndm = faker.random.arrayElement(documentoIdentidad.documentoIdentidad)
    let documentoidentidad_tipo_id = rndm.id, documentoidentidad_nombre = rndm.nombre
    
    rndm = faker.random.arrayElement(sedes.sedes)
    let sede_id = rndm.codigo, sede_nombre = rndm.descripcion

    rndm = faker.random.arrayElement(areaLaboral.areaLaboral)
    let arealaboral_id = rndm.id, arealaboral_nombre = rndm.nombre
    
    rndm = faker.random.arrayElement(cargoLaboral.cargoLaboral)
    let cargoLaboral_id = rndm.id, cargoLaboral_nombre = rndm.nombre

    rndm = faker.random.arrayElement(tipoPlanilla.tipoPlanilla)
    let tipoplanilla_id = rndm.id, tipoplanilla_nombre = rndm.nombre

    rndm = faker.random.arrayElement(fondoPensionesSeguro.fondoPensionesSeguro)
    let fondopensionesseguro_id = rndm.id, fondopensionesseguro_nombre = rndm.nombre

    let temp = []
    for (let i = 1; i <= amount; i++) {
      // nombresApellidos
      let nombres = faker.name.firstName()
      let apellidos = faker.name.lastName()
      let nombresapellidos = `${nombres} ${apellidos}`
      
      // salario
      let salario_basico_planillareal = faker.random.number({ min: 1200, max: 2500 })
      let salario_asignacionfamiliar_planillareal = faker.random.number({ min: 15, max: 90 })
      let salario_transporte_planillareal = faker.random.number({ min: 10, max: 200 })
      let salario_refrigerio_planillareal = faker.random.number({ min: 10, max: 150 })
      let salario_bruto_planillareal = salario_basico_planillareal + salario_asignacionfamiliar_planillareal + salario_transporte_planillareal + salario_refrigerio_planillareal

      let salario_basico_planillalegal = faker.random.number({ min: 1200, max: 2500 })
      let salario_asignacionfamiliar_planillalegal = faker.random.number({ min: 15, max: 90 })
      let salario_transporte_planillalegal = faker.random.number({ min: 10, max: 200 })
      let salario_refrigerio_planillalegal = faker.random.number({ min: 10, max: 150 })
      let salario_bruto_planillalegal = salario_basico_planillalegal + salario_asignacionfamiliar_planillalegal + salario_transporte_planillalegal + salario_refrigerio_planillalegal

      temp.push(
        {
          id: i,
          numero_orden: i,

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

          razonsocial_nombre,
          razonsocial_id,

          sede_id,
          sede_nombre,
          
          arealaboral_id,
          arealaboral_nombre,

          cargoLaboral_id,
          cargoLaboral_nombre,

          tipoplanilla_id,
          tipoplanilla_nombre,

          fondopensionesseguro_nombre,
          fondopensionesseguro_id,

          salario_basico_planillareal,
          salario_asignacionfamiliar_planillareal,
          salario_transporte_planillareal,
          salario_refrigerio_planillareal,
          salario_bruto_planillareal,

          salario_basico_planillalegal,
          salario_asignacionfamiliar_planillalegal,
          salario_transporte_planillalegal,
          salario_refrigerio_planillalegal,
          salario_bruto_planillalegal,

          fecha_iniciocontrato: faker.date.past(),
          fecha_fincontrato: faker.date.past(),
          fecha_firmacontrato: faker.date.recent(),

          periodo_vigenciacontrato: faker.date.between(faker.date.past(), faker.date.recent())
        }
      )
    }

    return temp
  }

  create({ data: { planillaComparativo: data(amount) }, path: path })
  next(create)
}

module.exports = func
