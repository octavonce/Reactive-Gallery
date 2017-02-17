const defaultState = {
    dimensions: {
        width: null,
        height: null
    },
    options: {
        showOverlay: false, 
        shownImage: null,
        resize: null
    }
}

const gallery = (state = defaultState, action) => {
    switch (action.type) {
        case 'RESIZE_GALLERY':
            return Object.assign({}, state, {
                dimensions: action.dimensions
            })
        case 'TOGGLE_OVERLAY':
            return Object.assign({}, state, {
                options: {
                    showOverlay: action.overlay.showOverlay,
                    shownImage: action.overlay.shownImage
                }
            })
        case 'TOGGLE_RESIZE':
            return Object.assign({}, state, {
                options: {
                    resize: action.resize
                }
            })
        default:
            return state;
    }
}

export default gallery;