import initialize from "./initialize.js";
import {
  addUser,
  getAllUsers,
  getUser,
  updateUserStatus
} from './controller.js'

const app = initialize();

app.put("/:id", updateUserStatus);
app.get("/:id", getUser);
app.post("/", addUser);
app.get("/", getAllUsers);
