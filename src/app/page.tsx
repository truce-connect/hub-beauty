import React from 'react'
import TopBar from './Components/TopBar/page'
import Slider from './Components/Slider/page'

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <TopBar />
      <Slider />
      {/* Additional content will go here */}
    </div>
  )
}

export default page