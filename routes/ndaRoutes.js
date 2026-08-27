const router = require("express").Router();
const { unlock } = require("../controllers/ndaController");

router.post("/unlock", unlock);

module.exports = router;