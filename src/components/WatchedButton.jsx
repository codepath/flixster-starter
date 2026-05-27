import React, { useState } from "react";

function WatchedButton({ handleWatchButton, movieId }) {
  const [emoji, setEmoji] = useState('☑️');
  const handleClick = (event) => {
    event.stopPropagation();
    setEmoji(emoji === '☑️' ? '✅' : '☑️');
    handleWatchButton(movieId);
  };
  return (
    <button className='watchedButton' onClick={handleClick}>
      {emoji}
    </button>
  );
}

export default WatchedButton;