import { Router } from "express";
export const pageRouter = Router();
import { Request, Response } from "express";
import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import path from "path";

pageRouter.use("/private-script", isAuthenticated, express.static(path.join(process.cwd(), "pages/private/script")));

pageRouter.get("/admin", isAuthenticated, (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "pages/private/admin.html"));
});

pageRouter.get("/om-oss", (_req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "pages/public/om-oss.html"));
});