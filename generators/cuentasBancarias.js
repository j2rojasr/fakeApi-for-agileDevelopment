const faker = require(`faker/locale/es_MX`)
const helper = require(`../src/helper/helper`)

// static
const banco = require(`../static/banco/banco.json`)
const documentoIdentidad = require(`../static/documentoIdentidad/documentoIdentidad.json`)
const cuentaBancariaTipo = require(`../static/cuentaBancariaTipo/cuentaBancariaTipo.json`)

const amount = 1200

const func = next => create => {
  const path = `cuentasBancarias/cuentasBancarias.json`
  const data = (amount) => {
    let bancoIdArray = []
    let bancoArray = []
    banco.banco.forEach((value, index) => {
      bancoIdArray.push(value.id)
      bancoArray.push(value.nombre)
    });

    let estadoCuentaHabilitadaArray = [true, false]

    let documentoIdentidadIdArray = []
    let documentoIdentidadArray = []
    documentoIdentidad.documentoIdentidad.forEach((value, index) => {
      documentoIdentidadIdArray.push(value.id)
      documentoIdentidadArray.push(value.nombre)
    });

    let cuentaBancariaTipoIdArray = []
    let cuentaBancariaTipoArray = []
    cuentaBancariaTipo.cuentaBancariaTipo.forEach((value, index) => {
      cuentaBancariaTipoIdArray.push(value.id)
      cuentaBancariaTipoArray.push(value.nombre)
    });

    let temp = []
    for (let i = 1; i <= amount; i++) {
      let randomBancoArray = helper.randomIntFromInterval(0, bancoArray.length - 1)
      let randomEstadoCuentaHabilitadaArray = helper.randomIntFromInterval(0, estadoCuentaHabilitadaArray.length - 1)
      let randomDocumentoIdentidadArray = helper.randomIntFromInterval(0, documentoIdentidadArray.length - 1)
      let randomCuentaBancariaTipoArray = helper.randomIntFromInterval(0, cuentaBancariaTipoArray.length - 1)

      let banco_id = bancoIdArray[randomBancoArray]
      let banco_nombre = bancoArray[randomBancoArray]

      let documentoidentidad_tipo_id = documentoIdentidadIdArray[randomDocumentoIdentidadArray]
      let documentoidentidad_nombre = documentoIdentidadArray[randomDocumentoIdentidadArray]

      let cuentabancaria_tipo_id = cuentaBancariaTipoIdArray[randomCuentaBancariaTipoArray]
      let cuentabancaria_tipo_descripcion = cuentaBancariaTipoArray[randomCuentaBancariaTipoArray]

      temp.push(
        {
          id: i + 45,
          numero_orden: `${i}`,

          persona_id: faker.random.number({ min: 1111111, max: 9999999 }),
          persona_nombresapellidos: `${faker.name.lastName()} ${faker.name.firstName()}`,
          persona_nombres: faker.name.firstName(),
          persona_apellidos: faker.name.lastName(),

          documentoidentidad_tipo_id,
          documentoidentidad_nombre,
          persona_documentoidentidad: faker.random.number({ min: 11284112, max: 85641174 }),

          banco_id,
          banco_nombre,
          cuentabancaria_tipo_id,
          cuentabancaria_tipo_descripcion,
          cuentabancaria: faker.random.number({ min: 12345678912345678912, max: 98765432198765432198 }),

          estado_cuentahabilitada: estadoCuentaHabilitadaArray[randomEstadoCuentaHabilitadaArray]
        }
      )
    }

    return temp;
  }

  create({ data: { cuentasBancarias: data(amount) }, path: path })
  next(create)
}

module.exports = func
