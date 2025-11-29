'use client';

import React, { useContext, useState } from 'react';
import { assets } from '@/assets/assets';
import { Context } from '@/context/Context';
import Image from 'next/image';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const context = useContext(Context);
  
  if (!context) {
    throw new Error('Sidebar must be used within ContextProvider');
  }

  const { onSent, prevPrompts, setRecentPrompt, newChat } = context;

  const loadPrompt = async (prompt: string) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <aside
      className={`min-h-screen inline-flex flex-col justify-between bg-[#f0f4f9] p-[25px_15px] transition-[width_0.15s_ease,padding_0.3s_ease] z-[999] select-none ${
        extended ? 'w-[250px]' : 'w-[80px]'
      } md:relative fixed`}
    >
      <div className={`flex flex-col gap-2 ${extended ? '' : 'items-center'}`}>
        <div
          className="w-[50px] h-[50px] grid place-items-center cursor-pointer rounded-full hover:bg-[#e8eaed]"
          onClick={() => setExtended((prev) => !prev)}
        >
          <Image src={assets.menu_icon} alt="Menu Icon" width={20} height={20} />
        </div>
        <div
          onClick={() => newChat()}
          className="mt-[50px] inline-flex items-center gap-[10px] p-[10px_15px] bg-[#e6eaf1] rounded-[50px] text-[14px] text-[#505050] cursor-pointer justify-center w-max hover:bg-[#e0e0e5]"
        >
          <Image src={assets.plus_icon} alt="Plus Icon" width={20} height={20} />
          <p className={`transition-opacity duration-1000 ${extended ? 'block opacity-100 whitespace-nowrap' : 'hidden opacity-0'}`}>
            New Chat
          </p>
        </div>
        {extended ? (
          <div className="max-h-[300px] overflow-y-auto">
            <p className="mt-10 mb-5">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="flex justify-start items-start gap-[10px] p-[10px] rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]"
                >
                  <Image src={assets.message_icon} alt="" width={20} height={20} />
                  <p className="whitespace-nowrap overflow-hidden">{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className={`flex flex-col gap-2 ${extended ? '' : 'items-center'}`}>
        <div className="flex justify-start items-start gap-[10px] p-[10px] rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <Image src={assets.question_icon} alt="Question Icon" width={20} height={20} />
          <p className={`transition-opacity duration-1000 ${extended ? 'block opacity-100 whitespace-nowrap' : 'hidden opacity-0'}`}>
            Help
          </p>
        </div>
        <div className="flex justify-start items-start gap-[10px] p-[10px] rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <Image src={assets.history_icon} alt="History Icon" width={20} height={20} />
          <p className={`transition-opacity duration-1000 ${extended ? 'block opacity-100 whitespace-nowrap' : 'hidden opacity-0'}`}>
            Activity
          </p>
        </div>
        <div className="flex justify-start items-start gap-[10px] p-[10px] rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
          <Image src={assets.setting_icon} alt="Settings Icon" width={20} height={20} />
          <p className={`transition-opacity duration-1000 ${extended ? 'block opacity-100 whitespace-nowrap' : 'hidden opacity-0'}`}>
            Settings
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

