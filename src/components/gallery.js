import React, { Component } from 'react';

export default class Gallery extends Component {
    render() {
        const images = this.props.images;

        return (
            <div>
                {Object.keys(images).map(key => {
                    return <img src={images[key].src}></img>
                })}
            </div>
        )
    }
}