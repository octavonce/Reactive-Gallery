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
    render() {
        const { images, showOverlay, shownImage, dimensions, resize } = this.props;

        return (
            <div style={dimensions}>
                <WindowResizeListener onResize={windowSize => {
                    if (resize) {
                        store.dispatch(resizeGallery({
                            width: windowSize.windowWidth - 16, 
                            height: windowSize.windowHeight 
                        }));
                    }
                }}/>

                { showOverlay ? <Overlay image={ shownImage }/> : null }
                
                <Gallery 
                    galleryWidth={ dimensions.width }
                    images={ images } 
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    images: state.images,
    showOverlay: state.showOverlay,
    shownImage: state.shownImage,
    dimensions: state.dimensions,
    resize: state.resize
})


const mapDispatchToProps = dispatch => ({
    appendImage: image => dispatch(image),
    prependImage: image => dispatch(image),
    resizeGallery: dimensions => dispatch(dimensions),
    toggleOverlay: (showOverlay, image) => dispatch(showOverlay, image),
    toggleResize: resize => dispatch(resize)
})

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);