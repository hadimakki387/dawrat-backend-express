import { UserInterface } from "./modules/user/user.interfaces";

declare module 'express-serve-static-core'{
    export interface Request {
        user:UserInterface
    }
}