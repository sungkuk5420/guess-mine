import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT =  80;
const app = express();
app.set("views", join(__dirname, "../views"));
app.set('view engine', 'ejs');
app.use(logger("dev"));
app.use(express.static(__dirname));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);
app.get("/test", (req, res) =>
  res.render("test", { events: JSON.stringify(events) })
);

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on("connection", socket => socketController(socket, io));