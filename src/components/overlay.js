import React, { Component } from 'react';
import styles from '../assets/css/overlay.css';
import utils from '../lib/utils.js';

export default class Overlay extends Component {
    static propTypes: {
        image: React.PropTypes.object.isRequired,
        destroyOverlay: React.propTypes.func.isRequired,
        galleryWidth: React.PropTypes.number.isRequired,
        galleryHeight: React.PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.keyCode === 27) {
            // Handle pressing escape
            this.props.destroyOverlay();
        } else if (event.keyCode === 37) {
            // Handle left arrow press
            console.log('Left arrow pressed');
        } else if (event.keyCode === 39) {
            // Handle right arrow press
            console.log('Right arrow pressed');
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        const handleImage = image => {
            const heightPercentageInPixels = utils.getPercent(50, this.props.galleryHeight);
            const widthPercentageInPixels = utils.getPercent(75, this.props.galleryWidth); 

            if (image.dimensions.height > heightPercentageInPixels && image.dimensions.width > widthPercentageInPixels) {
                return utils.resizeImage(image, widthPercentageInPixels, heightPercentageInPixels);
            } else {
                return image;
            }
        }

        const img = handleImage(this.props.image);
        
        return (
            <div className={ styles.overlay }>
                <span className={ styles.closeBtn } onClick={ this.props.destroyOverlay } />
                <img className={ styles.overlayPic } src={ img.src } { ...img.dimensions } />
            </div>
        )
    }
}