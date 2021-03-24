import React from 'react'
import { ImgMediaCard } from './Card'

export const Album = ({images}) => {
    console.log("album images", images)
    return images.map(image => {
        return (
            <div>
                <ImgMediaCard image={image}/>
            </div>
        )
    })
}
