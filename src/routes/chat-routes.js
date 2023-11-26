import { Router } from "express";
import generateChat from "../controllers/generateChat.js";
import getMessages from "../controllers/getMessages.js";
// import g from "../controllers/deleteAllChats.js";
import deleteAllChats from "../controllers/deleteAllChats.js";
// import deleteallChats from "../controllers/deleteAllChats.js";
const chatRoutes= Router();

chatRoutes.post("/new",generateChat)
chatRoutes.get("/messages",getMessages)
chatRoutes.get("/deleteallchats",deleteAllChats)

export default chatRoutes;