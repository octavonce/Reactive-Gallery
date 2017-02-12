import React, { Component } from 'react';
import Gallery from './components/gallery.js';
import styles from './assets/css/gallery.css';

export default class App extends Component {
    render() {
        const rootContainer = document.getElementById('root');
        const dimensions = rootContainer.getBoundingClientRect();

        const inlineStyles = {
            galleryDimensions: {
                width: dimensions.width,
                height: dimensions.height
            }
        }

        const images = {
            'img1': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img2': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img3': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img4': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img5': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img6': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img7': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img8': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img9': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img10': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img11': {
                src: 'http://lorempixel.com/400/200/'
            },
            'img12': {
                src: 'http://lorempixel.com/400/200/'
            }
        }

        return (
            <div className={styles.gallery} style={inlineStyles.galleryDimensions}>
                <Gallery images={images} />
            </div>
        )
    }
}