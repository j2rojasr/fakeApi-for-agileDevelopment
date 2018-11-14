const faker = require(`faker/locale/es_MX`)
const sedes = require(`../static/sedes/sedes.json`).sedes
//llamada a json generados
let trabajadores
try {
    trabajadores = require(`../generated/trabajadores/trabajadores.json`).trabajadores
} catch (error) {    
    trabajadores = require(`../trabajadores.json`).trabajadores
}

let amount = 17
let obj
const func = next => create => {
    const path = `montosDocentes/montosDocentes.json`
    const data = (amount) => {
        let temp = []
        let tipo_planillas = [{
            id: 1,
            descripcion: "MENSUAL"
        }, {
            id: 2,
            descripcion: "QUINCENAL"
        }, {
            id: 3,
            descripcion: "HORAS"
        }, {
            id: 4,
            descripcion: "JEFE DE CURSO"
        }]
        sedes.forEach((sede) => {
            for (let index = 0; index < amount; index++) {
                obj = faker.random.arrayElement(trabajadores)
                let trabajador_id = obj.id
                let trabajador_apellidos = obj.apellidos
                let trabajador_nombres = obj.nombres
                obj = faker.random.arrayElement(tipo_planillas)
                let tipoplanilla_id = obj.id
                let tipoplanilla_descripcion = obj.descripcion
                let montomensual = faker.random.number({
                    min: 1500,
                    max: 6000
                })
                let descuento = faker.random.number({
                    min: 10,
                    max: 150
                })
                let total = montomensual - descuento
                let estado = 1
                let sede_id = sede.codigo
                let sede_descripcion = sede.descripcion
                let pagoA = faker.random.number({
                    min: 15,
                    max: 20
                })
                let pagoB = faker.random.number({
                    min: 18,
                    max: 25
                })
                let pagoC = faker.random.number({
                    min: 19,
                    max: 30
                })
                let pagoD = faker.random.number({
                    min: 20,
                    max: 25
                })
                let pagoE = faker.random.number({
                    min: 22,
                    max: 28
                })
                let pagoF = faker.random.number({
                    min: 25,
                    max: 30
                })
                let pagoG = faker.random.number({
                    min: 30,
                    max: 40
                })
                let pagoH = faker.random.number({
                    min: 25,
                    max: 30
                })


                temp.push({
                    id: index + 1,
                    trabajador_id,
                    trabajador_apellidos,
                    trabajador_nombres,
                    tipoplanilla_id,
                    tipoplanilla_descripcion,
                    montomensual,
                    estado,
                    descuento,
                    total,
                    sede_id,
                    sede_descripcion,
                    pagoA,
                    pagoB,
                    pagoC,
                    pagoD,
                    pagoE,
                    pagoF,
                    pagoG,
                    pagoH,
                    estado
                })
            }
        })
        return temp
    }
    create({
        data: {
            montosDocentes: data(amount)
        },
        path: path
    })
    next(create)
}
module.exports = func