import { IoIosArrowRoundForward  } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ThemeButton({redirect, text}) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(redirect)
    }

    return(
        <div onClick={handleClick} className='relative bg-black h-16 w-5/12'>
            <button className='z-10 absolute right-[0.7vw] bottom-[1.1vh] w-full border-[0.2rem] px-2 py-2 border-black text-lg font-bold flex flex-row justify-center items-center gap-4 bg-white'>{text}<IoIosArrowRoundForward  size={40}/> </button>
        </div>
    )
}