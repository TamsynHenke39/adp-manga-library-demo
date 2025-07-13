import express, {Express} from "express";
import bodyParser from 'body-parser';
import path from 'path';
import { getManga } from "./routes";


// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(bodyParser.json());

const staticImagePath = path.resolve(__dirname, '../manga_library/imgs');
const staticDescriptionPath = path.resolve(__dirname, '../manga_library');


app.use('/covers', express.static(staticImagePath));
app.use('/description', express.static(staticDescriptionPath));

app.get('/api/manga', getManga)
app.listen(port, () => console.log(`Server listening on ${port}`));
