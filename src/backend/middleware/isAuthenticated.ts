/// <reference path="../types/custom-express-session/index.d.ts" />
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { db } from "../db/database";
import { Bruker, LoginToken } from "../types/database";

interface AuthQueryResult extends Pick<Bruker, 'UserID' | 'Navn'>, Pick<LoginToken, 'ExpirationDate'> {
    RolleNavn: string; // Dette kommer fra JOIN med Rolle-tabellen
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    console.log("[isAuthenticated] Session user:", req.session?.user);
    if (req.session?.user) {
        console.log("[isAuthenticated] User already in session, proceeding.");
        return next();
    }

    const rawToken = req.cookies?.["remember"];
    console.log("[isAuthenticated] Raw token from cookies:", rawToken);
    if (!rawToken) {
        console.log("[isAuthenticated] No remember token found, redirecting to /login");
        return res.redirect("/login");
    }

    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    console.log("[isAuthenticated] Token hash:", tokenHash);

    // Henter både brukerinfo og rollenavn i én operasjon
    const sql = `
        SELECT b.UserID, b.Navn, r.Navn as RolleNavn, lt.ExpirationDate
        FROM LoginToken lt
        JOIN Bruker b ON lt.UserID = b.UserID
        JOIN Rolle r ON b.RolleID = r.RolleID
        WHERE lt.Token = ?`;

    db.get(sql, [tokenHash], (err: Error | null, row: AuthQueryResult) => {
        if (err) {
            console.log("[isAuthenticated] DB error:", err);
        } else {
            console.log("[isAuthenticated] DB row:", row);
        }
        if (err || !row || row.ExpirationDate < Date.now()) {
            if (!row) console.log("[isAuthenticated] No row found for token.");
            if (row && row.ExpirationDate < Date.now()) console.log("[isAuthenticated] Token expired:", row.ExpirationDate, "Current:", Date.now());
            return res.redirect("/login");
        }

        // Fyller SessionUser-objektet
        req.session.user = {
            id: row.UserID,
            navn: row.Navn,
            rolle: row.RolleNavn
        };
        console.log("[isAuthenticated] Session user set:", req.session.user);
        return next();
    });
}
