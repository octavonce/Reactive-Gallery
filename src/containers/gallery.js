import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gallery from '../components/gallery.js';
import styles from '../assets/css/gallery.css';
import { WindowResizeListener } from 'react-window-resize-listener';
import Overlay from '../components/overlay.js';
import store from '../store.js';
import { 
    appendImage, 
    prependImage, 
    resizeGallery, 
    toggleOverlay,
    toggleResize } from '../actions/gallery.js';

class GalleryContainer extends Component {
    static propTypes: {
        images: PropTypes.array.isRequired,
        showOverlay: PropTypes.bool.isRequired,
        shownImage: PropTypes.string.isRequired,
        dimensions: PropTypes.object.isRequired,
        resize: PropTypes.bool.isRequired,
        renderOverlay: PropTypes.func.isRequired,
        destroyOverlay: PropTypes.func.isRequired
    };

    render() {
        const { 
            images, 
            background,
            shownImage, 
            showOverlay, 
            dimensions, 
            resize, 
            resizeTheGallery,
            renderOverlay,
            destroyOverlay,
            maxThumbnailWidth,
            maxThumbnailHeight } = this.props;

        const styleObject = !!background ? {
            width: dimensions.width,
            height: dimensions.height,
            backgroundImage: 'url(' + background + ')',
            backgroundSize: 'cover'
        } : dimensions;

        return (
            <div className={ styles.containerDiv } style={ styleObject }>
                <WindowResizeListener onResize={windowSize => {
                    if (resize) resizeTheGallery(windowSize);
                }} />

                { showOverlay ? <Overlay image={ shownImage } destroyOverlay={ destroyOverlay } /> : null }
                
                <Gallery 
                    galleryWidth={ dimensions.width }
                    images={ images } 
                    showOverlay={ showOverlay }
                    renderOverlay={ renderOverlay }
                    maxThumbnailWidth={ maxThumbnailWidth }
                    maxThumbnailHeight={ maxThumbnailHeight }
                    background={ background }
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        images: state.images,
        showOverlay: state.gallery.options.showOverlay,
        shownImage: state.gallery.options.shownImage,
        resize: state.gallery.options.resize,
        dimensions: state.gallery.dimensions
    }
}

const mapDispatchToProps = dispatch => ({
    appendImage: image => dispatch(image),
    prependImage: image => dispatch(image),
    resizeGallery: dimensions => dispatch(dimensions),
    toggleOverlay: overlay => dispatch(overlay),
    toggleResize: resize => dispatch(resize)
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);