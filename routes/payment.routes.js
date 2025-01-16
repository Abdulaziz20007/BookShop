const router = require("express").Router();
const { adminMiddleware } = require("../middlewares/admin.middleware");
const { customerMiddleware } = require("../middlewares/customer.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/payment.controller");

router.get("/", adminMiddleware, getAll);
router.get("/:id", customerMiddleware, getById);
router.post("/", customerMiddleware, create);
router.put("/:id", adminMiddleware, updateById);
router.delete("/:id", adminMiddleware, deleteById);

module.exports = router;
