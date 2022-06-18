const User = require("../models/User.model");
const path = require("path");

module.exports.usersController = {
  getAllUser: async (req, res) => {
    const user = await User.find();
    return res.json(user);
  },

  registration: async (req, res) => {
    const { name, password } = req.body;
    const { avatar } = req.files;

    try {
      const fileName = avatar.name;
      const url = path.resolve(__dirname, `../public/images/${fileName}`);
      const urlForDB = `/${fileName}`;
      avatar.mv(url);

      if (!name) {
        return res.status(400).json({
          error: "Необходимо указать новое имя пользователя!",
        });
      }

      if (!password) {
        return res.status(400).json({
          error: "Необходимо указать новый пароль пользователя!",
        });
      }

      if (!avatar) {
        return res.status(400).json({
          error: "Необходимо выбрать аватар!",
        });
      }

      const user = await User.create({
        name,
        avatar: urlForDB,
        password,
      });

      return res.json(user);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },

  login: async (req, res) => {
    const { name, password } = req.body;

    const candidate = await User.findOne({ name });
    const valid = password === candidate.password;

    if (!candidate) {
      return res.status(401).json("Неверный логин или пароль!");
    }

    if (!valid) {
      return res.status(401).json("Неверный логин или пароль!");
    }

    const token = {
      name: candidate.name,
    };

    return res.json({ token });
  },
};
