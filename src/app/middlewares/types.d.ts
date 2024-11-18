import { User } from "./path-to-your-user-type";

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
