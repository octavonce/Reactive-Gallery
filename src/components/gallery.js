import React, { Component } from 'react';
import styles from '../assets/css/gallery.css';
import helpers from '../utils/helpers.js';

export default class Gallery extends Component {
    render() {
        const images = this.props.images;

        return (
            <div className={styles.picContainer}>
                {images.map(src => {
                    return <div key={helpers.getRandomString(5)} className={styles.pic}><img src={src}/></div>
                })}
            </div>
        )
    }
}