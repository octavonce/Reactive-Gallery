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
        const showOverlay = this.props.showOverlay;
        const displayOverlay = this.props.displayOverlay;

        return (
            <div className={ !showOverlay ? styles.picContainer : styles.hidden }>
                {this.props.images.map((image, index) => {
                    const resizedImage = utils.resizeImage(image, 380, 200);

                    return (
                        <div key={ index } className={ !showOverlay ? styles.pic : styles.hidden }>
                            <img 
                                src={ image.src } 
                                onClick={ () => { displayOverlay(image.src) }}
                                { ...resizedImage.dimensions }
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}