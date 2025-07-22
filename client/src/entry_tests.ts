import * as assert from 'assert'
import {sortByTitle} from './Entry'

describe('Entry', function() {

    it('sortByTitle', function() {

        const series1 = {
            title: 'Azumanga Daioh',
            id: 'example ID',
            coverUrl: 'AzumangaDaioh.jpg',
            volumes: [],
            tags: [],
        }

        const series2 = {
            title: 'Bleach',
            id: 'example ID-2',
            coverUrl: 'Bleach.jpg',
            volumes: [],
            tags: [],
        }

        const series3 = {
            title: 'Angelic Layer',
            id: 'example ID-3',
            coverUrl: 'AngelicLayer.jpg',
            volumes: [],
            tags: [],
        }

        const seriesArray = [series1, series2, series3];

        assert.strictEqual(sortByTitle(series1, series2), -1)
    });
})