"use strict";
exports.__esModule = true;
var express_1 = require("express");
var setAdmin_1 = require("../controllers/admin/setAdmin");
var adminRouter = express_1["default"].Router();
adminRouter.post("/add-admin", setAdmin_1.addAdmin);
adminRouter.post("/login-admin", setAdmin_1.loginAdmin);
exports["default"] = adminRouter;
