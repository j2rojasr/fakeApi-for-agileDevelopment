const faker = require(`faker/locale/de`);
const helper = require(`../src/helper/helper`);

const amount = 200;

const func = next => create => {
  const path = `articulosDatatable/articulosDatatable.json`;
  const data = (amount) => {    
    let razonSocialArray = [
      `Saco Oliveros`,
      `Sistema Helicoidal`,
      `Apeiron`
    ];

    let temp = [];
    for (let i = 0; i < amount; i++) {
      temp.push(
        {
          id: `${i}`,
          nombre: faker.commerce.productName(),
          precio: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          departamento: faker.commerce.department(),
          color: faker.commerce.color(),
          fecha_vencimiento: faker.date.future(),
          imagen_producto: faker.image.imageUrl(),
          descripcion: faker.lorem.text(),
          razon_social: `${razonSocialArray[helper.randomIntFromInterval(0, 2)]}`
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

  create({ data: { articulosDatatable: data(amount) }, path: path })
  next(create);
}

module.exports = func;
