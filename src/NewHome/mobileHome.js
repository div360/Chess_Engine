import { IoIosArrowRoundForward  } from "react-icons/io";
import {motion, useInView, useAnimation} from 'framer-motion';


export default function MobileHome(){

    const fadeInAnimation=(i)=>({
        hidden:{opacity:0, 
            // scale:0.8,
            transformOrigin:"left"},
        visible:{
            opacity:1,
            // scale:1,
            transition:{
                duration:i,
                ease: "easeInOut"
            }
        }
    })

    const paletteAnimation={
        visible:{
            width:"max-content",
            opacity:1,
            transition: { duration: 1.5, ease: "circOut"}
        },
        hidden:{
            width:"0%",
            opacity:0,
        }
    }
    
    return(
        <div className="h-full w-full bg-black select-none">
            <div className="pt-6 min-h-[2rem] min-w-full flex flex-row">
                <div className="ml-4 p-1 px-2 text-white font-[CenturyGothic] border-2 text-sm border-white">Choose Your Theme</div>
                <motion.div variants={paletteAnimation} initial="hidden" animate="visible" className='mr-4 w-max overflow-hidden flex justify-center'>
                    <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center">
                        <motion.div whileHover={{scale:1.2}} className="ml-10 min-h-[1.5rem] max-h-[1.8rem] min-w-[5vw] bg-red-500 hover:border-2 hover:border-white"></motion.div>
                        <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[5.5vw] bg-yellow-500 hover:border-2 hover:border-white"></motion.div>
                        <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[6vw] bg-green-700 hover:border-2 hover:border-white"></motion.div>
                        <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[6.5vw] bg-blue-600 hover:border-2 hover:border-white"></motion.div>
                        <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[7vw] bg-violet-800 hover:border-2 hover:border-white"></motion.div>
                        <motion.div whileHover={{scale:1.2}} className="min-h-[1.5rem] max-h-[1.8rem] min-w-[7.5vw] bg-pink-500 hover:border-2 hover:border-white"></motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}