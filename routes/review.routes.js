const router = require("express").Router();
const { customerMiddleware } = require("../middlewares/customer.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/review.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", customerMiddleware, create);
router.put("/:id", customerMiddleware, updateById);
router.delete("/:id", customerMiddleware, deleteById);

module.exports = router;
