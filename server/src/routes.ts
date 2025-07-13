import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { MANGA_LIBRARY, isSeries } from './Manga'

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

//tracks all of the checkedout books
//let checkedOut: Map<String, Array<Volume | Standalone>> = new Map();

/**returns the data stored in the manga library */
export const getManga = (_req: SafeRequest, res: SafeResponse): void => {

    let i: number = 0;     //for volumes and standalone counts
    let j: number = 0;     //for series counts
    const mangaArray = [];

    for (const manga of MANGA_LIBRARY) {
        const title = manga.title; //manga title
        const imageURL = getImagePath(title); //manga URL

        if (isSeries(manga)) {
            let volumes = [];

            for (const vol of manga.volumes) {
                volumes.push({vol: vol.vol, id: "Volume-0" + i, quant: vol.quant})
                i++;
            }

            mangaArray.push({title: title, coverUrl: imageURL, id: "Series-0" + j, volumes: volumes})
            j++;

        } else {
            mangaArray.push({title: title,  coverUrl: imageURL, id: "Standalone-0" + i, quant: manga.quant})
            i++;
        }
    }
    res.json({manga: mangaArray})
}

/**returns the image path corresponding to the manga type */
export const getImagePath = (title: string): string => {

    let titleFormatted = title.slice();

    if (title.startsWith(".")) {
        titleFormatted = titleFormatted.slice(1)
    }

    //replaces the title
    for (const character of FORBIDDEN_FILE_NAME_CHARACTERS) {

        if (titleFormatted.includes(character)) {
            titleFormatted = titleFormatted.replaceAll(character, "");
        }
    }

    return titleFormatted + ".jpg";
    
}

/**A list of characters that can be in titles, not file paths */
const FORBIDDEN_FILE_NAME_CHARACTERS: string[] = [
    "/", "?", ":", "<", ">", "|", "\\", "\"", "'", " "
];