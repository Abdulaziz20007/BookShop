const router = require("express").Router();
const {
  adminMiddleware,
  adminSelfMiddleware,
} = require("../middlewares/admin.middleware");

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
} = require("../controllers/admin.controller");

const {
  getAll: getAllCustomers,
  getById: getCustomerById,
  updateById: updateCustomer,
  deleteById: deleteCustomer,
} = require("../controllers/customer.controller");

const {
  getSalesReport,
  getOverduePayments,
} = require("../controllers/helper.controller");

router.get("/", adminMiddleware, getAll);
router.get("/sales", adminMiddleware, getSalesReport);
router.get("/overdues", adminMiddleware, getOverduePayments);
router.get("/:id", getById);
router.post("/", create);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.put("/change", adminMiddleware, changePassword);
router.put("/:id", adminMiddleware, adminSelfMiddleware, updateById);
router.delete("/:id", adminMiddleware, adminSelfMiddleware, deleteById);

router.get("/customers", adminMiddleware, getAllCustomers);
router.get("/customers/:id", adminMiddleware, getCustomerById);
router.put("/customers/:id", adminMiddleware, updateCustomer);
router.delete("/customers/:id", adminMiddleware, deleteCustomer);

module.exports = router;
