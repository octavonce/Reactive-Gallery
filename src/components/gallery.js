import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/gallery.css';
import helpers from '../utils/helpers.js';

export default class Gallery extends Component {
    propTypes: {
        renderOverlay: React.PropTypes.func.isRequired,
        closeOverlay: React.PropTypes.func.isRequired,
        images: React.PropTypes.Array
    }

    constructor(props) {
        super(props);

        this.state = {
            images: []
        };
    }

    componentWillMount() {
        
        /*
            Gets the dimensions of an image at a given url
            which are accessible inside the callback
         */

        function getDimensions(url, callback) {
            let img = new Image();
            img.src = url;
            img.onload = function() { callback({ width: this.width, height: this.height }); }
        }

        /* 
            Pushes an image inside the gallery

            Note: pass 'this' as an argument
            so we can manage the state inside the function
         */

        function pushImage(url, self) {
            getDimensions(url, dimensions => {
                const images = self.state.images;

                images.unshift({dimensions: dimensions, src: url});

                self.setState({
                    images: images
                })
            });
        }

        const images = [];

        /*
            Continuously pushes images inside an array
            and then triggers a state change with each new
            added image so we can re-render the gallery
         */

        for (const image of this.props.images) {
            getDimensions(image, dimensions => {
                images.push({dimensions: dimensions, src: image});

                this.setState({
                    images: images
                })
            });
        }
    }

    render() {
        const showOverlay = this.state.showOverlay;

        return (
            <div className={ !showOverlay ? styles.picContainer : styles.hidden }>
                {this.state.images.map((image, index) => {
                    const resizedImage = this.props.resizeImage(image, 380, 200);
                    
                    return (
                        <div key={ index } className={ !showOverlay ? styles.pic : styles.hidden }>
                            <img 
                                src={ image.src } 
                                closeOverlay={ this.props.closeOverlay }
                                onClick={ () => { this.props.renderOverlay(image) } }
                                { ...resizedImage.dimensions }
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}