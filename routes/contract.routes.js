const router = require("express").Router();
const { adminMiddleware } = require("../middlewares/admin.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/contract.controller");

router.get("/", adminMiddleware, getAll);
router.get("/:id", adminMiddleware, getById);
router.post("/", adminMiddleware, create);
router.put("/:id", adminMiddleware, updateById);
router.delete("/:id", adminMiddleware, deleteById);

module.exports = router;
