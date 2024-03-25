import express from "express";
import cors from "cors";
import { route } from "./routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(PORT, () =>
  console.log(`server is running in http://localhost:${PORT}`)
);
