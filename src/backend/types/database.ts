// --- Tabell-definisjoner ---

export interface Rolle {
    RolleID: number;
    Navn: string;
}

export interface Bruker {
    UserID: number;
    Navn: string;
    Passord: string;
    RolleID: number;
}

export interface Bibliotek {
    BibliotekID: number;
    Navn: string;
    OpprettetDato: string;
    ThumbnailURL: string;
    Beskrivelse: string;
}

export interface Bilde {
    BildeID: number;
    PathName: string;   // Filstien til bildet
    Tittel: string | null;
    Dato: string | null;
    Sted: string | null;
    Beskrivelse: string | null;
    MimeType: string;   // F.eks. 'image/jpeg'
}

// --- Koblingstabeller ---

export interface BrukerHarTilgangTilBibliotek {
    BibliotekID: number;
    UserID: number;
}

export interface BildeTilhørerBibliotek {
    BibliotekID: number;
    BildeID: number;
}

// --- Sesjon og Sikkerhet ---

export interface LoginToken {
    Token: string;
    UserID: number;
    ExpirationDate: number; // Lagres som Unix timestamp (millisekunder)
}

/**
 * Denne brukes for å utvide Express sin Session-type
 * slik at du får autocomplete på req.session.user
 */
export interface SessionUser {
    id: number;
    navn: string;
    rolle: string; // Her lagrer vi navnet på rollen (f.eks. 'Admin') for enkel sjekk
}