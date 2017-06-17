import * as React from 'react';
import {config} from '../../config';

import './Root.css';
import {Board} from '../../_lib/crossword/Board';
import Game from '../Game/Game';

interface RootState {
    crosswordIdx: number;
    // board: Board;
}

export default class Root extends React.Component<{}, RootState> {

    state: RootState = {
        crosswordIdx: null,
        // board: new Board(config.crosswords[0].board),
    };

    constructor(props) {
        super(props);

        this.handleGameSelectClick = this.handleGameSelectClick.bind(this);
    }

    render() {
        let B = `${config.B}-root`;
        let key = this.state.crosswordIdx;

        if (key === null) {
            return this.renderSelectGame();
        }

        // if (!config.crosswords[key]) {
        //     return <div>unknown</div>;
        // }
        //
        // let board = config.crosswords[key].board;

        return (
            <div className={`${B}`}>
                <Game crosswordIdx={key} />
            </div>
        );
    }

    handleGameSelectClick(e) {
        e.preventDefault();
        this.selectGame(e.target.value);
    }

    selectGame(idx) {
        this.setState({crosswordIdx: parseInt(idx, 10)});
    }

    renderSelectGame() {
        let games = config.crosswords;

        return (
            <div>
                {
                    games.map((cfg, idx) => {
                        return (
                            <button
                                key={cfg.title}
                                value={idx}
                                onClick={this.handleGameSelectClick}
                            >
                                {idx} - {cfg.title}  ({cfg.words.length})
                            </button>
                        );
                    })
                }
            </div>
        );
    }
}
