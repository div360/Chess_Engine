import React, { createRef, useContext, useEffect, useState } from 'react'
import './videoCall.css'
import SimplePeer from 'simple-peer'
import socket from '../Socket/socket'
import { ChessContext, ChessUtilsContext } from '../Context/context'
import { PiPhoneCallFill } from 'react-icons/pi'
import { motion } from 'framer-motion'

export default function VideoCall({roomId, playerId}) {
    const connStatus = {
        STAGE : 'STAGE',
        OFFERING: 'OFFERING',
        RECEIVING: 'RECEIVING',
        ANSWERING: 'ANSWERING',
        CONNECTED: 'CONNECTED',
        STREAM : 'STREAM',
        FAILED: 'FAILED',
    }

    const {chessUtils, setChessUtils} = useContext(ChessUtilsContext)

    const senderId = playerId

    
    const {message} = useContext(ChessContext)
    
    const videoSelf = createRef(null)
    const videoOther = createRef(null)
    
    const [connectionStatus, setConnectionStatus] = useState(connStatus.STAGE)
    const [offer, setOffer] = useState(null)
    const [simplePeer, setSimplePeer] = useState(null)
    const [selfStream, setSelfStream] = useState(null)
    const [otherStream, setOtherStream] = useState(null)

    const [initiator, setInitiator] = useState(false)

    useEffect(()=>{
        if(chessUtils?.call === true && connectionStatus === connStatus.STAGE){
            sendInvitation()
        }
    }, [chessUtils?.call])

    useEffect(()=>{
        if(message?.code === 500){
            console.log(senderId, message?.senderId, message?.message?.data?.type)
            const payLoad = message?.message?.data 
            const type = message?.message?.type

            console.log(type, payLoad)
            if(type === 'offer'){
                setOffer(payLoad)
                if(senderId !== message?.senderId){
                    setConnectionStatus(connStatus.RECEIVING)
                    setChessUtils({...chessUtils, call:true})
                }
            }
            else if(type === 'answer'){
                if(senderId !== message?.senderId){
                    simplePeer?.signal(payLoad)
                }
            }
        }
    }, [simplePeer, message])


    useEffect(()=>{
        if(otherStream){
            videoOther.current.srcObject = otherStream
            videoOther.current.play()
        }
    }, [otherStream])

    useEffect(()=>{
        if(selfStream){
            videoSelf.current.srcObject = selfStream
            videoSelf.current.play()
        }
    }, [selfStream])

    const sendInvitation = () => {
        setInitiator(true)
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mediaStream)=>{

            setSelfStream(mediaStream)

            const sp = new SimplePeer({
                initiator: true,
                stream: mediaStream,
                trickle: false
            })

            setConnectionStatus(connStatus.OFFERING)

            sp.on('signal', (data)=>{
                setOffer(JSON.stringify(data))

                var dataToSend = {
                    code: 500,
                    messageId : "randomId",
                    roomId: roomId,
                    senderId: senderId,
                    videoMessage: {
                        data: data,
                        type: 'offer',
                    },
                    timestamp: new Date().getTime()
                }

                socket.send(`/app/videoChat/${roomId}`, dataToSend)
            })

            sp.on('connect', ()=>{
                setConnectionStatus(connStatus.CONNECTED)
            })

            sp.on('error', (err)=>{
                console.log(err)
                setConnectionStatus(connStatus.FAILED)
            })

            sp.on('stream', (stream)=>{
                setOtherStream(stream)
            })

            setSimplePeer(sp)
        })
    }

    const acceptInvitation = () => {
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mediaStream)=>{
        
            setSelfStream(mediaStream)

            const sp = new SimplePeer({
                initiator: false,
                stream: mediaStream,
                trickle: false
            })

            offer && sp.signal(offer)
            setConnectionStatus(connStatus.ANSWERING)

            sp.on('signal', (data)=>{
                var dataToSend = {
                    code: 500,
                    messageId : "randomId",
                    roomId: roomId,
                    senderId: senderId,
                    videoMessage: {
                        data: data,
                        type: 'answer',
                    },
                    timestamp: new Date().getTime()
                }
                socket.send(`/app/videoChat/${roomId}`, dataToSend)
            })

            sp.on('connect', ()=>{
                setConnectionStatus(connStatus.CONNECTED)
            })

            sp.on('error', (err)=>{
                console.log(err)
                setConnectionStatus(connStatus.FAILED)
            })

            sp.on('stream', (stream)=>{
                setConnectionStatus(connStatus.STREAM)
                setOtherStream(stream)
            })

            setSimplePeer(sp)
        })
    }


    const handleDragEnd = (event, info) => {
        if(info.offset.x > 250){
            acceptInvitation()
        }
    }
    
    return (
        <div className='flex flex-col items-center justify-center gap-4 h-[80%] w-[95%] mx-auto my-auto bg-white'>
            {
                ((connectionStatus === connStatus.STAGE || otherStream===null) && (initiator)) && <>
                    <PiPhoneCallFill className='animate-shake-2 text-black bg-white rounded-full h-[80px] w-[80px] p-3 ml-1'/>
                    <h1 className='text-black text-2xl font-bold font-[Athiti] tracking-wider'>
                        Calling
                        <span className="dot-animation px-1 text-[50px]">
                            <span className="animate-ping" style={{ animationDelay: '0.5s' }}>.</span>
                            <span className="animate-ping" style={{ animationDelay: '0.9s' }}>.</span>
                            <span className="animate-ping" style={{ animationDelay: '0s' }}>.</span>
                        </span>
                    </h1>
                </>
            }
            {
                connectionStatus === connStatus.RECEIVING && 
                <div className='flex flex-col items-center justify-center gap-8 w-full'>
                    <PiPhoneCallFill className='text-black text-[60px] animate-shake'/>
                    <motion.div className='overflow-hidden flex flex-row items-center justify-start w-[90%] bg-gradient-to-r from-white to-gray-400 h-16 rounded-full'>
                        <motion.div 
                            drag='x'
                            dragConstraints={{left:0, right:300}}
                            dragElastic={{left:0, right:0.1}}
                            dragDirectionLock
                            onDragEnd={handleDragEnd}
                        >
                            <PiPhoneCallFill className='animate-shake-2 text-[40px] text-green-500 bg-black rounded-full h-[60px] w-[60px] p-3 ml-1'/>
                        </motion.div>
                        <h1 className='text-slate-400 ml-24 text-xl font-semibold font-[CenturyGothic]'>Slide to answer..</h1>
                    </motion.div>                
                </div> 
            }

            
               
            <div className={`flex flex-row items-center justify-center w-[90%] h-[80%] gap-8 px-4 ${otherStream===null ? 'hidden':''}`}>
                <video className='h-full w-2/3 ring-4 ring-black object-cover' ref={videoOther} autoPlay></video>
                <video className='h-full w-1/3  ring-4 ring-black object-cover' ref={videoSelf} autoPlay muted={true}></video>
            </div>
            
        </div>
    )
}