const router = require("express").Router();
const ndaAccess = require("../middleware/ndaAccess");
const projectController = require("../controllers/projectController");

router.get("/", ndaAccess, projectController.getAll);
router.post("/", projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.remove);

module.exports = router;