import React from 'react'
import Navbar from '../components/Navbar'

import Banner1 from '../assets/images/banner-1.jpg';
import Banner2 from '../assets/images/banner-2.jpg';
import Banner3 from '../assets/images/banner-3.jpg';
import Banner4 from '../assets/images/banner-4.jpg';
import Banner5 from '../assets/images/banner-5.jpg';

import Slide from './Slide';
export default function Home() {
    return (
        <>
            <Navbar title="Home" />
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                </div>
                <div className="carousel-inner">
                    <Slide photo={Banner1} active='active' />
                    <Slide photo={Banner2} active='' />
                    <Slide photo={Banner3} active='' />
                    <Slide photo={Banner4} active='' />
                    <Slide photo={Banner5} active='' />
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <div className="container">

            </div>
        </>
    )
}
