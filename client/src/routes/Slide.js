import React from 'react'

export default function Slide({photo,active}) {
    return (
        <>
            <div className={`carousel-item sliderImg ${active}`}>
                <img src={photo} className="d-block w-100 sliderImg" alt="..." />
            </div>
        </>
    )
}
