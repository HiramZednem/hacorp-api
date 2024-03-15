import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MY_SECRET } from "../config";

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ message: "Access token missing" });
    }

    try {
        jwt.verify(accessToken, MY_SECRET as string) as any;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid access token" });
    }
};``
