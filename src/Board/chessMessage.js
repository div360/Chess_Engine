import React from 'react'

const breakMessage = (message) => {
  const words = message.split(' ');
  const maxLength = 31;

  let lines = [];
  let currentLine = '';

  words.forEach((word) => {
    if (currentLine.length + word.length <= maxLength) {
      currentLine += word + ' ';
    } else {
      if (word.length > maxLength) {
        while (word.length > 0) {
          const part = word.slice(0, maxLength - 1) + '-';
          lines.push(currentLine.trim());
          currentLine = part;
          word = word.slice(maxLength - 1);
        }
      } else {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      }
    }
  });

  if (currentLine.trim() !== '') {
    lines.push(currentLine.trim());
  }

  const joinedLines = lines.join('\n');
  return joinedLines;
}


const ChessLeftMessage = ({ message }) => {
  return (
    <div className={`text-white px-4 py-2 h-max w-full flex justify-start font-semibold`}>
      <h1 className='max-w-[60%] text-left w-max bg-black px-2 py-2 rounded-lg rounded-bl-none overflow-x-hidden'>
        {breakMessage(message)}
      </h1>
    </div>
  )
}

const ChessRightMessage = ({ message }) => {
  return (
    <div className={`text-black px-4 py-2 h-max w-full flex justify-end font-semibold`}>
      <h1 className='max-w-[60%] text-left w-max bg-slate-300 px-2 py-2 rounded-lg rounded-br-none overflow-x-hidden'>
        {breakMessage(message)}
      </h1>
    </div>
  )
}

export { ChessLeftMessage, ChessRightMessage }