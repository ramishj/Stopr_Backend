interface IntradayData {
    [key: string]: {
        '1. open': string;
        '2. high': string;
        '3. low': string;
        '4. close': string;
        '5. volume': string;
    };
}
export declare const getIntradayData: (symbol: string, interval: string) => Promise<IntradayData>;
export declare const searchSymbols: (keywords: string) => Promise<any>;
export {};
//# sourceMappingURL=alphaVantageService.d.ts.map