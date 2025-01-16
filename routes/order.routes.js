const router = require("express").Router();
const {
  customerMiddleware,
  customerSelfMiddleware,
} = require("../middlewares/customer.middleware");
const { adminMiddleware } = require("../middlewares/admin.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/order.controller");

router.get("/", adminMiddleware, getAll);
router.get("/:id", customerMiddleware, getById);
router.post("/", customerMiddleware, create);
router.put("/:id", customerMiddleware, updateById);
router.delete("/:id", customerMiddleware, deleteById);

module.exports = router;
