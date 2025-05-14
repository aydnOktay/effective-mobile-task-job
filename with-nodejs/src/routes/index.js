const express = require("express");
const router = express.Router();

const applicationRoutes = require("./application.route");
const adminRoutes = require("./admin.route");
router.use("/applications", applicationRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
