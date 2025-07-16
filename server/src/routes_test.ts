import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import {getImagePath, getManga} from './routes'

describe('routes', function() {

    it('getImagePath', function() {
        assert.strictEqual(getImagePath("hack//"), "/manga_library/hack.jpg");
        assert.strictEqual(getImagePath(".hack//Legend of The Twilight"), "/manga_library/.hackLegendofTheTwilight.jpg")
        assert.strictEqual(getImagePath("Bleach"), "/manga_library/Bleach.jpg");
        assert.strictEqual(getImagePath("Bad: ? '\\ < > ' \" "), "/manga_library/Bad.jpg")

    });

    it ('getManga', function() {

        const req1 = httpMocks.createRequest({
            method: "GET", url: "/api/manga"
        })

        const res1 = httpMocks.createResponse();
        getManga(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 200)
        assert.deepStrictEqual(res1._getData().manga.length > 0, true)

    });

});