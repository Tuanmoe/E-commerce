import React, { useState,useEffect } from 'react'
import {client} from '../client'

import './Carousel.scss'
const Carousel = () => {
  const [isCarouselLoading,setIsCarouselLoading] =useState(false);
  const [carouselSlides,setCarouselSlides] = useState([]);
  const [currentSlide,setCurrentSlide] = useState(0);
  const delay=2500;

  const cleanUpFunction = (rawdata) => {
     const clearData=rawdata.map((slide)=>{
        const {fields,sys}=slide
        const {id}=sys
        const {image,subTitle,title}=fields
        const img=image.fields.file.url
        const updateSlide={id,img,subTitle,title}
        return updateSlide;
    })
    setCarouselSlides(clearData);
  }

  const getCarouselSlides= async () => {
    try {
      const reponse = await client.getEntries({content_type: 'banner'})
      const data=reponse.items;
      console.log(data)
      data? cleanUpFunction(data) : setCarouselSlides([])
      console.log(carouselSlides)
      
    } catch(err) {
      console.log(err)
    }
  }

  
  useEffect(()=>{
    getCarouselSlides();
  },[])

  useEffect(() => {
    setTimeout(()=>
      setCurrentSlide((prevSlide) => prevSlide===carouselSlides.length - 1 ? 0 : prevSlide + 1)
    ,delay); 
  },[currentSlide])
  return (
    <div className="Carousel">
        {carouselSlides.map((carouselSlide)=>{
           return (
            <div className='wrapper' style={{transform: `translate(${-currentSlide * 100}vw)`}}>
                 <img src={carouselSlide.img} alt='image'/>
                 <h1>{carouselSlide.title}</h1>
                 <p>{carouselSlide.subTitle}</p>
            </div>
           )
        })}
    </div>
  )
}

export default Carousel
