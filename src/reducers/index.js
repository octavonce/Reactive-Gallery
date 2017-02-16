import { combineReducers } from 'redux';
import gallery from './gallery.js';
import images from './images.js';

export default combineReducers({ gallery, images });