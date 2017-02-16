let nextImageId = 0;

export const appendImage = image => {
    return {
        type: 'APPEND_IMAGE',
        id: nextImageId++,
        image: image
    }
}

export const prependImage = image => {
    return {
        type: 'PREPEND_IMAGE',
        id: nextImageId++,
        image: image
    }
}

export const resizeGallery = dimensions => {
    return {
        type: 'RESIZE_GALLERY',
        dimensions: dimensions
    }
}

export const toggleOverlay = (showOverlay, image) => {
    return {
        type: 'TOGGLE_OVERLAY',
        shownImage: image,
        showOverlay: showOverlay
    }
}

export const toggleResize = resize => {
    return {
        type: 'TOGGLE_RESIZE',
        resize: resize
    }
}