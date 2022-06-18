const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");

const router = Router();

router.get("/user/users", usersController.getAllUser);
router.post("/user/registration", usersController.registration);
router.post("/user/login", usersController.login);

module.exports = router;
