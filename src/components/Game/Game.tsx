import * as React from 'react';
import Measure from 'react-measure';

import {config} from '../../config';

import './Game.css';
import {Board} from '../../_lib/crossword/Board';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export function renderVisual(str: string) {
    const map = config.visualOutputReplaceMap;
    return str.split('').map((char) => (map[char] ? map[char] : char)).join('');
}

export interface GameProps {
    crosswordIdx: number;
    actions: {
        back: () => any;
    };
}

interface GameState {
    selectedValue: string;
    board: Board;
    selectedCoords: number[][];
    isFinished: boolean;
    elapsed: number;
    _debug: {};
    boardDimensions: {
        width: number;
        height: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}

export default class Game extends React.Component<GameProps, GameState> {

    state = {
        selectedValue: '',
        board: null,
        selectedCoords: [],
        isFinished: false,
        elapsed: 0,
        _debug: {},
        boardDimensions: {
            width: -1, height: -1,
            top: -1, right: -1, bottom: -1, left: -1
        },
    };

    dragStartX = null;
    dragStartY = null;
    dragEndX = null;
    dragEndY = null;

    _isDragging = false;

    words: string[];
    timer = null;
    title: string = null;

    started = Date.now();

    constructor(props) {
        super(props);

        if (config.crosswords[this.props.crosswordIdx]) {
            this.state.board = new Board(config.crosswords[this.props.crosswordIdx].board);
            this.words = config.crosswords[this.props.crosswordIdx].words;
            this.title = config.crosswords[this.props.crosswordIdx].title;
        }

        this.handleWordButtonClick = this.handleWordButtonClick.bind(this);

        // this.handleTdMouseOver = this.handleTdMouseOver.bind(this);
        // this.handleTdDragStart = this.handleTdDragStart.bind(this);
        // this.handleTdDragLeave = this.handleTdDragLeave.bind(this);

        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);

        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);

