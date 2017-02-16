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
            Pushes an image inside the gallery

            Note: pass 'this' as an argument
            so we can manage the state inside the function
         */

        function pushImage(url, self) {
            getDimensions(url, dimensions => {
                const images = self.state.images;

                images.unshift({dimensions: dimensions, src: url});
                widths.push(dimensions.width);

                self.setState({
                    images: images,
                    widths: widths
                })
            });
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
        const medianWidth = this.calculateMedianWidth(this.state.widths);
        const invisibleDivs = [];

        /*
            It seems for loops are not
            allowed in those curly brackets
            thingies   
         */

        for (let i = 0; i < 10; i++) {
            invisibleDivs.push(null);
        }

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

                {invisibleDivs.map((div, index) => {
                    return <div key={ index } className={ styles.invisible } style={ medianWidth }></div>;
                })}
            </div>
        )
    }

    calculateMedianWidth(widths) {
        if (widths.length > 0) {
            let totalWidth = 0;

            widths.forEach(width => {
                totalWidth += width;
            });

            const medianWidth = totalWidth / widths.length;

            // TODO: Calculate the offset
            // and set it accordingly

            const widthOffSet = 44;

            return { width: medianWidth + widthOffSet } 
        } else {
            return { width: 0 }
        }
    }
}