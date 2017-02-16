const images = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_IMAGE': 
            state.push(action.image);
            
            return state;
        case 'PREPEND_IMAGE':
            state.unshift(action.image);

            return state;
        case 'REMOVE_IMAGE':
            const index = state.indexOf(action.image);
            if (index > -1) state.splice(index, 1);

            return state;
        default:
            return state;
    }
}

export default images;