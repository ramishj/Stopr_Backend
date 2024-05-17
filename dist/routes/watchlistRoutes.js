"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const watchListController_1 = require("../watchListController");
const authMiddleware_1 = require("../authMiddleware"); // Import your authentication middleware
const alphaVantageService_1 = require("../services/alphaVantageService");
const router = (0, express_1.Router)();
// Apply authentication middleware to routes where user authentication is required
router.get('/', authMiddleware_1.authenticate, watchListController_1.getWatchlists);
router.post('/add', authMiddleware_1.authenticate, watchListController_1.addToWatchlist);
router.delete('/remove', authMiddleware_1.authenticate, watchListController_1.removeFromWatchlist);
router.get('/searchSymbol', async (req, res) => {
    const { symbol } = req.query; // Access the query parameter
    try {
        const data = await (0, alphaVantageService_1.searchSymbols)(symbol);
        // Extract and return the symbols and names
        const results = data.bestMatches.map((match) => ({
            symbol: match["1. symbol"],
            name: match["2. name"]
        }));
        res.json({ results });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=watchlistRoutes.js.map