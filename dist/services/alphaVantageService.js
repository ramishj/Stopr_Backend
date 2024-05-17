"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSymbols = exports.getIntradayData = void 0;
const axios_1 = __importDefault(require("axios"));
const ALPHA_VANTAGE_API_KEY = 'YQKC5RLIBF1VXMGH';
const getIntradayData = async (symbol, interval) => {
    try {
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios_1.default.get(apiUrl);
        const data = response.data[`Time Series ${interval}`]; // Adjust this key based on your interval
        return data;
    }
    catch (error) {
        throw new Error('Error fetching intraday data');
    }
};
exports.getIntradayData = getIntradayData;
const searchSymbols = async (keywords) => {
    try {
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${ALPHA_VANTAGE_API_KEY}`;
        const response = await axios_1.default.get(url);
        return response.data;
    }
    catch (error) {
        throw new Error('Error searching symbols');
    }
};
exports.searchSymbols = searchSymbols;
//# sourceMappingURL=alphaVantageService.js.map