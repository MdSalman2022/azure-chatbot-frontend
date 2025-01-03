import React, { useState } from 'react'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'
import { motion } from 'framer-motion'
import { BsPlus } from 'react-icons/bs'

function Sidebar() {
  const chatHistory = ['Chat 1', 'Chat 2', 'Chat 3']
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? '0px' : '256px' }}
      initial={{ width: '256px' }}
      transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      style={{ minWidth: '70px' }}
      className={`bg-[#0d0e16] text-white h-screen p-4 flex flex-col items-start`}>
      <div className={`flex  items-center mb-4 w-full ${isSidebarCollapsed ? 'px-2' : 'justify-between'}`}>
        <div className={`text-xl font-bold text-[#FFC712] ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
          Lasallian AI
        </div>
        <span>
          {isSidebarCollapsed ? (
            <GoSidebarCollapse
              className="cursor-pointer text-2xl text-[#FFC712]"
              onClick={() => setIsSidebarCollapsed(false)}
            />
          ) : (
            <GoSidebarExpand
              className="cursor-pointer text-2xl text-[#FFC712]"
              onClick={() => setIsSidebarCollapsed(true)}
            />
          )}
        </span>
      </div>
      <button
        className={`bg-[#3259A8] text-[#ffffff] font-semibold ${isSidebarCollapsed ? 'px-0' : 'px-4'} py-2 rounded cursor-pointer mb-4 flex justify-center w-full `}>
        {isSidebarCollapsed ? <BsPlus className="text-2xl" /> : 'New Chat'}
      </button>
      <div className={`flex flex-col w-full gap-2 border-t border-gray-400 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
        <p className="text-sm px-2 text-gray-400 font-semibold pt-2 select-none">Chat History</p>
        <ul className="list-none p-0 m-0 flex-1">
          {chatHistory.map((chat, index) => (
            <li key={index} className="py-2 cursor-pointer hover:bg-[#f5f5f510] px-2 rounded-lg text-sm">
              {chat}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  )
}

export default Sidebar
