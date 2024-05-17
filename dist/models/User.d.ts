import { Document, Model } from 'mongoose';
interface WatchlistItem {
    name: string;
    symbols: string[];
}
interface UserDocument extends Document {
    firstName: string;
    username: string;
    email: string;
    password: string;
    mobileNumber: string;
    country: string;
    watchlist: WatchlistItem[];
}
declare const User: Model<UserDocument, {}, {}>;
export default User;
//# sourceMappingURL=User.d.ts.map