import { workExperience } from '@/constants'
import React from 'react'
import { Button } from './shared/MovingBorder'

const Experience = () => {
  return (

    <div className="max-w-full mt-12 grid lg:grid-cols-6 md:grid-cols-4 grid-cols-1 gap-5">
      {workExperience.map((card) => (
        <Button
          key={card.id}
          duration={Math.floor(Math.random() * 10000) + 10000}
          borderRadius="1.75rem"
          className="flex-1 text-black border-white-300 bg-white"
        >
          <div className="relative flex flex-row lg:items-center p-3 md:p-5 lg:p-10 py-6 gap-2">
            <img
              src={card.thumbnail} alt={card.thumbnail}
              className="lg:w-32 md:w-24 w-20"
            />
            <div className="lg:ms-5">
              <h3 className="text-start text-xl md:2xl font-bold">
                {card.title}
              </h3>
              <p className="text-start text-black-100 mt-3 font-semibold">
                {card.desc}
              </p>
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}

export default Experience