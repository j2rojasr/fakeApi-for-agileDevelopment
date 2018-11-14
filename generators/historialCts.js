const faker = require(`faker/locale/es_MX`)
const helper = require(`../src/helper/helper`)

const razonSocial = require(`../static/razonSocial/razonSocial.json`)
const documentoIdentidad = require(`../static/documentoIdentidad/documentoIdentidad.json`)
const periodoCts = require(`../static/periodoCts/periodoCts.json`)
const banco = require(`../static/banco/banco.json`)

const amount = 615

const func = next => create => {
  const path = `historialCts/historialCts.json`
  const data = (amount) => {
    let razonSocialIdArray = []
    let razonSocialArray = []
    razonSocial.razonSocial.forEach((value, index) => {
      razonSocialIdArray.push(value.id)
      razonSocialArray.push(value.nombre)
    })

    let documentoIdentidadIdArray = []
    let documentoIdentidadArray = []
    documentoIdentidad.documentoIdentidad.forEach((value, index) => {
      documentoIdentidadIdArray.push(value.id)
      documentoIdentidadArray.push(value.nombre)
    })

    let periodoCtsIdArray = []
    let periodoCtsArray = []
    periodoCts.periodoCts.forEach((value, index) => {
      periodoCtsIdArray.push(value.id)
      periodoCtsArray.push(value.descripcion)
    })

    let bancoIdArray = []
    let bancoArray = []
    banco.banco.forEach((value, index) => {
      bancoIdArray.push(value.id)
      bancoArray.push(value.nombre)
    })

    let estadoPagoCtsRegistradoArray = [true, false]

    let temp = []
    for (let i = 1; i <= amount; i++) {
      // random
      let randomDocumentoIdentidadArray = helper.randomIntFromInterval(0, documentoIdentidadArray.length - 1)
      let randomEstadoPagoCtsRegistradoArray = helper.randomIntFromInterval(0, estadoPagoCtsRegistradoArray.length - 1)
      let randomRazonSocial = helper.randomIntFromInterval(0, razonSocialArray.length - 1)
      let randomPeriodoCts = helper.randomIntFromInterval(0, periodoCtsArray.length - 1)
      let randomBancoArray = helper.randomIntFromInterval(0, bancoArray.length - 1)

      // nombresApellidos
      let nombres = faker.name.firstName()
      let apellidos = faker.name.lastName()
      let nombresapellidos = `${nombres} ${apellidos}`

      // documentoIdentidad
      let documentoidentidad_tipo_id = documentoIdentidadIdArray[randomDocumentoIdentidadArray]
      let documentoidentidad_nombre = documentoIdentidadArray[randomDocumentoIdentidadArray]

      // razonSocial
      let razonsocial_nombre = razonSocialArray[randomRazonSocial]
      let razonsocial_id = razonSocialIdArray[randomRazonSocial]

      // periodoCts
      let periodo_id = periodoCtsIdArray[randomPeriodoCts]
      let periodo_nombre = periodoCtsArray[randomPeriodoCts]

      let banco_id = bancoIdArray[randomBancoArray]
      let banco_nombre = bancoArray[randomBancoArray]

      let montocts_depositado = `1500.00`

      temp.push(
        {
          id: i + 946,
          numero_orden: `${i}`,

          nombres,
          apellidos,
          nombresapellidos,

          documentoidentidad_tipo_id,
          documentoidentidad_nombre,
          documentoidentidad: faker.random.number({ min: 11284112, max: 85641174 }),
          puesto_laboral: faker.name.jobArea(),

          razonsocial_nombre,
          razonsocial_id,
          periodo_id,
          periodo_nombre,
          fecha_pagocts: faker.date.past(),
          banco_id,
          banco_nombre,
          cuentabancaria: faker.random.number({ min: 12345678912345678912, max: 98765432198765432198 }),
          montocts_depositado,

          estado_pagoctsregistrado: estadoPagoCtsRegistradoArray[randomEstadoPagoCtsRegistradoArray]
        }
      )
    }

    return temp
  }

  create({ data: { historialCts: data(amount) }, path: path })
  next(create)
}

module.exports = func
