const router = require("express").Router();
const adminRoutes = require("./admin.routes");

const authorRoutes = require("./author.routes");
const banRoutes = require("./ban.routes");
const bookRoutes = require("./book.routes");
const cartItemRoutes = require("./cartItem.routes");
const categoryRoutes = require("./category.routes");
const contractRoutes = require("./contract.routes");
const couponRoutes = require("./coupon.routes");
const customerRoutes = require("./customer.routes");
const imageRoutes = require("./image.routes");
const orderItemRoutes = require("./orderItem.routes");
const orderRoutes = require("./order.routes");
const paymentRoutes = require("./payment.routes");
const planRoutes = require("./plan.routes");
const reviewRoutes = require("./review.routes");

router.use("/admin", adminRoutes);

router.use("/author", authorRoutes);
router.use("/ban", banRoutes);
router.use("/book", bookRoutes);
router.use("/cartitem", cartItemRoutes);
router.use("/category", categoryRoutes);
router.use("/contract", contractRoutes);
router.use("/coupon", couponRoutes);
router.use("/customer", customerRoutes);
router.use("/image", imageRoutes);
router.use("/orderitem", orderItemRoutes);
router.use("/order", orderRoutes);
router.use("/payment", paymentRoutes);
router.use("/plan", planRoutes);
router.use("/review", reviewRoutes);

module.exports = router;
