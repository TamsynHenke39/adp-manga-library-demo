"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
describe('routes', function () {
    it('getImagePath', function () {
        assert.strictEqual((0, routes_1.getImagePath)("hack//"), "/manga_library/hack.jpg");
        assert.strictEqual((0, routes_1.getImagePath)(".hack//Legend of The Twilight"), "/manga_library/.hackLegendofTheTwilight.jpg");
        assert.strictEqual((0, routes_1.getImagePath)("Bleach"), "/manga_library/Bleach.jpg");
        assert.strictEqual((0, routes_1.getImagePath)("Bad: ? '\\ < > ' \" "), "/manga_library/Bad.jpg");
    });
    it('getManga', function () {
        const req1 = httpMocks.createRequest({
            method: "GET", url: "/api/manga"
        });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getManga)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData().manga.length > 0, true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQStDO0FBRS9DLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFZixFQUFFLENBQUMsY0FBYyxFQUFFO1FBQ2YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLHFCQUFZLEVBQUMsUUFBUSxDQUFDLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQVksRUFBQywrQkFBK0IsQ0FBQyxFQUFFLDZDQUE2QyxDQUFDLENBQUE7UUFDaEgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLHFCQUFZLEVBQUMsUUFBUSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEscUJBQVksRUFBQyxzQkFBc0IsQ0FBQyxFQUFFLHdCQUF3QixDQUFDLENBQUE7SUFFdEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUUsVUFBVSxFQUFFO1FBR1osTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUNqQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxZQUFZO1NBQ25DLENBQUMsQ0FBQTtRQUVGLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFBLGlCQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ2xELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBRWxFLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLENBQUMifQ==