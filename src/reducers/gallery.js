const gallery = (state = {}, action) => {
    switch (action.type) {
        case 'APPEND_IMAGE': 
            return {
                id: action.id,
                image: action.image
            }
        case 'PREPEND_IMAGE':
            return {
                id: action.id,
                image: action.image
            }
        case 'REMOVE_IMAGE':
            return {
                id: action.id,
                image: action.image
            }
        case 'RESIZE_GALLERY':
            return {
                id: action.id,
                dimensions: action.dimensions
            }
        case 'TOGGLE_OVERLAY':
            return {
                id: action.id,
                showOverlay: action.showOverlay,
                shownImage: action.image
            }
        case 'TOGGLE_RESIZE':
            return {
                id: action.id,
                resize: action.resize
            }
    }
}

export default gallery;