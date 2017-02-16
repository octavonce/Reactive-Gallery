import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gallery from './reducers/gallery.js'
import GalleryContainer from './containers/gallery.js';
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
        const rootContainer = document.getElementById(id);
        const dimensions = rootContainer.getBoundingClientRect();
        
        constructGalleryDimensions(dimensions)
            .then(checkForResize)
            .then(appendInitialImages(images))
            .then(setInitialOverlayState)
            .then(renderInitialGallery(id));
    }

    const appendInitialImages = images => {
        return new Promise((resolve, reject) => {
            images.forEach((image, index) => {
                store.dispatch(appendImage(image));
                if (index === images.length - 1) resolve();
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

    const setInitialOverlayState = () => {
        return new Promise((resolve, reject) => {
            store.dispatch(toggleOverlay(false, null));
            resolve();
        })
    }
    
    const renderInitialGallery = id => {
        return new Promise((resolve, reject) => {

            console.log(store.getState());

            ReactDOM.render(
                <Provider store={ store }>
                    <GalleryContainer />
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
            store.dispatch(appendImage(path));
        },

        appendImage: (path) => {
            store.dispatch(prependImage(path));
        }
    }
}

export default reactiveGallery;

