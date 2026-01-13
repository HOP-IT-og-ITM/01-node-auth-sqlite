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
        CREATE TABLE IF NOT EXISTS "Rolle" (
            "RolleID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "Navn" TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS "Bruker" (
            "UserID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "Navn" TEXT NOT NULL UNIQUE,
            "Passord" TEXT NOT NULL,
            "RolleID" INTEGER,
            FOREIGN KEY ("RolleID") REFERENCES "Rolle"("RolleID")
        );

        CREATE TABLE IF NOT EXISTS "Bibliotek" (
            "BibliotekID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "Navn" TEXT NOT NULL,
            "OpprettetDato" TEXT DEFAULT CURRENT_TIMESTAMP,
            "ThumbnailPATH" TEXT,
            "Beskrivelse" TEXT
        );

        CREATE TABLE IF NOT EXISTS "Bilde" (
            "BildeID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "PathName" TEXT NOT NULL,
            "Tittel" TEXT,
            "Dato" TEXT,
            "Sted" TEXT,
            "Beskrivelse" TEXT,
            "MimeType" TEXT,
            "BibliotekID" INTEGER ,
            FOREIGN KEY ("BibliotekID") REFERENCES "Bibliotek"("BibliotekID")  ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS "BrukerHarTilgangTilBibliotek" (
            "BibliotekID" INTEGER,
            "UserID" INTEGER,
            PRIMARY KEY ("BibliotekID", "UserID"),
            FOREIGN KEY ("BibliotekID") REFERENCES "Bibliotek"("BibliotekID") ON DELETE CASCADE,
            FOREIGN KEY ("UserID") REFERENCES "Bruker"("UserID") ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS "LoginToken" (
            "Token" TEXT PRIMARY KEY,
            "UserID" INTEGER NOT NULL,
            "ExpirationDate" INTEGER NOT NULL,
            FOREIGN KEY ("UserID") REFERENCES "Bruker"("UserID") ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS "LoginTid" (
            "TidID" INTEGER PRIMARY KEY AUTOINCREMENT,
            "UserID" INTEGER,
            "TIDSPUNKT" TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY ("UserID") REFERENCES "Bruker"("UserID") ON DELETE SET NULL
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
    const roller = ["SuperAdmin", "Admin", "Bruker"];
    roller.forEach(rolle => {
        db.run('INSERT OR IGNORE INTO Rolle (Navn) VALUES (?)', [rolle]);
    });

    const defaultAdmin = "Elev";
    const defaultPassword = "hop";

    db.get('SELECT * FROM Bruker WHERE Navn = ?', [defaultAdmin], async (_err, row) => {
        if (!row) {
            try {
                const hash = await bcrypt.hash(defaultPassword, 10);
                db.get('SELECT RolleID FROM Rolle WHERE Navn = "SuperAdmin"', (_err, rolleRow: any) => {
                    if (rolleRow) {
                        db.run(
                            'INSERT INTO Bruker (Navn, Passord, RolleID) VALUES (?, ?, ?)',
                            [defaultAdmin, hash, rolleRow.RolleID],
                            (insertErr) => {
                                if (insertErr) console.error("Admin creation error:", insertErr);
                                else console.log("Default Admin created.");
                            }
                        );
                    }
                });
            } catch (hashErr) {
                console.error("Hashing error:", hashErr);
            }
        }
    });
}