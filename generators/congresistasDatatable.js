const faker = require(`faker/locale/de`);
const helper = require(`../src/helper/helper`);

const amount = 500;

const func = next => create => {
  const path = `congresistasDatatable/congresistasDatatable.json`;
  const data = (amount) => {
    let partidoPoliticoArray = [
      `Fuerza Popular`,
      `Partido Popular Cristiano`,
      `APRA`,
      `Alianza por el Progreso`
    ];

    let temp = [];
    for (let i = 0; i < amount; i++) {
      temp.push(
        {
          person_id: `${i}`,
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          partido_politico: `${partidoPoliticoArray[helper.randomIntFromInterval(0, 3)]}`
        }
      )
    }
    
    return {
      draw: 1,
      recordsTotal: amount,
      recordsFiltered: amount,
      data: temp
    };
  }

  create({ data: { congresistasDatatable: data(amount) }, path: path })
  next(create);
}

module.exports = func;
