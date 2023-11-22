import React from 'react'
import { useLocation } from 'react-router-dom'
import Board from '../Board/board'

function Playground() {
    const location = useLocation()

    const isWhite = location?.state?.isWhite === undefined ? false : true
    const isCreator = location?.state?.isCreator === undefined ? false : true
    const isBlackBoard = location?.state?.isBlackBoard === undefined ? true : false

    return (
        <div className='h-full w-full'>
            
            <Board isBlackBoardSet={isBlackBoard} isWhite={isWhite}/>
    
        </div>
    )
}

export default Playground