const faker = require(`faker/locale/de`)

const amount = 300

const func = next => create => {
  const path = `employeesDatatable/employeesDatatable.json`
  const data = (amount) => {
    let temp = []
    for (let i = 0; i < amount; i++) {
      temp.push(
        {
          //id: `${i}`,
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          position: faker.name.jobTitle(),
          office: faker.name.jobArea(),
          start_date: faker.date.past(),
          salary: faker.finance.amount()
        }
      )
    }

    return {
      draw: 1,
      recordsTotal: amount,
      recordsFiltered: amount,
      data: temp
    }
  }

  create({ data: { employeesDatatable: data(amount) }, path: path })
  next(create)
}

module.exports = func
