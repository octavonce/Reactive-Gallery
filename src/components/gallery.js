import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/gallery.css';
import utils from '../lib/utils.js';

export default class Gallery extends Component {
    propTypes: {
        renderOverlay: React.PropTypes.func.isRequired,
        closeOverlay: React.PropTypes.func.isRequired,
        images: React.PropTypes.Array
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { showOverlay, renderOverlay, maxThumbnailWidth, maxThumbnailHeight, background } = this.props;
        const backgroundObject = !!background ? { backgroundImage: 'url(' + background + ')' } : {};

        return (
            <div className={ !showOverlay ? styles.picContainer : styles.hidden } style={ backgroundObject }>
                {this.props.images.map((image, index) => {
                    const resizedImage = utils.resizeImage(image, maxThumbnailWidth, maxThumbnailHeight);

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