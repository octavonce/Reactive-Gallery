import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

const images = [
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/200/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/500/300/',
    'http://lorempixel.com/1200/800/',
    'http://lorempixel.com/900/400/',
    'http://lorempixel.com/1920/1080/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/400/400/',
    'http://lorempixel.com/4280/2100/'
]

const sameSizeImages = [
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/',
    'http://lorempixel.com/800/600/'
]

const containerId = 'reactive-gallery';

ReactDOM.render(<Root images={sameSizeImages} containerId={containerId} />, document.getElementById(containerId));
