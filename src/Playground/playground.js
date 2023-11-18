import React from 'react'
import Board from '../Board/board'

function Playground() {
    return (
        <div className='h-full w-full'>
            <Board isBlackBoardSet={false}/>
            <Board isBlackBoardSet={true}/>
        </div>
    )
}

export default Playground