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
        resize: PropTypes.bool.isRequired
    };

    render() {
        const { images, showOverlay, shownImage, dimensions, resize } = this.props;

        console.log(this.props);

        return (
            <div style={dimensions}>
                <WindowResizeListener onResize={windowSize => {
                    if (resize) {
                        store.dispatch(resizeGallery({
                            width: windowSize.windowWidth - 16, 
                            height: windowSize.windowHeight 
                        }));
                    }
                }} />

                { showOverlay ? <Overlay image={ shownImage } /> : null }
                
                <Gallery 
                    galleryWidth={ dimensions.width }
                    images={ images } 
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        images: state.gallery.images,
        showOverlay: state.gallery.showOverlay,
        shownImage: state.gallery.shownImage,
        dimensions: state.gallery.dimensions,
        resize: state.gallery.resize
    }
}

const mapDispatchToProps = dispatch => ({
    appendImage: image => dispatch(image),
    prependImage: image => dispatch(image),
    resizeGallery: dimensions => dispatch(dimensions),
    toggleOverlay: (showOverlay, image) => dispatch(showOverlay, image),
    toggleResize: resize => dispatch(resize)
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);