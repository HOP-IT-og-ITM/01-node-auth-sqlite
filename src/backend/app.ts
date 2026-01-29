import express, { Request, Response, NextFunction } from "express";
import path from "path";
import http from "http";

import { loginRouter } from "./routes/login";
import { pageRouter } from "./routes/pageRoutes";
import { isAuthenticated } from "./middleware/isAuthenticated";
import cookieParser from "cookie-parser";
import session from "express-session";
import { SESSION_SECRET } from "./SECRET_KEYS.local";


export const app = express();
const port = 3000;
const server = http.createServer(app);

// Må ha dette her for å kunne bruke rekkefølgen under
app.use(cookieParser());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));


// Admin før vanlig statisk
app.use("/admin", isAuthenticated, express.static(path.join(process.cwd(), "pages/public/admin")));
app.use(express.static(path.join(process.cwd(), "pages/public")));
app.use("/style", express.static(path.join(process.cwd(), "pages/style")));
app.use(express.urlencoded({ extended: true }));

app.use(loginRouter);
app.use(pageRouter);

// GLOBAL ERROR-HANDLER
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send("Internal server error");
});

server.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`);
});
