/* In package.json, added build, start, dev to:
* S1: compile to JS
* S2: use nodeman to run TS and see changes and immediately reflect it*/
import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import env from "./config/env.config";
import database from "./database/models";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middleware/error-handler";

dotenv.config();

// create app out of Express and port the app
const app: Express = express();
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(router);
app.use(errorHandler);
const port = env.PORT;

// Sync the database
database.sequelize.sync();

// Test
// app.get('/', (req:Request, res:Response) => {
//     res.send('Server');
// });
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });

export default app;