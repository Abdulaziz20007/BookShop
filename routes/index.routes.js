const router = require("express").Router();

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
