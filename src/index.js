import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gallery from './reducers/gallery.js'
import GalleryContainer from './containers/gallery.js';
import { WindowResizeListener } from 'react-window-resize-listener';
import utils from './lib/utils.js';
import store from './store.js';
import { 
    appendImage, 
    prependImage, 
    resizeGallery, 
    toggleResize,
    toggleOverlay } from './actions/gallery.js';

/*
    Usage: 
    
    const options = {...}
    gallery = reactiveGallery(options);

    // Create the gallery
    gallery.createGallery(images, containerId);

    // Prepend image
    gallery.prependImage(imagePath);

    // Append image
    gallery.appendImage(imagePath);
 */


const reactiveGallery = options => {
    let containerId;
    let storedImages = [];
 
    const renderGallery = (images, id) => {
        const rootContainerDimensions = document.getElementById(id).getBoundingClientRect();
        const dimensions = { width: rootContainerDimensions.width, height: rootContainerDimensions.height };
        
        constructGalleryDimensions(dimensions)
            .then(checkForResize(dimensions))
            .then(renderInitialGallery(id))
            .then(appendInitialImages(images));
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

            ReactDOM.render(
                <Provider store={ store }>
                    <GalleryContainer 
                        dispatch={ store.dispatch }
                        renderOverlay={ renderOverlay }
                        destroyOverlay={ destroyOverlay } 
                        resizeTheGallery={ resizeTheGallery }
                    />
                </Provider>, 
                document.getElementById(id)
            );
        })
    } 

    const resizeTheGallery = windowSize => {
        const dimensions = {
            width: windowSize.windowWidth - 16, 
            height: windowSize.windowHeight 
        }

        store.dispatch(resizeGallery(dimensions));
    }

    const renderOverlay = image => {
        store.dispatch(toggleOverlay({ showOverlay: true, shownImage: image }));
    }

    const destroyOverlay = () => {
        store.dispatch(toggleOverlay({ showOverlay: false, shownImage: null }));
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
                store.dispatch(prependImage(imgObject));
            })
        },

        appendImage: (path) => {
            utils.getDimensions(path, dimensions => {
                const imgObject = { src: path, dimensions: dimensions }; 
                store.dispatch(appendImage(imgObject));
            })
        }
    }
}

export default reactiveGallery;

