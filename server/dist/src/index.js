"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* In package.json, added build, start, dev to:
* S1: compile to JS
* S2: use nodeman to run TS and see changes and immediately reflect it*/
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_config_1 = __importDefault(require("./config/env.config"));
const models_1 = __importDefault(require("./database/models"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
dotenv_1.default.config();
// create app out of Express and port the app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use(routes_1.default);
app.use(error_handler_1.default);
const port = env_config_1.default.PORT;
// Sync the database
models_1.default.sequelize.sync();
// Test
// app.get('/', (req:Request, res:Response) => {
//     res.send('Server');
// });
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
// });
exports.default = app;
