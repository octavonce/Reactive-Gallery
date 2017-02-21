import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/gallery.css';
import utils from '../lib/utils.js';

export default class Gallery extends Component {
    static propTypes: {
        renderOverlay: React.PropTypes.func.isRequired,
        showOverlay: React.PropTypes.boolean.isRequired,
        closeOverlay: React.PropTypes.func.isRequired,
        images: React.PropTypes.Array,
        background: React.PropTypes.string.isRequired,
        maxThumbnailWidth: React.PropTypes.number.isRequired,
        maxThumbnailHeight: React.PropTypes.number.isRequired,
        galleryWidth: React.PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { showOverlay, renderOverlay, maxThumbnailWidth, maxThumbnailHeight, background, galleryWidth } = this.props;

        return (
            <div className={ !showOverlay ? styles.picContainer : styles.hidden } style={{ width: galleryWidth }}>
                {this.props.images.map((image, index) => {
                    const imgWidth = image.dimensions.width;
                    const imgHeight = image.dimensions.height;
                    const keepRatio = utils.getRatio(imgWidth, imgHeight) === '4:3' ? true : false;
                    const resizedImage = utils.resizeImage(image, maxThumbnailWidth, maxThumbnailHeight, keepRatio);

                    return (
                        <div key={ index } className={ !showOverlay ? styles.pic : styles.hidden }>
                            <img 
                                src={ image.src } 
                                onClick={ () => { renderOverlay(image) }}
                                { ...resizedImage.dimensions }
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}