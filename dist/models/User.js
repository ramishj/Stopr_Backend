"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    // Define the fields of your User schema
    firstName: String,
    username: String,
    email: String,
    password: String,
    mobileNumber: String,
    country: String,
    watchlist: { type: [{ name: String, symbols: [String] }], default: [{ name: null, symbols: [] }] }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map