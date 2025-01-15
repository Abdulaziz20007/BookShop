const router = require("express").Router();
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../controllers/admin.controller");

const {
  getAll: getAllCustomers,
  getById: getCustomerById,
  updateById: updateCustomer,
  deleteById: deleteCustomer,
} = require("../controllers/customer.controller");

// All admin routes should be protected
router.use(adminMiddleware);

// Admin management
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

// Customer management
router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomerById);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

module.exports = router;
