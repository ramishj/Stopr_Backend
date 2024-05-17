"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const watchlistRoutes_1 = __importDefault(require("./routes/watchlistRoutes"));
// Import errorHandler with TypeScript type definitions
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(body_parser_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use('/watchlist', watchlistRoutes_1.default);
app.use(errorHandler_1.default); // Type assertion
mongoose_1.default.Promise = global.Promise;
const mongoURL = process.env.MONGO_DB || 'mongodb+srv://ramishjamal:ramish2002@cluster0.xl7rkhg.mongodb.net/';
mongoose_1.default.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    app.listen(config_1.default.port, () => {
        console.log(`Server is running on port ${config_1.default.port}`);
    });
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map