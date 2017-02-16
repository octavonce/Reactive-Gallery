const gallery = (state = {}, action) => {
    switch (action.type) {
        case 'RESIZE_GALLERY':
            state.dimensions = action.dimensions;

            return state;
        case 'TOGGLE_OVERLAY':
            state.showOverlay = action.showOverlay;
            state.shownImage = action.image;

            return state;
        case 'TOGGLE_RESIZE':
            state.resize = action.resize;
            
            return state;
        default:
            return state;
    }
}

export default gallery;