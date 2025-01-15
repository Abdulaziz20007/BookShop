const router = require("express").Router();
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/ban.controller");

router.use(adminMiddleware);

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
