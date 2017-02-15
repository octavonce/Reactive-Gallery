import React, { Component } from 'react';
import styles from '../assets/css/overlay.css';

export default class Overlay extends Component {
    propTypes: {
        closeOverlay: React.propTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = this.props;
    }

    render() {
        const src = this.state.src;
        const dimensions = this.state.dimensions;
        
        return (
            <div className={ styles.overlay }>
                <span className={ styles.closeBtn } onClick={ this.props.closeOverlay } />
                <img className={ styles.overlayPic } src={ src } { ...dimensions } />
            </div>
        )
    }
}