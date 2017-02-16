import React, { Component } from 'react';
import styles from '../assets/css/overlay.css';
import utils from '../lib/utils.js';

export default class Overlay extends Component {
    propTypes: {
        closeOverlay: React.propTypes.func.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        const img = utils.resizeImage(this.props.image, 1440, 960);
        
        return (
            <div className={ styles.overlay }>
                <span className={ styles.closeBtn } onClick={ this.props.closeOverlay } />
                <img className={ styles.overlayPic } src={ img.src } { ...img.dimensions } />
            </div>
        )
    }
}