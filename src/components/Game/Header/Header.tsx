import * as React from 'react';

import './Header.css';
import { config } from '../../../config';
import { GameProps } from '../Game';

interface HeaderProps extends GameProps {
    elapsed: number;
    isFinished: boolean;
    finishGame: () => void;
    title: string;
    wordsCound: number;
    markedCount: number;
}

export default class Header extends React.Component<HeaderProps, {}> {

    render() {
        let B = `${config.B}-game-header`;

        let elapsed = Math.max(0, this.props.elapsed);
        let time = hms(elapsed);

        let cls = elapsed ? '' : ' _finished';

        return (
            <div className={B}>
                <div className={`${B}-left`}>
                    <span className={`${B}-clock ${cls}`}>{time.m}:{time.s}</span>
                </div>
                <div className={`${B}-center`}>
                    <h1
                        onClick={this.props.actions.back}
                        className={`${B}-title`}
                    >
                        {this.props.title}
                    </h1>
                </div>
                <div className={`${B}-right`}>
                    <span className={`${B}-hits`}>
                        <b>{this.props.markedCount}</b> <span>/ {this.props.wordsCound}</span>
                    </span>
                </div>
            </div>
        );
    }
}

function hms(totalSeconds, $returnAsArray = false) {
    let s = totalSeconds % 60;
    let m = ((totalSeconds - s) % 3600) / 60;
    let h = Math.floor((totalSeconds - (m * 60)) / 3600);
    const pad = (v: string) => v.length < 2 ? `0${v}` : v;
    return { h: pad(`${h}`), m: pad(`${m}`), s: pad(`${s}`) };
}