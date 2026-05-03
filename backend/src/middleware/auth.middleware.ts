import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface AdminTokenPayload {
  admin_id: number;
  email: string;
  kullanici_adi: string;
}

export interface AuthRequest extends Request {
  admin?: AdminTokenPayload;
}

/*
  Admin token kontrol middleware'i

  Beklenen header:
  Authorization: Bearer TOKEN
*/
export function adminAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Yetkisiz işlem. Token bulunamadı.",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Geçersiz token formatı.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token boş olamaz.",
      });
    }

    const jwtSecret = process.env.JWT_SECRET as Secret;

    if (!jwtSecret) {
      return res.status(500).json({
        message: "JWT_SECRET .env dosyasında tanımlı değil.",
      });
    }

    const decoded = jwt.verify(token, jwtSecret) as AdminTokenPayload;

    req.admin = decoded;

    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "Token geçersiz veya süresi dolmuş.",
      hata: error.message,
    });
  }
}