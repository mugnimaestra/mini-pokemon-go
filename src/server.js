const express = require("express");
const next = require("next");
const dotenv = require("dotenv");
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    express()
      .disable("x-powered-by")
      .use(handler)
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
  })
  .catch((err) => console.log("something happened", err));
