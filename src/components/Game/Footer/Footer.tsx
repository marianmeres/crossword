import * as React from 'react';

import './Footer.css';
import {config} from '../../../config';
import {GameProps, renderVisual} from '../Game';
import {Board} from '../../../_lib/crossword/Board';
import {render} from 'react-dom';

interface FooterProps extends GameProps {
    board: Board;
    words: string[];
    markWord: (wordStr, allowUnmark) => void;
}

export default class Footer extends React.Component<FooterProps, {}> {

    constructor(props) {
        super(props);
        this.handleWordButtonClick = this.handleWordButtonClick.bind(this);
    }

    handleWordButtonClick(e) {
        e.preventDefault();
        this.props.markWord(e.target.value, true);
    }

    render() {
        let B = `${config.B}-game-footer`;
        let board = this.props.board;

        return (
            <div className={`${B}`}>
                <div className={`${B}-words`}>
                    {
                        this.props.words.map((word) => {
                            let cls = [];
                            if (board.isMarked(word)) {
                                cls.push('_marked');
                            }
                            return (
                                <button
                                    className={cls.join(' ')}
                                    key={word}
                                    value={word}
                                    onClick={this.handleWordButtonClick}
                                    disabled={true}
                                >
                                    {renderVisual(word)}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