        this.finishGame = this.finishGame.bind(this);
        this.markWord = this.markWord.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        if (this.state.isFinished) { return; }
        let elapsed = Math.round((Date.now() - this.started) / 1000);
        if (elapsed >= config.timeLimitSeconds) {
            this.setState({ elapsed, isFinished: true });
        } else {
            this.setState({elapsed});
        }
    }

    finishGame() {
        this.setState({isFinished: true});
    }

    handleWordButtonClick(e) {
        e.preventDefault();
        this.markWord(e.target.value, true);
    }

    // prerobene na mouse/touch move
    // handleTdMouseOver(e) {
    //     if (this._isDragging) {
    //         this.saveCoords(
    //             this.dragStartX, this.dragStartY,
    //             e.target.dataset.x, e.target.dataset.y
    //         );
    //     }
    // }
    //
    // handleTdDragStart(e) {
    //     // console.log('start', e);
    //     this._isDragging = true;
    //     this.setState({selectedCoords: []});
    //     if (this.dragStartX === null) {
    //         this.dragStartX = e.target.dataset.x;
    //         this.dragStartY = e.target.dataset.y;
    //     }
    //     this.dragEndX = e.target.dataset.x;
    //     this.dragEndY = e.target.dataset.y;
    //     this.saveCoords(
    //         this.dragStartX, this.dragStartY, this.dragEndX, this.dragEndY
    //     );
    // }
    //
    // handleTdDragLeave(e) {
    //     // console.log('leave', e);
    //     this._isDragging = false;
    //     this.dragStartX = null;
    //     this.dragStartY = null;
    //     this.dragEndX = null;
    //     this.dragEndY = null;
    //     this.handleSelectedCoords();
    // }

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

    saveCoords(sx, sy, ex, ey) {
        let selectedCoords = this.state.board.normalizeCoordinatesBetween(
            sx, sy, ex, ey
        );
        this.setState({ selectedCoords });
    }

    _onTouchStart(e) {
        this._onPseudoDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }

    _onTouchEnd(e) {
        this._onPseudoDragEnd();
    }

    _onTouchMove(e) {
        this._onPseudoDragMove(e.touches[0].clientX, e.touches[0].clientY);
    }

    _onMouseDown(e) {
        this._onPseudoDragStart(e.clientX, e.clientY);
    }

    _onMouseUp(e) {
        this._onPseudoDragEnd();
    }

    _onMouseMove(e) {
        this._onPseudoDragMove(e.clientX, e.clientY);
    }

    _onPseudoDragStart(clientX, clientY) {
        this._isDragging = true;
        this.setState({selectedCoords: []});

        if (!this._isOnBoard(clientX, clientY)) { return; }

        let coords = this._getCoordsFromClientXY(clientX, clientY);

        this.dragStartX = coords[0];
        this.dragStartY = coords[1];
        this.dragEndX = coords[0];
        this.dragEndY = coords[1];

        this.saveCoords(
            this.dragStartX, this.dragStartY, this.dragEndX, this.dragEndY
        );
    }

    _onPseudoDragMove(clientX, clientY) {
        if (this._isDragging && this._isOnBoard(clientX, clientY)) {
            let coords = this._getCoordsFromClientXY(clientX, clientY);
            this.saveCoords(
                this.dragStartX, this.dragStartY, coords[0], coords[1]
            );
        }
    }

    _onPseudoDragEnd() {
        this._isDragging = false;
        this.dragStartX = null;
        this.dragStartY = null;
        this.dragEndX = null;
        this.dragEndY = null;
        this.handleSelectedCoords();
    }

    _isOnBoard(clientX, clientY) {
        const {width, height, top, right, bottom, left} = this.state.boardDimensions;
        return (clientX > left && clientX < right && clientY > top && clientY < bottom);
    }

    _getCoordsFromClientXY(clientX, clientY) {
        if (!this._isOnBoard(clientX, clientY)) { return []; }

        const {width, height, top, right, bottom, left} = this.state.boardDimensions;
        let tdWidth = width / this.state.board.sizeX;
        let tdHeight = height / this.state.board.sizeY;
        let boardX = clientX - left;
        let boardY = clientY - top;

        let cellX = Math.floor(boardX / tdWidth);
        let cellY = Math.floor(boardY / tdHeight);

        return [cellX, cellY];
    }

    markWord(wordStr, allowUnmark = false) {

        // ak sme skoncili, tak uz nic
        if (this.state.isFinished) {
            return alert('Čas vypršal');
        }

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
            if (Object.keys(board.marks).length === this.words.length) {
                this.setState({isFinished: true});
            }
        }
    }

    isWhitelisted(wordOrStr) {
        return (this.words.indexOf(wordOrStr.toString()) !== -1);
    }

    renderVisual(str: string) {
        return renderVisual(str);
    }

    render() {
        let B = `${config.B}-game`;
        let board = this.state.board;

        if (!board) {
            return <div>board '{this.props.crosswordIdx}' not found</div>;
        }

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
            <Measure
                bounds={true}
                onResize={(contentRect) => {
                    this.setState({ boardDimensions: contentRect.bounds });
                }}
            >
            {({ measure, measureRef, contentRect }) => (
                <div
                    className={`${B}`}

                    onMouseDown={this._onMouseDown}
                    onMouseUp={this._onMouseUp}
                    onMouseMove={this._onMouseMove}

                    onTouchStart={this._onTouchStart}
                    onTouchEnd={this._onTouchEnd}
                    onTouchMove={this._onTouchMove}
                >

                    <Header
                        wordsCound={this.words.length}
                        markedCount={Object.keys(this.state.board.marks).length}
                        title={this.title}
                        elapsed={config.timeLimitSeconds - this.state.elapsed}
                        finishGame={this.finishGame}
                        isFinished={this.state.isFinished}
                        {...this.props}
                    />

                    <div className={`${B}-board`}>
                        <table className={`${B}-table`}>
                            <tbody ref={measureRef}>
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
                                        >
                                            {this.renderVisual(char)}
                                        </td>
                                    );
                                });
                                return (
                                    <tr key={`tr-${y}`}>{tds}</tr>
                                );
                            })
                        }
                            </tbody>
                        </table>
                    </div>

                    <Footer
                        words={this.words}
                        board={this.state.board}
                        markWord={this.markWord}
                        {...this.props}
                    />

                </div>
            )}
            </Measure>
        );

    }

}
