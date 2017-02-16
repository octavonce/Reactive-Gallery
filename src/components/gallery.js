import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from '../assets/css/gallery.css';
import utils from '../lib/utils.js';

export default class Gallery extends Component {
    propTypes: {
        renderOverlay: React.PropTypes.func.isRequired,
        closeOverlay: React.PropTypes.func.isRequired,
        images: React.PropTypes.Array
    }

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            widths: []
        };
    }

    componentWillMount() {
        const images = [];
        const widths = [];
        
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
            Continuously pushes images inside an array
            and then triggers a state change with each new
            added image so we can re-render the gallery
         */

        for (const image of this.props.images) {
            getDimensions(image, dimensions => {
                images.push({dimensions: dimensions, src: image});
                widths.push(dimensions.width);

                this.setState({
                    images: images,
                    widths: widths
                })
            });
        }
    }

    render() {
        const showOverlay = this.state.showOverlay;
        const invisibleDivs = [];

        return (
            <div className={ !showOverlay ? styles.picContainer : styles.hidden }>
                {this.state.images.map((image, index) => {
                    const resizedImage = utils.resizeImage(image, 380, 200);

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