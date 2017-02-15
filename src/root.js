import React, { Component } from 'react';
import Gallery from './components/gallery.js';
import styles from './assets/css/gallery.css';
import { WindowResizeListener } from 'react-window-resize-listener';

export default class Root extends Component {
    componentWillMount() {
        const rootContainer = document.getElementById('reactive-gallery');
        const dimensions = rootContainer.getBoundingClientRect();

        this.state = {
            dimensions: {
                width: dimensions.width,
                height: dimensions.height
            } 
        }
    }

    render() {
        const images = [
            'http://lorempixel.com/400/200/',
            'http://lorempixel.com/400/200/',
            'http://lorempixel.com/400/200/',
            'http://lorempixel.com/500/300/',
            'http://lorempixel.com/1200/800/',
            'http://lorempixel.com/900/400/',
            'http://lorempixel.com/1920/1080/',
            'http://lorempixel.com/400/400/',
            'http://lorempixel.com/400/400/',
            'http://lorempixel.com/400/400/',
            'http://lorempixel.com/4280/2100/'
        ]

        return (
            <div className={styles.gallery} style={this.state.dimensions}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({
                        dimensions: {
                            width: windowSize.windowWidth - 16,
                            height: windowSize.windowHeight
                        }
                    })
                }}/>

                <Gallery images={images} />
            </div>
        )
    }
}