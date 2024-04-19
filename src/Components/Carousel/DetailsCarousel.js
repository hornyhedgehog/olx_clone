import React from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';

export const DetailsCarousel = props => {
    return (
        <div className="carousel">
            <Carousel>
                {props.children}
            </Carousel>
        </div>
    );
}