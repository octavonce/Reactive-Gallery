const utils = {
    getRandomString: len => {
        return Array(len+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, len);
    },

    resizeImage: (image, maxWidth, maxHeight) => {

        /*
            We need to resize the images
            while keeping their aspect ratio
         */

        let height = image.dimensions.height;
        let width = image.dimensions.width;
        let ratio = height / width;

        if (width > maxWidth) {
            width = maxWidth;
            height = width / ratio;
        }

        if (height > maxHeight) {
            ratio = width / height;
            height = maxHeight;
            width = height / ratio;
        }

        return Object.assign({}, image, {
            dimensions: {
                height: height,
                width: width
            }
        });
    },

    getDimensions: (url, callback) => {
        let img = new Image();
        img.src = url;
        img.onload = function() { callback({ width: this.width, height: this.height }); }
    },

    getPercent: (percent, number) => {
        return percent / 100 * number;
    }
}


export default utils;