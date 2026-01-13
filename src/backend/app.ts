import express, { Request, Response, NextFunction } from "express";
import path from "path";
import http from "http";
import { loginRouter } from "./routes/login";
import { pageRouter } from "./routes/pageRoutes";

export const app = express();
const port = 3000;
const server = http.createServer(app);

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
