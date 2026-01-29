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
    res.sendFile(path.join(process.cwd(), "pages/public/login.html"));
});

// --- Login POST ---
loginRouter.post("/login", (req: Request, res: Response) => {
    const { navn, passord } = req.body;

    const sql = `SELECT * FROM Bruker WHERE Brukernavn = ?`;

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

loginRouter.post("/ny-bruker", isAuthenticated, async (req: Request, res: Response) => {

    const { navn, passord } = req.body;

    if (!navn || !passord) {
        return res.redirect("/login?q=Mangler+felt");
    }

    db.get("SELECT * FROM Bruker WHERE Brukernavn = ?", [navn], async (_err, row) => {
        if (row) return res.redirect("/login?q=Eksisterer+allerede");

        const hash = await bcrypt.hash(passord, 10);
        db.run(
            "INSERT INTO Bruker (Brukernavn, Passord) VALUES (?, ?)",
            [navn, hash],
            (err) => {
                if (err) {
                    console.log(err)
                    return res.redirect("/login?q=Feil+ved+opprettelse")
                };
                res.redirect("/login?q=Bruker+opprettet");
            }
        );
    });
});

