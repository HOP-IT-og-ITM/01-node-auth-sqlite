import sqlite3 from "sqlite3";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";

sqlite3.verbose();

const dbDir = path.join(process.cwd(), "database");
const dbPath = path.join(dbDir, "database.db");

// Opprett mappe hvis den ikke finnes
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("DB error:", err);
        return;
    }
    console.log("DB connected");

    // Aktiver støtte for Foreign Keys
    db.run("PRAGMA foreign_keys = ON;");

    db.exec(`
        CREATE TABLE IF NOT EXISTS "Bruker" (
            "UserID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "Brukernavn" TEXT NOT NULL UNIQUE,
            "Passord" TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS "LoginToken" (
            "Token" TEXT PRIMARY KEY,
            "UserID" INTEGER NOT NULL,
            "ExpirationDate" INTEGER NOT NULL,
            FOREIGN KEY ("UserID") REFERENCES "Bruker"("UserID") ON DELETE CASCADE
        );
    `, (err: Error | null) => {
        if (err) {
            console.error("Schema error:", err);
        } else {
            initializeDefaultData();
        }
    });
});

async function initializeDefaultData() {
    const defaultAdmin = "Elev";
    const defaultPassword = "hop";

    db.get('SELECT * FROM Bruker WHERE Brukernavn = ?', [defaultAdmin], async (_err, row) => {
        if (!row) {
            try {
                const hash = await bcrypt.hash(defaultPassword, 10);
                db.run(
                    'INSERT INTO Bruker (Brukernavn, Passord) VALUES (?, ?)',
                    [defaultAdmin, hash],
                    (insertErr) => {
                        if (insertErr) console.error("Admin creation error:", insertErr);
                        else console.log("Default Admin created.");
                    }
                );
            } catch (hashErr) {
                console.error("Hashing error:", hashErr);
            }
        }
    });
}