import { useEffect } from "react";
import ChessAnimation from "./chessAnimation";
import { motion , useMotionValue, useTransform, useAnimate } from "framer-motion";

export default function NewLobby() {

    const [scope, animate] = useAnimate()
    const boardCol = [1,2,3,4,5,6]
    const boardRow = [1,2,3]

    const waitText = "Waiting for opponent to join"
    const wait = waitText.split(' ')
    const variants = {
      hidden: {
        opacity: 0,
        scale:0.8
      },
      visible: (custom) => ({
        opacity: 1,
        scale:1,
        // Use the custom value to modify the duration and delay
        transition: {
          duration: custom.duration,
          delay: custom.delay,
          repeat: Infinity,
          repeatType: "reverse"
        }
      })
    };
    
    const animateText =(i)=>({
      visible: {
          opacity: 1,
          // scale:1,
          y: 0,
          x:0,
          transition:{
          delay: 1+i*0.4,
          duration: 1,
          type: "spring",
          damping: 12,
          stiffness: 100,
          }
      },
      hidden: {
          opacity: 0,
          // scale:0.5,
          y: 20,
          transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          },
      }
  })

   return (
    <div ref={scope} className="h-full w-full bg-[#ffffff] flex flex-col items-center justify-center select-none ">
      <ChessAnimation/>
      <div className='absolute px-2 top-12 font-[Monoton] text-black text-[3rem] bg-white'>8 x 8</div>
      
      <div className="flex flex-col items-center justify-center w-max h-max">
      {
        boardRow.map((row, rowIndex) => {
          return(
            <>
              <div className="flex items-center justify-center">
                {
                  boardCol.map((item, colIndex) => {
                    return(
                      // Use the variants and custom props for each square
                      <motion.div 
                        id="circle" 
                        className={`h-[3.4rem] w-[3.4rem] ${item%2===0?'bg-[#F5F5F5] border ':'bg-black'}`}
                        variants={variants}
                        // Pass the row and column index as custom value
                        custom={{
                          duration: 3 - rowIndex, // Decrease the duration as the row index increases
                          delay: colIndex // Increase the delay as the column index increases
                        }}
                        initial="hidden"
                        animate="visible"
                      />
                    )
                  })
                }
              </div>
              <div className="flex items-center justify-center">
                {
                  boardCol.map((item, colIndex) => {
                    return(
                      // Use the variants and custom props for each square
                      <motion.div 
                        id="circle" 
                        className={`h-[3.4rem] w-[3.4rem] ${item%2!=0?'bg-white border':'bg-black'}`}
                        variants={variants}
                        // Pass the row and column index as custom value
                        custom={{
                          duration: 3 - rowIndex, // Decrease the duration as the row index increases
                          delay: colIndex // Increase the delay as the column index increases
                        }}
                        initial="hidden"
                        animate="visible"
                      />
                    )
                  })
                }
              </div>
              <div className="absolute px-2 bottom-16 flex flex-row items-center justify-center bg-white">
                {
                  wait.map((item, index)=>{
                    return(
                      <motion.span variants={animateText(index)} initial="hidden" animate="visible" className="mt-4 mr-2 font-[CenturyGothic] text-[1.6rem]">{item}</motion.span>
                    )
                  })
                }
                <motion.span variants={animateText(5)} initial="hidden" animate="visible" className={`-ml-2 dot-animation px-1 text-[50px]`}>
                    <span className={`animate-ping`} style={{ animationDelay: '0.5s' }}>.</span>
                    <span className={`animate-ping`} style={{ animationDelay: '0.9s' }}>.</span>
                    <span className={`animate-ping`} style={{ animationDelay: '0s' }}>.</span>
                </motion.span>
              </div>
            </>
          )
        })
      }
    </div>
    </div>
  );
}
