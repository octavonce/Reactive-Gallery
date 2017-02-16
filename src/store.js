import { createStore } from 'redux';
import gallery from './reducers/gallery.js';

let store = createStore(gallery);

export default store;