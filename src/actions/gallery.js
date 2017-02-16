export const appendImage = image => {
    return {
        type: 'APPEND_IMAGE',
        image: image
    }
}

export const prependImage = image => {
    return {
        type: 'PREPEND_IMAGE',
        image: image
    }
}

export const resizeGallery = dimensions => {
    return {
        type: 'RESIZE_GALLERY',
        dimensions: dimensions
    }
}

export const toggleOverlay = (showOverlay, shownImage) => {
    return {
        type: 'TOGGLE_OVERLAY',
        shownImage: shownImage,
        showOverlay: showOverlay
    }
}

export const toggleResize = resize => {
    return {
        type: 'TOGGLE_RESIZE',
        resize: resize
    }
}