const faker = require(`faker/locale/es_MX`)
const periodoCierreAsistencia = require(`../static/periodoCierreAsistencia/periodoCierreAsistencia.json`)
const sedes = require(`../static/sedes/sedes.json`)
const amount = periodoCierreAsistencia.periodoCierreAsistencia.length
const func = next => create => {
    const path = `periodoSedes/periodoSedes.json`
    const data = (amount) => {
        let rndm
        let temp = []
        let i = 1
        periodoCierreAsistencia.periodoCierreAsistencia.forEach((periodocierre) => {
            sedes.sedes.forEach(sede => {
                temp.push({
                    id: i++,
                    sede_id: sede.codigo,
                    sede_descripcion: sede.descripcion,
                    periodocierreasistencia_id: periodocierre.id,
                    tipopersonal_id: periodocierre.tipopersonal_id,
                    tipopersonal_descripcion: periodocierre.tipopersonal_descripcion,
                    mescierre_id: periodocierre.mescierre_id,
                    mescierre_descripcion: periodocierre.mescierre_descripcion,
                    fecha_inicio: periodocierre.fecha_inicio,
                    fecha_fin: periodocierre.fecha_fin,
                    estado: 1
                })
            })
        })
        return temp
    }
    create({
        data: {
            periodoSedes: data(amount)
        },
        path: path
    })
    next(create)
}
module.exports = func