import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const CATEGORY = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphics Designer",
    "Full Stack Developer"
]

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'>
        <CarouselContent>
          {
            CATEGORY.map((cat,index) =>
             ( <CarouselItem className="md:basis-1/2 lg:basis-1/3 basis-1/2">
                <Button variant='outline' className="rounded-full">
                  {cat}
                </Button>
              </CarouselItem>
              )
            )
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel