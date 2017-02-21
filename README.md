# Setup

First, install nodemon globally:    
`$ npm install -g nodemon`   

Then, install the dependencies:    
`$ npm install`

Start the server:       
`$ npm start`

# Usage     
```javascript
const options = {
    maxThumbnailWidth: 380,
    maxThumbnailHeight: 200,
    thumbnailRatio: '4:3',
    background: '/some/background/path'
}

gallery = reactiveGallery(options);

const images = [
    'path1',
    'path2',
    'path3'
]

// Create the gallery
gallery.createGallery(images, '#container');

// Prepend image
gallery.prependImage(imagePath);

// Append image
gallery.appendImage(imagePath);
```
