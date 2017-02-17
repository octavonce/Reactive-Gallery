const images = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_IMAGE': 
            return state.concat([action.image]);
        case 'PREPEND_IMAGE':
            return [action.image].concat(state);
        case 'REMOVE_IMAGE':
            const index = state.indexOf(action.image);

            if (index > -1) 
                return state.slice(index, 1);
            else 
                return state;
        default:
            return state;
    }
}

export default images;