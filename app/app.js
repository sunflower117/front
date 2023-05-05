import express from "express";
import dotenv from "dotenv";
import { loginRouter } from "./routes/login.routes.js";
import passport from "passport";
import "./middlewares/google.js";
import ejs from "ejs";
import path from "path";
import * as url from 'url';
import routeHome from "./routes/backOffice.Routes.js"
import route from "./routes/home.routes.js";
import dash from "./routes/dashboard.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set("port", process.env.PORT || 9999)

app.set("views", path.join(__dirname,"views"));
//asignacion de plantilla EJS
app.set("view engine", "ejs");

//midlewares
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(__dirname + '/../public'))
app.use(cookieParser());

//Routes
app.use("/auth", passport.authenticate("auth-google",{
    scope: ["https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), loginRouter,);

app.use("/", routeHome);
app.use("/", route);
app.use("/v1", dash);

// app.get("/", (req, res) => {
//     res.send("HOlA BIENVENIDO");
// })

export default app;