import React, { Component } from 'react';
import styles from '../assets/css/gallery.css';
import helpers from '../utils/helpers.js';

export default class Gallery extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        images: []
      };
    }

    componentWillMount() {
        function getDimensions(url, callback) {
            var img = new Image();
            img.src = url;
            img.onload = function() { callback({ width: this.width, height: this.height }); }
        }

        function pushImage(url, state, self) {
            getDimensions(url, meta => {
                const images = state.images;

                images.unshift({dimensions: meta, src: url});

                self.setState({
                    images: images
                })
            });
        }

        const images = [];

        for (const image of this.props.images) {
            getDimensions(image, meta => {
                images.push({dimensions: meta, src:image});
                this.setState({
                    images: images
                })
            });
        }

        setInterval(() => {
            console.log('Pushed img');
            pushImage('https://static.pexels.com/photos/36487/above-adventure-aerial-air.jpg', this.state, this);
        }, 3000);
    }

    render() {
        return (
            <div className={styles.picContainer}>
                {this.state.images.map((image, index) => {
                    let height = image.dimensions.height;
                    let width = image.dimensions.width;

                    if (height > 250) height = 250;
                    if (width > 450) width = 450;

                    return <div key={index} className={styles.pic}><img height={height} width={width} src={image.src}/></div>
                })}
            </div>
        )
    }
}