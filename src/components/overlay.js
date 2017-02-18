import React, { Component } from 'react';
import styles from '../assets/css/overlay.css';
import utils from '../lib/utils.js';

export default class Overlay extends Component {
    propTypes: {
        destroyOverlay: React.propTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.keyCode === 27) {
            this.props.destroyOverlay();
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const img = utils.resizeImage(this.props.image, 1440, 960);
        
        return (
            <div className={ styles.overlay }>
                <span className={ styles.closeBtn } onClick={ this.props.destroyOverlay } />
                <img className={ styles.overlayPic } src={ img.src } { ...img.dimensions } />
            </div>
        )
    }
}