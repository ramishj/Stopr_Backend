import { Request, Response } from 'express';
export declare const getWatchlists: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addToWatchlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeFromWatchlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const module: {
    getWatchlists: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addToWatchlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    removeFromWatchlist: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=watchListController.d.ts.map