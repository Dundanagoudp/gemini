'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from "@/assets/assets";
import { Context } from "@/context/Context";
import Image from 'next/image';

const Main = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('Main must be used within ContextProvider');
  }

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, conversationHistory } = context;
  const resultRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const updateRows = () => {
      if (window.innerWidth <= 600) {
        setRows(2);
      } else {
        setRows(1);
      }
    };

    updateRows();
    window.addEventListener('resize', updateRows);
    return () => window.removeEventListener('resize', updateRows);
  }, []);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
    
    // Handle broken images
    const handleImageError = (e: Event) => {
      const img = e.target as HTMLImageElement;
      if (img && img.tagName === 'IMG') {
        img.style.display = 'none';
      }
    };
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', handleImageError);
    });
    
    return () => {
      images.forEach(img => {
        img.removeEventListener('error', handleImageError);
      });
    };
  }, [resultData, conversationHistory]);

  return (
    <main className="flex-1 max-h-screen relative overflow-y-auto">
      <nav className="flex items-center justify-between text-[22px] p-5 text-[#585858]">
        <p>Gemini</p>
        <Image src={assets.user_icon} alt="User" width={40} height={40} className="rounded-full" />
      </nav>
      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="text-4xl md:text-[56px] text-[#c4c7c5] font-medium p-5 flex flex-col items-center justify-center text-center">
              <div className="mb-8">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-[250px] md:w-[350px] lg:w-[400px] h-auto rounded-lg"
                >
                  <source src={assets.gemini_gif} type="video/mp4" />
                </video>
              </div>
              <p>
                <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Dev
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] p-5 overflow-x-auto mb-40 scrollbar-hide">
              <div
                className="h-[200px] min-w-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}
              >
                <p className="text-[#585858] text-[17px]">Suggest beautiful places to see on an upcoming road trip</p>
                <Image
                  src={assets.compass_icon}
                  alt=""
                  width={35}
                  height={35}
                  className="absolute bottom-[10px] right-[10px] p-[5px] bg-white rounded-[20px]"
                />
              </div>
              <div
                className="h-[200px] min-w-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() => setInput("Briefly summarize this concept: urban planning")}
              >
                <p className="text-[#585858] text-[17px]">Briefly summarize this concept: urban planning</p>
                <Image
                  src={assets.bulb_icon}
                  alt=""
                  width={35}
                  height={35}
                  className="absolute bottom-[10px] right-[10px] p-[5px] bg-white rounded-[20px]"
                />
              </div>
              <div
                className="h-[200px] min-w-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}
              >
                <p className="text-[#585858] text-[17px]">Brainstorm team bonding activities for our work retreat</p>
                <Image
                  src={assets.message_icon}
                  alt=""
                  width={35}
                  height={35}
                  className="absolute bottom-[10px] right-[10px] p-[5px] bg-white rounded-[20px]"
                />
              </div>
              <div
                className="h-[200px] min-w-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea]"
                onClick={() => setInput("Tell me about React js and React native")}
              >
                <p className="text-[#585858] text-[17px]">Tell me about React js and React native</p>
                <Image
                  src={assets.code_icon}
                  alt=""
                  width={35}
                  height={35}
                  className="absolute bottom-[10px] right-[10px] p-[5px] bg-white rounded-[20px]"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="px-[5%] py-0 max-h-[70vh] overflow-y-scroll scrollbar-hide" ref={resultRef}>
            {/* Display conversation history */}
            {conversationHistory.map((message, index) => (
              <React.Fragment key={index}>
                {/* User message - right side (text only, no profile image) */}
                <div className="my-10 flex justify-end">
                  <div className="bg-[#e8eaed] rounded-[18px] rounded-tr-[4px] px-4 py-2 max-w-[70%]">
                    <p className="break-all text-[#202124]">{message.prompt}</p>
                  </div>
                </div>
                {/* AI response - left side */}
                <div className="flex items-start gap-3 mb-10">
                  <Image
                    className="hidden md:block flex-shrink-0"
                    src={assets.gemini_icon}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <div
                    className="text-[17px] font-light leading-[1.8] [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-2 [&_img]:block [&_img]:shadow-md"
                    dangerouslySetInnerHTML={{ __html: message.response }}
                  />
                </div>
              </React.Fragment>
            ))}
            
            {/* Current message being typed/loading - only show if not already in history */}
            {recentPrompt && 
             (conversationHistory.length === 0 || 
              conversationHistory[conversationHistory.length - 1].prompt !== recentPrompt) && (
              <>
                {/* Current user prompt - text only, no profile image */}
                <div className="my-10 flex justify-end">
                  <div className="bg-[#e8eaed] rounded-[18px] rounded-tr-[4px] px-4 py-2 max-w-[70%]">
                    <p className="break-all text-[#202124]">{recentPrompt}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-[10vh]">
                  {loading ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-[40px] h-[40px] flex-shrink-0 hidden md:block"
                    >
                      <source src={assets.gemini_gif} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      className="hidden md:block flex-shrink-0"
                      src={assets.gemini_icon}
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}
                  {loading ? (
                    <div className="w-full flex flex-col gap-[10px]">
                      <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader" />
                      <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader" />
                      <hr className="rounded-[4px] border-none bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] bg-[length:800px_50px] h-5 animate-loader" />
                    </div>
                  ) : resultData ? (
                    <div
                      className="text-[17px] font-light leading-[1.8] [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-2 [&_img]:block [&_img]:shadow-md"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    />
                  ) : null}
                </div>
              </>
            )}
          </div>
        )}
        <div className="fixed bottom-0 py-[10px] px-5 mx-auto bg-white shadow-[#ffffff_0_-20px_50px] w-full max-w-[900px]">
          <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] p-2 px-5 rounded-[50px] md:flex-row flex-col md:items-center items-start md:rounded-[50px] rounded-[15px]">
            <textarea
              rows={rows}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onSent();
                }
              }}
              value={input}
              placeholder="Enter a prompt here"
              className="flex-1 bg-transparent border-none outline-none px-2 text-[18px] py-[0.85rem] resize-none w-full md:p-0 p-[15px_10px] scrollbar-hide"
            />
            <div className="flex items-center md:gap-[10px] gap-[5px] md:ml-0 ml-auto">
              <button className="p-[10px] bg-none border-none outline-none rounded-full cursor-pointer grid place-items-center hover:bg-[#e8eaed]">
                <Image src={assets.gallery_icon} alt="" width={24} height={24} className="cursor-pointer" />
              </button>
              <button className="p-[10px] bg-none border-none outline-none rounded-full cursor-pointer grid place-items-center hover:bg-[#e8eaed]">
                <Image src={assets.mic_icon} alt="" width={24} height={24} className="cursor-pointer" />
              </button>
              <button
                type="submit"
                onClick={() => onSent()}
                className="p-[10px] bg-none border-none outline-none rounded-full cursor-pointer grid place-items-center hover:bg-[#e8eaed]"
              >
                <Image src={assets.send_icon} alt="" width={24} height={24} className="cursor-pointer" />
              </button>
            </div>
          </div>
          <p className="text-[13px] my-4 mx-auto text-center font-light">
            Gemini may display inaccurate info, including about people, so double-check its responses.
            <a href="#" className="text-[#585858]">Your privacy and Gemini Apps</a>
          </p>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
};

export default Main;

