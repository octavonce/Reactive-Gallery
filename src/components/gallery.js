import React, { Component } from 'react';
import styles from '../assets/css/gallery.css';

export default class Gallery extends Component {
    render() {
        const images = this.props.images;

        return (
            <div className={styles.picContainer}>
                {Object.keys(images).map(key => {
                    return <div className={styles.pic}><img src={images[key].src}></img></div>
                })}
            </div>
        )
    }
}