
import ThemeButton from '../Button/themebutton'

export default function NewHome() {
    return (
        <div className="h-screen grid grid-cols-12">
            <div className="bg-black w-full col-span-6">
                <div className="mt-6 min-h-[2rem] min-w-full flex flex-row">
                    <button className="ml-16 py-1 px-4 flex flex-col justify-center items-center border-[0.1rem] border-white font-century-gothic text-sm text-white hover:border-black hover:text-black hover:bg-white">Choose your theme</button>
                        <div className="min-h-[1.5rem] max-h-[1.8rem] flex flex-row justify-center items-center">
                            <div className="ml-10 min-h-[1.5rem] max-h-[1.8rem] min-w-[2vw] bg-red-500 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[2.5vw] bg-yellow-500 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3vw] bg-green-700 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[3.5vw] bg-blue-600 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4vw] bg-violet-800 hover:border-4 hover:border-white"></div>
                            <div className="min-h-[1.5rem] max-h-[1.8rem] min-w-[4.5vw] bg-pink-500 hover:border-4 hover:border-white"></div>
                        </div>
                </div>
                <div className='ml-16 mt-10 min-w-full'>
                    <div id='title' className='ml-2 text-[4.5rem] text-white font-[Holtwood]'>8 x 8</div>
                    <div className='min-w-[20vw] max-w-[40vw]'>
                        <div id='title2' className='-mt-4 text-[6rem] text-white tracking-wide font-[Monoton]'>CHESS</div>
                        <div className='mt-2 text-white font-century-gothic'>8X8 is your one stop solution for AI based Chess engine with loaded features like video calls, timers, move history and much more ...</div>
                    </div>
                    <div className='mt-10 font-century-gothic text-white text-4xl'>Play. Now.</div>
                    <img src=" ./chesspieceline.svg" className='ml-2 mt-16 h-28' />
                </div>
            </div>
            <div className="bg-white col-span-6">
                <div className='mt-8 min-w-full flex flex-col justify-center items-center'>
                    <div className='min-w-[5vw] grid grid-cols-5 gap-4'>
                        <div className='text-3xl font-century-gothic font-bold'>F</div>
                        <div className='text-3xl font-century-gothic font-bold'>I</div>
                        <div className='text-3xl font-century-gothic font-bold'>R</div>
                        <div className='text-3xl font-century-gothic font-bold'>S</div>
                        <div className='text-3xl font-century-gothic font-bold'>T</div>
                    </div>
                        <div className='text-5xl font-century-gothic font-bold tracking-widest'>MOVE</div>
                    <img src="./chessfront.svg" className='mt-10 h-52 mb-24' />
                    <div className='w-full flex flex-col justify-center items-center gap-16'>
                        <ThemeButton text={"Play with Friends"}/>
                        <ThemeButton text={"Play with Computer"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}