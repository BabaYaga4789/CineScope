import express, { Express } from "express";
import app from "./app";

const server: Express = express();

server.use(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
