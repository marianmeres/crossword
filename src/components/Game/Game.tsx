import * as React from 'react';
import {config} from '../../config';

import './Game.css';
import {Board} from '../../_lib/crossword/Board';
import Word from '../../_lib/crossword/Word';

interface GameProps {
    board: Board;
    words: any;
}

interface GameState {
    selectedValue: string;
    board: Board;
    selectedCoords: number[][];
}

export default class Game extends React.Component<GameProps, GameState> {

    state = {
        selectedValue: '',
        board: this.props.board,
        selectedCoords: [],
    };

    _isDragging = false;
    _coords = [];

    constructor(props) {
        super(props);

        this.handleWordButtonClick = this.handleWordButtonClick.bind(this);
        this.handleTdMouseOver = this.handleTdMouseOver.bind(this);
        this.handleTdDragStart = this.handleTdDragStart.bind(this);
        this.handleTdDragLeave = this.handleTdDragLeave.bind(this);

        // console.log(Object.keys(props.words).indexOf('ancúg') !== -1);
        // console.log(!!props.words['ancúg']);
    }

    handleWordButtonClick(e) {
        e.preventDefault();
        // console.log(e.target.dataset.kokos);
        this.markWord(e.target.value, true);
    }

    handleTdMouseOver(e) {
        if (this._isDragging) {
            // console.log(e.target.dataset.x, e.target.dataset.y);
            // let selectedCoords = this.state.selectedCoords.slice();
            // selectedCoords.push([e.target.dataset.x, e.target.dataset.y]);
            // this.setState({ selectedCoords });
            // this.setState(((prevState, props) => {
            //     return prevState.selectedCoords.push(
            //         [e.target.dataset.x, e.target.dataset.y]
            //     );
            // }));
            this.saveCoords(e.target.dataset.x, e.target.dataset.y);
        }
    }

    handleTdDragStart(e) {
        // console.log('start', e);
        this._isDragging = true;
        this.setState({selectedCoords: []});
        this.saveCoords(e.target.dataset.x, e.target.dataset.y);
    }

    handleTdDragLeave(e) {
        // console.log('leave', e);
        this._isDragging = false;
        // console.log(this.state.selectedCoords);
        this.handleSelectedCoords();
    }

    handleSelectedCoords() {
        let selected = this.state.selectedCoords;
        let board = this.state.board;

        let chars = [];
        selected.forEach((pair) => {
            let char = board.charAt(pair[0], pair[1]);
            if (char) { chars.push(char); }
        });
        this.markWord(chars.join(''));

        this.setState({selectedCoords: []});
    }

    saveCoords(x, y) {
        let selectedCoords = this.state.selectedCoords.slice();
        selectedCoords.push([parseInt(x, 10), parseInt(y, 10)]);
        this.setState({ selectedCoords });
    }

    markWord(wordStr, allowUnmark = false) {
        let found = this.state.board.find(wordStr);

        // tu musime osetrit, ci sa realne nachadza vo whiteliste, lebo:
        // - jednak sme mohli selekntu odzadu (to normalizujeme), alebo
        // - iba nejaky substring (to zahodime)
        if (found && !this.isWhitelisted(found)) {
            let reversed = found.toString().split('').reverse().join('');
            found = this.state.board.find(reversed);
            // ak sa stale nenachadza, tak sme najskor selektli nejaky substring
            if (found && !this.isWhitelisted(found)) {
                found = null;
            }
        }

        if (found) {
            let board = this.state.board.clone();
            if (board.isMarked(found)) {
                if (allowUnmark) { board.unMarkWord(found); }
            } else {
                board.markWord(found);
            }
            this.setState({board});
        }
    }

    isWhitelisted(wordOrStr) {
        // return !!this.props.words[wordOrStr.toString()];
        return (Object.keys(this.props.words).indexOf(wordOrStr.toString()) !== -1);
    }

    render() {
        let B = `${config.B}-game`;
        let board = this.state.board;

        // board.markWord(board.find('gebuľa'));
        // board.markWord(board.find('mačanka'));

        let marks = board.getAllMarkedCoordinates();
        let isMarked = (x, y) => (marks[y] && marks[y][x]);

        let isBeingSelected = (x, y) => {
            let coords = this.state.selectedCoords;
            for (let i = 0; i < coords.length; i++) {
                if (coords[i][0] === x && coords[i][1] === y) {
                    return true;
                }
            }
            return false;
        };

        return (
            <div className={`${B}`}>
                <div className={`${B}-board`}>
                    <table className={`${B}-table`}><tbody>
                    {
                        board.board.map((row, y) => {
                            let tds = row.map((char, x) => {
                                let cls = [];
                                if (isMarked(x, y)) { cls.push('_marked'); }
                                if (isBeingSelected(x, y)) { cls.push('_selected'); }
                                return (
                                    <td
                                        key={`td-${y}-${x}`}
                                        className={cls.join(' ')}
                                        onMouseOver={this.handleTdMouseOver}
                                        onMouseDown={this.handleTdDragStart}
                                        onMouseUp={this.handleTdDragLeave}
                                        data-x={x}
                                        data-y={y}
                                    >
                                        {char}
                                    </td>
                                );
                            });
                            return (
                                <tr key={`tr-${y}`}>
                                    {tds}
                                </tr>
                            );
                        })
                    }
                    </tbody></table>
                </div>
                <div className={`${B}-words`}>
                    {
                        Object.keys(this.props.words).map((key) => {
                            let cls = 'btn btn-sm ';
                            if (this.state.board.isMarked(key)) {
                                cls += ' btn-primary';
                            } else {
                                cls += ' btn-outline-primary';
                            }
                            return (
                                <button
                                    key={key}
                                    className={cls}
                                    value={key}
                                    onClick={this.handleWordButtonClick}
                                >
                                    {key}
                                </button>
                            );
                        })
                    }
                </div>

            </div>
        );

    }

}
