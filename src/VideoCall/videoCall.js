import React, { createRef, useContext, useEffect, useState } from 'react'
import SimplePeer from 'simple-peer'
import socket from '../Socket/socket'
import { ChessContext } from '../Context/context'
import { useLocation } from 'react-router-dom'

export default function VideoCall() {
    const connStatus = {
        STAGE : 'STAGE',
        OFFERING: 'OFFERING',
        RECEIVING: 'RECEIVING',
        ANSWERING: 'ANSWERING',
        CONNECTED: 'CONNECTED',
        FAILED: 'FAILED',
    }

    const location = useLocation();


    const roomId = location?.state?.roomId === undefined ? "" : location.state.roomId;
    const senderId = location?.state?.playerId === undefined ? "" : location.state.playerId;

    
    const {message} = useContext(ChessContext)
    
    const videoSelf = createRef(null)
    const videoOther = createRef(null)
    
    const [connectionStatus, setConnectionStatus] = useState(connStatus.STAGE)
    const [offer, setOffer] = useState(null)
    const [simplePeer, setSimplePeer] = useState(null)
    const [otherStream, setOtherStream] = useState(null)

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

    const sendInvitation = () => {
        navigator.mediaDevices.getUserMedia({audio:true, video:true}).then((mediaStream)=>{
            const video = videoSelf.current
            video.srcObject = mediaStream
            video.muted = true
            video.play()

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
            const video = videoSelf.current
            video.srcObject = mediaStream
            video.muted = true
            video.play()

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
                setOtherStream(stream)
            })

            setSimplePeer(sp)
        })
    }

    
    return (
        <div className='bg-white h-full w-full flex flex-col items-center justify-center'>
           <button className='bg-blue-500 text-white px-9 py-8 text-xl rounded-xl' onClick={sendInvitation}>Call</button>
        

            {
                connectionStatus === connStatus.OFFERING && 
                <div>
                    <p>Offering...</p>
                    {/* <p>{offer}</p> */}
                </div>
            }

            {
                connectionStatus === connStatus.RECEIVING && 
                <div>
                    <p>Receiving...</p>
                    <button className='bg-blue-500 text-white px-9 py-8 text-xl rounded-xl' onClick={acceptInvitation}>Answer Call</button>
                </div> 
            }

            <div>
                <video className='h-48 w-48 border-2' ref={videoSelf} autoPlay muted={true}></video>
                <video className='h-48 w-48 border-2' ref={videoOther} autoPlay></video>
            </div>
        </div>
    )
}