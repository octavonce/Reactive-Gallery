import React, { Component } from 'react';
import Gallery from './components/gallery.js';
import styles from './assets/css/gallery.css';
import { WindowResizeListener } from 'react-window-resize-listener';
import Overlay from './components/overlay.js';

export default class Root extends Component {
    constructor(props) {
        super(props)

        /*
            These functions need to be called 
            from the gallery so we bind 'this' to it
         */

        this.renderOverlay = this.renderOverlay.bind(this);
        this.closeOverlay = this.closeOverlay.bind(this);
    }

    componentWillMount() {
        const rootContainer = document.getElementById(this.props.containerId);
        const dimensions = rootContainer.getBoundingClientRect();

        /*  
            Is the container the same width as the window?
            We shouldn't resize the gallery if it isn't so
         */

        const resize = window.innerWidth === dimensions.width ? true : false;

        this.state = {
            dimensions: {
                width: dimensions.width,
                height: dimensions.height
            },
            showOverlay: false,
            shownImage: null,
            resize: resize
        }
    }

    renderOverlay(image) {
        this.setState({
            showOverlay: true,
            shownImage: image
        })
    }

    closeOverlay() {
        this.setState({
            showOverlay: false,
            shownImage: null
        })
    }

    resizeImage(image, maxWidth, maxHeight) {

        /*
            We need to resize the images
            while keeping their aspect ratio
         */

        let height = image.dimensions.height;
        let width = image.dimensions.width;
        let ratio = height / width;

        if (width > maxWidth) {
            width = maxWidth;
            height = width / ratio;
        }

        if (height > maxHeight) {
            ratio = width / height;
            height = maxHeight;
            width = height / ratio;
        }

        image.dimensions.height = height;
        image.dimensions.width = width;

        return image;
    }

    render() {
        const showOverlay = this.state.showOverlay;

        return (
            <div style={this.state.dimensions}>
                <WindowResizeListener onResize={windowSize => {

                    if (this.state.resize) {
                        this.setState({
                            dimensions: {
                                width: windowSize.windowWidth - 16,
                                height: windowSize.windowHeight
                            }
                        })
                    }
                }}/>

                { showOverlay ? <Overlay image={ this.state.shownImage } resizeImage={ this.resizeImage } closeOverlay={ this.closeOverlay } /> : null }
                
                <Gallery 
                    galleryWidth={ this.state.width }
                    renderOverlay={ this.renderOverlay } 
                    closeOverlay={ this.closeOverlay } 
                    resizeImage={ this.resizeImage } 
                    images={ this.props.images } 
                />
            </div>
        )
    }
}