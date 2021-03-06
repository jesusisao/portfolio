import express from "express";
import bodyParser from "body-parser";
import consola from "consola";
import firebaseAuthMiddleware from "./middleware/firebaseAuth";
import api from "./api";
const { Nuxt, Builder } = require("nuxt");

const app = express();

// Import and Set Nuxt.js options
import config from "../nuxt.config";
config.dev = !(process.env.NODE_ENV === "production");

const start = async () => {
  const nuxt = new Nuxt(config);
  const { host, port } = nuxt.options.server;

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", firebaseAuthMiddleware);
  app.use("/api", api);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  const herokuPort = process.env.PORT || port
  app.listen(herokuPort, host);
  consola.ready({
    message: `Server listening on http://${host}:${herokuPort}`,
    badge: true
  });
};
start();
