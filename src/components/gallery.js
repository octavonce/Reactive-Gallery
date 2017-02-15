import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/gallery.css';
import helpers from '../utils/helpers.js';
import Overlay from './overlay.js';

export default class Gallery extends Component {
    constructor(props) {
        super(props);

        /*
            This function needs to be called 
            from the overlay so we bind 'this' to it
         */

        this.closeOverlay = this.closeOverlay.bind(this);
        
        this.state = {
            images: []
        };
    }

    componentWillMount() {
        
        /*
            Gets the dimensions an image at a given url
            which are accessible inside the callback
         */

        function getDimensions(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function() { callback({ width: this.width, height: this.height }); }
        }

        /* 
            Pushes an image inside the gallery

            Note: pass 'this' as an argument
            so we can manage the state inside the function
         */

        function pushImage(url, self) {
            getDimensions(url, dimensions => {
                const images = self.state.images;

                images.unshift({dimensions: dimensions, src: url});

                self.setState({
                    images: images
                })
            });
        }

        const images = [];

        /*
            Continuously pushes images inside an array
            and then triggers a state change with each new
            added image so we can re-render the gallery
         */

        for (const image of this.props.images) {
            getDimensions(image, dimensions => {
                images.push({dimensions: dimensions, src: image});

                this.setState({
                    images: images
                })
            });
        }
    }

    displayOverlay(image) {
        this.setState({
            displayOverlay: true,
            shownImage: image
        })
    }

    closeOverlay() {
        this.setState({
            displayOverlay: false,
            shownImage: null
        })
    }

    render() {
        const displayOverlay = this.state.displayOverlay;

        return (
            <div>
                <div className={ !displayOverlay ? styles.picContainer : styles.hidden }>
                    {this.state.images.map((image, index) => {

                        /*
                            We need to resize the images
                            while keeping their aspect ratio
                         */

                        const maxWidth = 650;
                        const maxHeight = 360;

                        let height = image.dimensions.height;
                        let width = image.dimensions.width;
                        let ratio = 0;

                        if (width > maxWidth) {
                            ratio = maxWidth / width;
                            width = maxWidth;
                            height = height * ratio;
                            width = width * ratio;
                        }

                        if (height > maxHeight) {
                            ratio = maxHeight / height;
                            height = maxHeight;
                            width = width * ratio;
                            height = height * ratio;
                        }

                        return (
                            <div key={ index } className={ !displayOverlay ? styles.pic : styles.hidden }>
                                <img 
                                    height={ height } 
                                    width={ width } 
                                    src={ image.src } 
                                    closeOverlay={ this.closeOverlay }
                                    onClick={ () => { this.displayOverlay(image) }}
                                />
                            </div>
                        )
                    })}
                </div>

                {/* Checks the state if we should display the overlay or not */}
                { displayOverlay ? <Overlay { ...this.state.shownImage } closeOverlay={ this.closeOverlay } /> : null }
            </div>
        )
    }
}