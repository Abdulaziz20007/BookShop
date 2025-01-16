const router = require("express").Router();
const {customerMiddleware} = require("../middlewares/customer.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/cart-item.controller");

router.use(customerMiddleware);

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
