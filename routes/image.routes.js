const router = require("express").Router();
const { adminMiddleware } = require("../middlewares/admin.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/image.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", adminMiddleware, create);
router.put("/:id", adminMiddleware, updateById);
router.delete("/:id", adminMiddleware, deleteById);

module.exports = router;
