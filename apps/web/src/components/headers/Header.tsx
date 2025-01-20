import React from 'react'
import { MdMovieCreation } from 'react-icons/md'
const Header: React.FC = () => {
  return (
    <div
      className="bg-orange-200 py-4 px-4
     flex justify-between items-center shadow-md md:py-2"
    >
      <div className="mx-5 flex items-center justify-center px-4">
        <MdMovieCreation style={{ fontSize: '42px' }} />
        <p className="mx-2 font-extrabold text-2xl md:text-2xl">CINEMA</p>
      </div>
      <div
        className="mx-5 flex justify-center items-center
       px-4 text-lg font-bold md:text-sm"
      >
        <p className="mx-2">Đăng Nhập</p>
        <p className="hidden mx-2 sm:block ">Thẻ Thành Viên</p>
        <p className="hidden mx-2 sm:block ">Hỗ Trợ Khách Hàng</p>
      </div>
    </div>
  )
}

export default Header
