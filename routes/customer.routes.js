const router = require("express").Router();
const customerMiddleware = require("../middlewares/customer.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  login,
  logout,
  refreshToken,
  changePassword,
  getMyCartItems,
} = require("../controllers/customer.controller");

router.post("/login", login);
router.post("/", create);
router.post("/refresh", refreshToken);

router.use(customerMiddleware);

router.post("/logout", logout);
router.get("/cart/items", getMyCartItems);
router.put("/change-password", changePassword);

router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
