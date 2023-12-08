import { IoIosArrowRoundForward  } from "react-icons/io";

export default function ThemeButton({text}) {
    return(
        <div className='relative bg-black h-16 w-5/12'>
            <button className='z-10 absolute right-[0.7vw] bottom-[1.1vh] w-full border-[0.2rem] px-2 py-2 border-black text-lg font-bold flex flex-row justify-center items-center gap-4 bg-white'>{text}<IoIosArrowRoundForward  size={40}/> </button>
        </div>
    )
}