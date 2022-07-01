const { createServer } =  require ("https");
const { Ignitor } = require ("@adonisjs/core/build/src/Ignitor");

new Ignitor(__dirname).httpServer().start((handle) => {
  return createServer(
    {
      key: "",
      cert: "",
    },
    handle
  );
});
