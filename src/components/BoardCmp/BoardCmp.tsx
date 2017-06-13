import * as React from 'react';
import {config} from '../../config';

import './BoardCmp.css';
import {Board} from '../../_lib/crossword/Board';

interface BoardCmpProps {
    board: Board;
    words: any;
}

export default class BoardCmp extends React.Component<BoardCmpProps, any> {

    state = {
        selectedValue: '',
        board: this.props.board,
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({selectedValue: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.markWord(this.state.selectedValue);
    }

    markWord(word) {
        let board = this.state.board.clone();
        board.markWord(board.find(word));
        this.setState({
            board: board
        });
        // this.state.board.markWord(this.state.board.find(word));
    }

    render() {
        let B = `${config.B}-board`;
        let board = this.state.board;

        // board.markWord(board.find('gebuľa'));
        // board.markWord(board.find('mačanka'));

        let marks = board.getAllMarkedCoordinates();
        let isMarked = (x, y) => (marks[y] && marks[y][x]);
        return (
            <div
                className={`${B}`}
                style={{
                    // width: `${board.sizeX * 2}em`,
                }}
            >
                <table className={`${B}-table`}><tbody>
                {
                    board.board.map((row, y) => {
                        let tds = row.map((char, x) => {
                            return (
                                <td
                                    key={`td-${y}-${x}`}
                                    className={isMarked(x, y) ? `_marked` : ''}
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

                <form onSubmit={this.handleSubmit}>
                    <select value={this.state.selectedValue} onChange={this.handleChange}>
                        <option value="" />
                        {
                            Object.keys(this.props.words).map((key) => {
                                return <option key={key} value={key}>{key}</option>;
                            })
                        }
                    </select>
                    <input type="submit" value="Označ" />
                </form>
            </div>
        );

    }

}
