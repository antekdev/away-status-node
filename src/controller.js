import Business from "./business.js";

export const updateUserStatus = async (req, res, next) => {
  const id = req.params.id;
  const new_status = req.body.status;
  const status_object = await Business.updateUserStatus(id, new_status)

  res.json(status_object);
}

export const getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await Business.getUser(id);

  res.json(user);
}

export const addUser = async (req, res, next) => {
  const new_user_id = await Business.addNewUser(req.body);

  res.json({ id: new_user_id });
}

export const getAllUsers = async (req, res, next) => {
  const users = await Business.getAllUsers();

  res.json(users);
}