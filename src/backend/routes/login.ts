/// <reference path="../types/custom-express-session/index.d.ts" />
import { Router, Request, Response } from "express";
import { SESSION_SECRET } from "../SECRET_KEYS.local";
import session from "express-session";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import crypto from "crypto";
import path from "path";
import { db } from "../db/database"; // Pass på at denne peker til din nye db-fil
import { isAuthenticated } from "../middleware/isAuthenticated.js";

export const loginRouter = Router();

// --- Konfigurasjon ---
loginRouter.use(cookieParser());
loginRouter.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Sett til true hvis du bruker HTTPS
    })
);

// --- Login-side ---
loginRouter.get("/login", (_, res: Response) => {
    res.sendFile(path.join(process.cwd(), "pages/private/login.html"));
});

// --- Login POST ---
loginRouter.post("/login", (req: Request, res: Response) => {
    const { navn, passord } = req.body;

    // Henter bruker og rollenavn via en JOIN
    const sql = `
        SELECT b.*, r.Navn as RolleNavn 
        FROM Bruker b 
        LEFT JOIN Rolle r ON b.RolleID = r.RolleID 
        WHERE b.Navn = ?`;

    db.get(sql, [navn], (err: Error | null, row: any) => {
        if (err) {
            res.status(500).send("Databasefeil")
            return;
        }
        if (!row) return res.status(401).send("Ugyldig brukernavn eller passord");

        bcrypt.compare(passord, row.Passord, (error, same) => {
            if (error) {
                res.status(500).send("Feil ved hashing");
                return;
            }
            if (!same) {
                res.status(401).send("Feil passord");
                return;
            }

            req.session.user = {
                id: row.UserID,
                navn: row.Navn,
                rolle: row.RolleNavn
            };

            const rawToken = crypto.randomBytes(32).toString("hex");
            const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

            res.cookie("remember", rawToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 14
            });

            const expires = Date.now() + 1000 * 60 * 60 * 24 * 14;
            db.run(
                "INSERT INTO LoginToken (Token, UserID, ExpirationDate) VALUES (?, ?, ?)",
                [tokenHash, row.UserID, expires]
            );

            res.redirect("/admin");
        });
        return;
    });
});

// --- Opprett Ny Bruker (Kun for Admin) ---
loginRouter.post("/ny-bruker", isAuthenticated, async (req: Request, res: Response) => {
    // Sjekk om innlogget bruker faktisk er Admin
    if (req.session.user?.rolle == "Bruker") {
        return res.status(403).send("Bare administratorer kan opprette brukere.");
    }

    const { navn, passord, rolleId } = req.body; // rolleId: 1 for Admin, 2 for Bruker

    if (!navn || !passord) {
        return res.redirect("/ny-bruker?q=Mangler+felt");
    }

    db.get("SELECT * FROM Bruker WHERE Navn = ?", [navn], async (_err, row) => {
        if (row) return res.redirect("/ny-bruker?q=Eksisterer+allerede");

        const hash = await bcrypt.hash(passord, 10);
        const targetRolle = rolleId || 2; // Standard til vanlig 'Bruker'

        db.run(
            "INSERT INTO Bruker (Navn, Passord, RolleID) VALUES (?, ?, ?)",
            [navn, hash, targetRolle],
            (err) => {
                if (err) return res.redirect("/ny-bruker?q=Feil+ved+opprettelse");
                res.redirect("/admin?q=Bruker+opprettet");
            }
        );
    });
});

// --- Logout ---
loginRouter.get("/logout", (req: Request, res: Response) => {
    const token = req.cookies?.["remember"];
    if (token) {
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        db.run("DELETE FROM LoginToken WHERE Token = ?", [tokenHash]);
    }
    res.clearCookie("remember");
    req.session.destroy(() => {
        res.redirect("/login");
    });
});