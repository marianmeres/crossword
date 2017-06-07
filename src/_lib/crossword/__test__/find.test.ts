import {Board} from '../Board';
import Crossword from '../Crossword';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

describe('Board.find', () => {

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample.json')));
    let b = new Board(data.board);
    
    it('works', () => {
        let found = b.find('car');
        // assert.equal(Crossword.DIRECTION_RIGHT, found.direction);
        assert.equal(0, found.coordinates[0][0]);
        assert.equal(0, found.coordinates[0][1]);

        //
        let data2 = JSON.parse(fs.readFileSync(path.join(__dirname, './_data/sample2.json')));
        let b2 = new Board(data2.board);

        [
            'ancúg', 'bandurky', 'drabina', 'džveredlo', 'firštok', 'gebuľa', 'gruľa',
            'kolimaž', 'lajbík', 'mačanka', 'ocec', 'pacerky', 'rumkľa', 'takoj', 'vercajk'
        ].forEach((w) => {
            let found2 = b2.find(w);
            // console.log(w, found);
            assert(found2);
        });
    });
    
});

