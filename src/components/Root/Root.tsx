import * as React from 'react';
import {config} from '../../config';

import './Root.css';
import {Board} from '../../_lib/crossword/Board';
import BoardCmp from '../BoardCmp/BoardCmp';

interface RootState {
    currentCrosswordIdx: number;
    board: Board;
}

export default class Root extends React.Component<{}, RootState> {

    state: RootState = {
        currentCrosswordIdx: 0,
        board: new Board(config.crosswords[0].board),
    };

    render() {
        let B = `${config.B}-root`;

        return (
            <div className={`${B}`}>
                <BoardCmp
                    board={this.state.board}
                    words={config.crosswords[0].words}
                />
            </div>
        );
    }

}
