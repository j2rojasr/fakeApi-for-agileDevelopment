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
	const path = `detalleMontosDocentes/detalleMontosDocentes.json`
	const data = (amount) => {
		let temp = []
		const generar_rango_fechas = () => {
			var fechaInicio = new Date('2018-09-01');
			var fechaFin = new Date();
			let fechas = []
			while (fechaFin.getTime() >= fechaInicio.getTime()) {
				fechaInicio.setDate(fechaInicio.getDate() + 1);
				fechas.push(fechaInicio.getDate() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getFullYear())
			}
			return fechas
		}

		let fechas = generar_rango_fechas()
		let horario_ingreso = ["07:50", "09:00", "10:00"]
		let horario_salida = ["09:15", "12:50", "14:00"]
		let tipos_asistencia = ["SEMINARIO", "RECUPERACION", "ASESORIA", "ORDINARIA"]
		let aulas = ["1A", "2A", "3A", "4A", "5A"]
		let costos = ["A", "B", "C", "D", "E", "F", "G", "H"]

		let obj
		let id = 1
		let numero_orden = 1
		fechas.forEach((fecha) => {
			let marcacion_entrada = faker.random.number({
				min: 0,
				max: 16
			}) + ":" + faker.random.number({
				min: 0,
				max: 59
			})
			let marcacion_salida = faker.random.number({
				min: 0,
				max: 16
			}) + ":" + faker.random.number({
				min: 0,
				max: 59
			})

			obj = faker.random.arrayElement(horario_ingreso)
			let hora_ingreso = obj

			obj = faker.random.arrayElement(horario_salida)
			let hora_salida = obj

			obj = faker.random.arrayElement(tipos_asistencia)
			let tipo_asistencia = obj

			obj = faker.random.arrayElement(sedes)
			let sede_id = obj.codigo
			let sede_descripcion = obj.descripcion

			let aula1 = faker.random.arrayElement(aulas)
			let aula2 = faker.random.arrayElement(aulas)
			let aula3 = faker.random.arrayElement(aulas)

			let descripcion_aulas = `${aula1}-${aula2}-${aula3}`
			let cantidad_minutos = faker.random.number({
				min: 180,
				max: 360
			})
			let costo = faker.random.arrayElement(costos)
			let monto = faker.random.number({
				min: 40,
				max: 80
			})
			let descuento = faker.random.number({
				min: 0,
				max: 60
			})
			let total = monto - descuento
			let estado = 1

			temp.push({
				id: 1020 + id,
				numero_orden,
				fecha,
				hora_ingreso,
				hora_salida,
				marcacion_entrada,
				marcacion_salida,
				cantidad_minutos,
				costo,
				monto,
				descuento,
				total,
				tipo_asistencia,
				sede_id,
				sede_descripcion,
				aulas: descripcion_aulas,
				estado
			})

			id++
			numero_orden++
		})
		return temp
	}
	create({
		data: {
			detalleMontosDocentes: data(amount)
		},
		path: path
	})
	next(create)
}
module.exports = func