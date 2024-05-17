import { Request, Response, NextFunction } from 'express';
declare const JWT_SECRET: string;
interface CustomRequest extends Request {
    user?: any;
}
export { JWT_SECRET };
export declare const authenticateToken: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=jwtAuth.d.ts.map