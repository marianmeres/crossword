import * as React from 'react';
import {config} from '../../config';

import './Root.css';
import Game from '../Game/Game';

// import logo from '../../img/logo.png';

interface RootState {
    crosswordIdx: number;
    selectedValue: number;
}

export default class Root extends React.Component<any, RootState> {

    state: RootState = {
        crosswordIdx: null,
        selectedValue: -1,
    };

    constructor(props) {
        super(props);

        this.handleGameSelectClick = this.handleGameSelectClick.bind(this);
        // this.selectGame = this.selectGame.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleGameSelectClick(e) {
        e.preventDefault();
        this.selectGame(e.target.value);
    }

    selectGame(idx) {
        this.setState({crosswordIdx: idx === null ? null : parseInt(idx, 10)});
    }

    handleSelectChange(e) {
        this.setState({selectedValue: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let idx = parseInt(this.state.selectedValue as any, 10);
        if (-1 === idx) {
            idx = mm_getRandomInt(0, config.crosswords.length - 1);
        }

        // console.log(this.state.selectedValue);
        this.selectGame(idx);
    }

    actions() {
        return {
            back: () => this.selectGame(null),
        };
    }

    render() {
        let B = `${config.B}-root`;
        let key = this.state.crosswordIdx;

        if (key === null) {
            return this.renderSelectGame();
        }

        return (
            <div className={`${B}`}>
                <Game
                    crosswordIdx={key}
                    actions={this.actions()}
                />
            </div>
        );
    }

    renderSelectGame() {
        let games = config.crosswords;
        let B = `${config.B}-root`;

        return (
            <div className={`${B}`}>
                <div className={`${B}-selector`}>

                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>

                    <select
                        className="custom-select"
                        value={this.state.selectedValue}
                        onChange={this.handleSelectChange}
                    >
                        <option key={-1} value={-1}>
                            Náhodná osemsmerovka
                        </option>
                        <optgroup>
                    {
                        games.map((cfg, idx) => {
                            return (
                                <option key={idx} value={idx}>
                                    {cfg.title} ({cfg.words.length})
                                </option>
                            );
                            // return (
                            //     <button
                            //         key={cfg.title}
                            //         value={idx}
                            //         onClick={this.handleGameSelectClick}
                            //     >
                            //         {idx} - {cfg.title}  ({cfg.words.length})
                            //     </button>
                            // );
                        })
                    }
                        </optgroup>
                    </select>
                    &nbsp;
                    <button
                        onClick={this.handleSubmit}
                        className="btn"
                    >
                        Štart
                    </button>
                </div>
            </div>
        );
    }
}

export function mm_getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}