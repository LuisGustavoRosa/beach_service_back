import { createServer } from "https";
import { Ignitor } from "@adonisjs/core/build/src/Ignitor";

new Ignitor(__dirname).httpServer().start((handle) => {
  return createServer(
    {
      key: "",
      cert: "",
    },
    handle
  );
});
