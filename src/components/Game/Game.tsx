import * as React from 'react';
import {config} from '../../config';

import './Game.css';
import {Board} from '../../_lib/crossword/Board';

interface GameProps {
    crosswordIdx: number;
}

interface GameState {
    selectedValue: string;
    board: Board;
    selectedCoords: number[][];
}

export default class Game extends React.Component<GameProps, GameState> {

    state = {
        selectedValue: '',
        board: null,
        selectedCoords: [],
    };

    dragStartX = null;
    dragStartY = null;
    dragEndX = null;
    dragEndY = null;

    _isDragging = false;

    words: string[];

    constructor(props) {
        super(props);

        if (config.crosswords[this.props.crosswordIdx]) {
            this.state.board = new Board(config.crosswords[this.props.crosswordIdx].board);
            this.words = config.crosswords[this.props.crosswordIdx].words;

        }

        this.handleWordButtonClick = this.handleWordButtonClick.bind(this);
        this.handleTdMouseOver = this.handleTdMouseOver.bind(this);
        this.handleTdDragStart = this.handleTdDragStart.bind(this);
        this.handleTdDragLeave = this.handleTdDragLeave.bind(this);
    }

    handleWordButtonClick(e) {
        e.preventDefault();
        this.markWord(e.target.value, true);
    }

    handleTdMouseOver(e) {
        if (this._isDragging) {
            this.saveCoords(
                this.dragStartX, this.dragStartY,
                e.target.dataset.x, e.target.dataset.y
            );
        }
    }

    handleTdDragStart(e) {
        // console.log('start', e);
        this._isDragging = true;
        this.setState({selectedCoords: []});
        if (this.dragStartX === null) {
            this.dragStartX = e.target.dataset.x;
            this.dragStartY = e.target.dataset.y;
        }
        this.dragEndX = e.target.dataset.x;
        this.dragEndY = e.target.dataset.y;
        this.saveCoords(
            this.dragStartX, this.dragStartY, this.dragEndX, this.dragEndY
        );
    }

    handleTdDragLeave(e) {
        // console.log('leave', e);
        this._isDragging = false;
        this.dragStartX = null;
        this.dragStartY = null;
        this.dragEndX = null;
        this.dragEndY = null;
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

    saveCoords(sx, sy, ex, ey) {
        let selectedCoords = this.state.board.normalizeCoordinatesBetween(
            sx, sy, ex, ey
        );
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
        return (this.words.indexOf(wordOrStr.toString()) !== -1);
    }

    renderVisual(str: string) {
        const map = config.visualOutputReplaceMap;
        return str.split('').map((char) => (map[char] ? map[char] : char)).join('');
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
            <div className={`${B}`}>

                <div className={`${B}-header`}>top</div>

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
                                        {this.renderVisual(char)}
                                    </td>
                                );
                            });
                            return (
                                <tr key={`tr-${y}`}>{tds}</tr>
                            );
                        })
                    }
                    </tbody></table>
                </div>

                <div className={`${B}-footer`}>bottom</div>

                {/*<div className={`${B}-words`}>*/}
                    {/*{*/}
                        {/*// Object.keys(this.words).map((key) => {*/}
                        {/*this.words.map((word) => {*/}
                            {/*let cls = 'btn btn-sm ';*/}
                            {/*if (this.state.board.isMarked(word)) {*/}
                                {/*cls += ' btn-primary';*/}
                            {/*} else {*/}
                                {/*cls += ' btn-outline-primary';*/}
                            {/*}*/}
                            {/*return (*/}
                                {/*<button*/}
                                    {/*key={word}*/}
                                    {/*className={cls}*/}
                                    {/*value={word}*/}
                                    {/*onClick={this.handleWordButtonClick}*/}
                                {/*>*/}
                                    {/*{this.renderVisual(word)}*/}
                                {/*</button>*/}
                            {/*);*/}
                        {/*})*/}
                    {/*}*/}
                {/*</div>*/}

            </div>
        );

    }

}


const Header = () => {

};