import React from 'react'

const Footer: React.FC = () => {
  return (
    <div
      className="flex justify-between items-center 
    bg-orange-200 shadow-lg mt-5 px-4 py-2 sm:px-2"
    >
      <h1 className="font-bold text-2xl">CINEMA</h1>

      <div className="flex justify-around items-center py-4 px-6">
        <h1 className="px-2">Hội Viên</h1>
        <h1 className="px-2">Chính Sách</h1>
        <p className="px-2"> By Mdj</p>
      </div>
    </div>
  )
}

export default Footer
