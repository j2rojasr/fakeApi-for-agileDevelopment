const faker = require(`faker/locale/es_MX`)
const helper = require(`../src/helper/helper`)
const money = require(`../src/helper/money`)

// static
const cargoLaboral = require(`../static/cargoLaboral/cargoLaboral.json`)
const contratoTipo = require(`../static/contratoTipo/contratoTipo.json`)
const sedes = require(`../static/sedes/sedes.json`)
const turnoLaboral = require(`../static/turnoLaboral/turnoLaboral.json`)
const razonSocial = require(`../static/razonSocial/razonSocial.json`)
const documentoIdentidad = require(`../static/documentoIdentidad/documentoIdentidad.json`)

const amount = 100

const func = next => create => {
  const path = `contratos/contratos.json`
  const data = (amount) => {
    let cargoLaboralIdArray = []
    let cargoLaboralArray = []
    cargoLaboral.cargoLaboral.forEach((value, index) => {
      cargoLaboralIdArray.push(value.id)
      cargoLaboralArray.push(value.nombre)
    })

    let contratoTipoIdArray = []
    let contratoTipoArray = []
    contratoTipo.contratoTipo.forEach((value, index) => {
      contratoTipoIdArray.push(value.id)
      contratoTipoArray.push(value.nombre)
    })

    let sedesArray = []
    let sedesIdArray = []
    sedes.sedes.forEach((value, index) => {
      sedesIdArray.push(value.codigo)
      sedesArray.push(value.descripcion)
    })

    let turnoLaboralIdArray = []
    let turnoLaboralArray = []
    turnoLaboral.turnoLaboral.forEach((value, index) => {
      turnoLaboralIdArray.push(value.id)
      turnoLaboralArray.push(value.nombre)
    })

    let razonSocialIdArray = []
    let razonSocialArray = []
    razonSocial.razonSocial.forEach((value, index) => {
      razonSocialIdArray.push(value.id)
      razonSocialArray.push(value.nombre)
    })

    // Modo de uso: 500,34 USD
    let salario_bruto_texto = money.numeroALetras(500.30 + 120 + 100 + 80, {
      plural: `NUEVOS SOLES`,
      singular: `NUEVO SOL`,
      centPlural: `CÉNTIMOS`,
      centSingular: `CÉNTIMO`
    })

    let estadoBajaArray = [true, false]

    let documentoIdentidadIdArray = []
    let documentoIdentidadArray = []
    documentoIdentidad.documentoIdentidad.forEach((value, index) => {
      documentoIdentidadIdArray.push(value.id)
      documentoIdentidadArray.push(value.nombre)
    })

    let temp = []
    for (let i = 1; i <= amount; i++) {
      // random
      let randomDocumentoIdentidadArray = helper.randomIntFromInterval(0, documentoIdentidadArray.length - 1)
      let randomcargoLaboral = helper.randomIntFromInterval(0, cargoLaboralArray.length - 1)
      let randomContratoTipo = helper.randomIntFromInterval(0, contratoTipoArray.length - 1)
      let randomSedes = helper.randomIntFromInterval(0, sedesIdArray.length - 1)
      let randomTurnoLaboral = helper.randomIntFromInterval(0, turnoLaboralArray.length - 1)
      let randomRazonSocial = helper.randomIntFromInterval(0, razonSocialArray.length - 1)
      let randomEstadoBajaArray = helper.randomIntFromInterval(0, estadoBajaArray.length - 1)

      // nombresApellidos
      let persona_nombres = faker.name.firstName()
      let persona_apellidos = faker.name.lastName()
      let persona_nombresapellidos = `${persona_nombres} ${persona_apellidos}`
            
      // documentoIdentidad
      let documentoidentidad_tipo_id = documentoIdentidadIdArray[randomDocumentoIdentidadArray]
      let documentoidentidad_nombre = documentoIdentidadArray[randomDocumentoIdentidadArray]

      temp.push(
        {
          id: i + 150,
          numero_orden: `${i}`,
          documentoidentidad_tipo_id,
          documentoidentidad_nombre,
          documentoidentidad: faker.random.number({ min: 11284112, max: 85641174 }),
          persona_nombres,
          persona_apellidos,
          persona_nombresapellidos,
          persona_domicilio: faker.address.streetAddress(),
          fecha_inicio_vigencia: faker.date.past(faker.random.number({ min: 0, max: 3 })),
          fecha_final_vigencia: faker.date.future(faker.random.number({ min: 0, max: 1 })),
          fecha_firma: faker.date.recent(),

          salario_basico: 500.30,
          salario_bono_asignacionfamiliar: 120,
          salario_bono_transporte: 100,
          salario_bono_refrigerio: 80,
          salario_bruto: 800.30,
          salario_bruto_texto: salario_bruto_texto,

          persona_cargoLaboral: cargoLaboralArray[randomcargoLaboral],
          cargoLaboral_id: cargoLaboralIdArray[randomcargoLaboral],

          tipocontrato_nombre: contratoTipoArray[randomContratoTipo],
          tipocontrato_id: contratoTipoIdArray[randomContratoTipo],

          sede_seguimientopersona: sedesArray[randomSedes],
          sede_id: sedesIdArray[randomSedes],

          persona_turnolaboral: turnoLaboralArray[randomTurnoLaboral],
          turnolaboral_id: turnoLaboralIdArray[randomTurnoLaboral],

          razonsocial_nombre: razonSocialArray[randomRazonSocial],
          razonsocial_id: razonSocialIdArray[randomRazonSocial],

          estado_baja: estadoBajaArray[randomEstadoBajaArray]
        }
      )
    }

    return temp
  }

  create({ data: { contratos: data(amount) }, path: path })
  next(create)
}

module.exports = func
