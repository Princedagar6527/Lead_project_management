import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
  
    const token = authHeader.split(' ')[1] as string;
    
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        res.status(403).json({ success: false, message: 'Forbidden: Invalid Token' });
        return;
      }
      req.user = user as { id: string; role: string };
      next();
    });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }
};


export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
  }
};