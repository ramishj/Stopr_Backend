"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtAuth_1 = require("./jwtAuth");
const authenticate = (req, res, next) => {
    try {
        console.log('Authenticating user...');
        // Extract token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // If token is not provided, send 401 Unauthorized response
        if (!token) {
            return res.sendStatus(401);
        }
        // Verify the token
        jsonwebtoken_1.default.verify(token, jwtAuth_1.JWT_SECRET, (err, decoded) => {
            if (err) {
                // If token is invalid, send 403 Forbidden response
                return res.sendStatus(403);
            }
            // If token is valid, attach decoded data to request object and call next middleware
            req.body.user = decoded;
            next();
        });
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authMiddleware.js.map