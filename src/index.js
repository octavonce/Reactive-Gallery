import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gallery from './reducers/gallery.js'
import GalleryContainer from './containers/gallery.js';
import utils from './lib/utils.js';
import store from './store.js';
import { 
    appendImage, 
    prependImage, 
    resizeGallery, 
    toggleResize,
    toggleOverlay } from './actions/gallery.js';


const reactiveGallery = options => {
    let containerId;
    let storedImages = [];
 
    const renderGallery = (images, id) => {
        const rootContainerDimensions = document.getElementById(id).getBoundingClientRect();
        const dimensions = { width: rootContainerDimensions.width, height: rootContainerDimensions.height };
        
        constructGalleryDimensions(dimensions)
            .then(checkForResize(dimensions))
            .then(appendInitialImages(images))
            .then(renderInitialGallery(id));
    }

    const appendInitialImages = images => {
        return new Promise((resolve, reject) => {
            images.forEach((image, index) => {
                utils.getDimensions(image, dimensions => {
                    const imgObject = { src: image, dimensions: dimensions }

                    store.dispatch(appendImage(imgObject));
                    if (index === images.length - 1) resolve();
                })
            })
        })
    }

    const checkForResize = dimensions => {
        return new Promise((resolve, reject) => {

            /*  
                Is the container the same width as the window?
                We shouldn't resize the gallery if it isn't so
             */

            const resize = window.innerWidth === dimensions.width ? true : false;
            store.dispatch(toggleResize(resize));
            resolve();
        })
    }

    const constructGalleryDimensions = dimensions => {
        return new Promise((resolve, reject) => {
            store.dispatch(resizeGallery(dimensions));
            resolve(dimensions);
        })
    }
    
    const renderInitialGallery = id => {
        return new Promise((resolve, reject) => {

            console.log('Initial state   ', store.getState());

            ReactDOM.render(
                <Provider store={ store }>
                    <GalleryContainer dispatch={ store.dispatch } />
                </Provider>, 
                document.getElementById(id)
            );
        })
    } 

    return {
        createGallery: (images, id) => {
            storedImages = images;
            containerId = id;
            renderGallery(images, id);
        },

        prependImage: (path) => {
            utils.getDimensions(path, dimensions => {
                const imgObject = { src: path, dimensions: dimensions }; 
                store.dispatch(appendImage(imgObject));
            })
        },

        appendImage: (path) => {
            utils.getDimensions(path, dimensions => {
                const imgObject = { src: path, dimensions: dimensions }; 
                store.dispatch(prependImage(imgObject));
            })
        }
    }
}

const images = [
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/500/300/',
    'http://lorempixel.com/1200/800/',
    'http://lorempixel.com/900/400/',
    'http://lorempixel.com/1920/1080/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/4280/2100/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/'
]

const sameSizeImages = [
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/',
    'http://lorempixel.com/1280/720/'
]

const containerId = 'reactive-gallery';
const react_gallery = reactiveGallery({});

react_gallery.createGallery(sameSizeImages, containerId);

setInterval(() => {
    react_gallery.prependImage('https://s-media-cache-ak0.pinimg.com/736x/26/7f/70/267f709e4c8b696957ebf9f187c0d344.jpg');
}, 6000);

export default reactiveGallery;

