const authenticationControllers = require("../controllers/authentication");

const express = require("express");
const router = express.Router();

router.post("/signin", authenticationControllers.signin);
router.get("/signup", authenticationControllers.signup);
router.post("/signout", authenticationControllers.signout);

module.exports = router;
