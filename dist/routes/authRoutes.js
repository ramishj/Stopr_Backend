"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../authController");
const verifyLogin_1 = require("../verifyLogin");
const authMiddleware_1 = require("../authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticate, verifyLogin_1.verifyToken);
router.post('/login', authController_1.login);
router.post('/register', authController_1.register);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map