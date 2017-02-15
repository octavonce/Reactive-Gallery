import React, { Component } from 'react';
import styles from '../assets/css/overlay.css';

export default class Overlay extends Component {
    propTypes: {
        closeOverlay: React.propTypes.func.isRequired,
        resizeImage: React.propTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        const img = this.props.resizeImage(this.props.image, 800, 600);
        
        return (
            <div className={ styles.overlay }>
                <span className={ styles.closeBtn } onClick={ this.props.closeOverlay } />
                <img className={ styles.overlayPic } src={ img.src } { ...img.dimensions } />
            </div>
        )
    }
}