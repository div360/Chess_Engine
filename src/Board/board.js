import React, { useState, useEffect } from "react";

function Board () {

    const board = Array(8)
        .fill()
        .map(() => Array(8).fill());

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

    return (
        <div className="flex justify-center items-center h-screen font-[Athiti] font-semibold bg-[#212121]">
            <div className="grid grid-cols-8 w-[40%] h-[80%] p-4">
                {board.map((row, rowIndex) =>
                    row.map((_, colIndex) => (

                        <div key={`${letters[colIndex]}${numbers[rowIndex]}`} 
                            className={`${(rowIndex + colIndex) % 2 === 0 ? "bg-[#dddddd] text-green-800" : "bg-green-800 text-[#dddddd]"} 
                            
                            ${colIndex === 0 && rowIndex !== 7 ? "pl-2 text-left" : ""} 
                            ${rowIndex === 7  && colIndex !== 0 ? "pr-2 text-right" : ""} 
                            ${rowIndex === 7 && colIndex === 0 ? "pl-2 text-left" : ""}
                            ` }
                            
                        >
                           
                            {`${colIndex === 0 ? numbers[rowIndex] : ""}${rowIndex === 7 ? letters[colIndex] : ""}`}
                        </div>

                    ))
                )}
            </div>
        </div>
    );
}

export default Board;
