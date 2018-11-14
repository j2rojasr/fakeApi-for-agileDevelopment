'use strict';
const jsonServer = require(`json-server`);
const _jsonExtender = require(`json-server-extension`);
const internalIp = require(`internal-ip`);
const terminalLink = require(`terminal-link`);

//options:
//fullPath:fullpath for the combined object
//generatedPath:the path where the generated files will be found
//staticPath:the path where the static files will be found
const jsonExtender = new _jsonExtender({
  filePath: `./db_extends.json`,
  generatedPath: `./generated`,
  staticPath: `./static`
});

//register accept array of generators or path to the generator scripts
//const funcs =  Object.keys(generators).map(key => generators[key])
jsonExtender.register(`../../../generators`);

jsonExtender.generate()
  .then((data) => {
    let server = jsonServer.create();
    let router = jsonServer.router(`./db_extends.json`);
    let middlewares = jsonServer.defaults();

    let getall = require(`./custom/getall`);

    let port = 3000;
    let localhost = `localhost`;
    let localhostIp = internalIp.v4.sync();

    let linkLocalhost = terminalLink(`localhost`, `http://${localhost}:${port}`);
    let linkLocalhostIp = terminalLink(`localhost`, `http://${localhostIp}:${port}`);

    server.use(middlewares);
    server.use(router);

    server.use(getall);

    server.listen(port, function () {
      console.log(`JSON Server is running in:

      ${linkLocalhost}
      ${linkLocalhostIp}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });