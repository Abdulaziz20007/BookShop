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
  login,
  logout,
  refreshToken,
  changePassword,
  getMyCartItems,
  verify,
} = require("../controllers/customer.controller");

router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/", create);

router.get("/verify/:id", verify);

router.post("/logout", customerMiddleware, logout);
router.get("/cart", customerMiddleware, getMyCartItems);
router.put("/change", customerMiddleware, changePassword);

router.get("/", adminMiddleware, getAll);

router.get("/:id", customerMiddleware, customerSelfMiddleware, getById);
router.put("/:id", customerMiddleware, customerSelfMiddleware, updateById);
router.delete("/:id", customerMiddleware, customerSelfMiddleware, deleteById);

module.exports = router;
