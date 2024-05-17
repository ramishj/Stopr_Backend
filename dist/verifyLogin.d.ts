import { Request, Response } from 'express';
interface CustomRequest extends Request {
    user?: any;
}
export declare const verifyToken: (req: CustomRequest, res: Response) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=verifyLogin.d.ts.map