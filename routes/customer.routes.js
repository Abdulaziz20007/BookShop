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

// Public routes (no auth required)
router.post("/login", login);
router.post("/", create); // signup
router.post("/refresh", refreshToken);

// Protected routes (require authentication)
router.use(customerMiddleware); // Apply middleware to all routes below

router.post("/logout", logout);
router.get("/cart/items", getMyCartItems); // Fixed path for cart items
router.put("/change-password", changePassword); // Removed :id as it comes from token

// Admin only routes - should be moved to admin routes
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
