"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const cors = require('cors');
// Configure and start the HTTP server.
const port = parseInt(process.env.PORT || "8088", 10);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(cors({
    origin: 'https://adp-manga-library-demo.vercel.app'
}));
const staticImagePath = path_1.default.resolve(__dirname, '../manga_library/imgs');
const staticDescriptionPath = path_1.default.resolve(__dirname, '../manga_library');
app.use('/covers', express_1.default.static(staticImagePath));
app.use('/description', express_1.default.static(staticDescriptionPath));
app.get('/api/manga', routes_1.getManga);
app.listen(port, () => console.log(`Server listening on ${port}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUM7QUFDekMsOERBQXFDO0FBQ3JDLGdEQUF3QjtBQUN4QixxQ0FBb0M7QUFFcEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRTVCLHVDQUF1QztBQUN2QyxNQUFNLElBQUksR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sR0FBRyxHQUFZLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRTNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ1QsTUFBTSxFQUFFLDJDQUEyQztDQUN0RCxDQUFDLENBQUMsQ0FBQTtBQUVILE1BQU0sZUFBZSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFDekUsTUFBTSxxQkFBcUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBRzFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBRS9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGlCQUFRLENBQUMsQ0FBQTtBQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMifQ==