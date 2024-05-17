"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// Middleware to verify token and return true or false
const verifyToken = (req, res) => {
    // If user is set in request (by authenticate middleware), the token is valid
    if (req.body.user) {
        return res.json({ valid: true });
    }
    // Otherwise, the token is invalid
    return res.json({ valid: false });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyLogin.js.map