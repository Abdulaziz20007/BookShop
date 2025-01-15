const router = require("express").Router();

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
} = require("../controllers/customer.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.put("/change-password/:id", changePassword);

module.exports = router;
