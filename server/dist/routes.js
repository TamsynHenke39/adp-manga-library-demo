"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagePath = exports.getManga = void 0;
const Manga_1 = require("./Manga");
//tracks all of the checkedout books
//let checkedOut: Map<String, Array<Volume | Standalone>> = new Map();
/**returns the data stored in the manga library */
const getManga = (_req, res) => {
    let i = 0; //for volumes and standalone counts
    let j = 0; //for series counts
    const mangaArray = [];
    for (const manga of Manga_1.MANGA_LIBRARY) {
        const title = manga.title; //manga title
        const imageURL = (0, exports.getImagePath)(title); //manga URL
        if ((0, Manga_1.isSeries)(manga)) {
            let volumes = [];
            for (const vol of manga.volumes) {
                volumes.push({ vol: vol.vol, id: "Volume-0" + i, quant: vol.quant });
                i++;
            }
            mangaArray.push({ title: title, coverUrl: imageURL, id: "Series-0" + j, volumes: volumes });
            j++;
        }
        else {
            mangaArray.push({ title: title, coverUrl: imageURL, id: "Standalone-0" + i, quant: manga.quant });
            i++;
        }
    }
    res.json({ manga: mangaArray });
};
exports.getManga = getManga;
/**returns the image path corresponding to the manga type */
const getImagePath = (title) => {
    let titleFormatted = title.slice();
    if (title.startsWith(".")) {
        titleFormatted = titleFormatted.slice(1);
    }
    //replaces the title
    for (const character of FORBIDDEN_FILE_NAME_CHARACTERS) {
        if (titleFormatted.includes(character)) {
            titleFormatted = titleFormatted.replaceAll(character, "");
        }
    }
    return titleFormatted + ".jpg";
};
exports.getImagePath = getImagePath;
/**A list of characters that can be in titles, not file paths */
const FORBIDDEN_FILE_NAME_CHARACTERS = [
    "/", "?", ":", "<", ">", "|", "\\", "\"", "'", " "
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBaUQ7QUFNakQsb0NBQW9DO0FBQ3BDLHNFQUFzRTtBQUV0RSxrREFBa0Q7QUFDM0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFpQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUVuRSxJQUFJLENBQUMsR0FBVyxDQUFDLENBQUMsQ0FBSyxtQ0FBbUM7SUFDMUQsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDLENBQUssbUJBQW1CO0lBQzFDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUV0QixLQUFLLE1BQU0sS0FBSyxJQUFJLHFCQUFhLEVBQUU7UUFDL0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWE7UUFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBQSxvQkFBWSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVztRQUVqRCxJQUFJLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFFakIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFVBQVUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO2dCQUNsRSxDQUFDLEVBQUUsQ0FBQzthQUNQO1lBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQTtZQUN6RixDQUFDLEVBQUUsQ0FBQztTQUVQO2FBQU07WUFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRyxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxjQUFjLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTtZQUNoRyxDQUFDLEVBQUUsQ0FBQztTQUNQO0tBQ0o7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUFBO0FBM0JZLFFBQUEsUUFBUSxZQTJCcEI7QUFFRCw0REFBNEQ7QUFDckQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFhLEVBQVUsRUFBRTtJQUVsRCxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFbkMsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzNDO0lBRUQsb0JBQW9CO0lBQ3BCLEtBQUssTUFBTSxTQUFTLElBQUksOEJBQThCLEVBQUU7UUFDcEQsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BDLGNBQWMsR0FBRyxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3RDtLQUNKO0lBQ0QsT0FBTyxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQ25DLENBQUMsQ0FBQTtBQWZZLFFBQUEsWUFBWSxnQkFleEI7QUFFRCxnRUFBZ0U7QUFDaEUsTUFBTSw4QkFBOEIsR0FBYTtJQUM3QyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHO0NBQ3JELENBQUMifQ==