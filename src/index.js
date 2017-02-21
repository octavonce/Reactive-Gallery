import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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
    const checkOptions = options => {

        /*
            Checks the options object
            that is passed to the gallery
         */

        const defaultOptions = {
            maxThumbnailWidth: 380,
            maxThumbnailHeight: 200,
            thumbnailRatio: '4:3',
            background: null
        }

        if (typeof options === 'undefined') {
            return defaultOptions;
        } else {

            /*
                When an option is left out,
                the default value is returned
                instead
             */

            const checkedMaxThumbnailWidth = 
                typeof options.maxThumbnailWidth === 'undefined' ? 380 : options.maxThumbnailWidth;
            
            const checkedMaxThumbnailHeight = 
                typeof options.maxThumbnailHeight === 'undefined' ? 200 : options.maxThumbnailHeight;

            const checkedBackground = 
                typeof options.background === 'undefined' ? null : options.background;

            const checkedRatio = 
                typeof options.thumbnailRatio === 'undefined' ? '4:3' : options.thumbnailRatio;
            
            return {
                maxThumbnailWidth: checkedMaxThumbnailWidth,
                maxThumbnailHeight: checkedMaxThumbnailHeight,
                thumbnailRatio: checkedRatio,
                background: checkedBackground
            }
        }
    }

    const parsedOptions = checkOptions(options);

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
    
    const constructGallery = selector => {
        return new Promise((resolve, reject) => {
            ReactDOM.render(
                <Provider store={ store }>
                    <GalleryContainer 
                        renderOverlay={ renderOverlay }
                        destroyOverlay={ destroyOverlay } 
                        resizeTheGallery={ resizeTheGallery }
                        { ...parsedOptions }
                    />
                </Provider>, 
                document.querySelector(selector)
            );
            resolve();
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
        createGallery: (images, querySelector) => {
            const rootContainerDimensions = document.querySelector(querySelector).getBoundingClientRect();
            const dimensions = { width: rootContainerDimensions.width, height: rootContainerDimensions.height };
            
            constructGalleryDimensions(dimensions)
                .then(checkForResize(dimensions))
                .then(constructGallery(querySelector))
                .then(appendInitialImages(images));
        },

        prependImage: path => {
            utils.getDimensions(path, dimensions => {
                const imgObject = { src: path, dimensions: dimensions }; 
                store.dispatch(prependImage(imgObject));
            })
        },

        appendImage: path => {
            utils.getDimensions(path, dimensions => {
                const imgObject = { src: path, dimensions: dimensions }; 
                store.dispatch(appendImage(imgObject));
            })
        }
    }
}

module.exports = reactiveGallery;