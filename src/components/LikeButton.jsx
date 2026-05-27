import React, { useState } from "react";

function LikeButton({ handleLikeButton, movieId }) {
  const [emoji, setEmoji] = useState('🖤');
  const handleClick = (event) => {
    event.stopPropagation();
    setEmoji(emoji === '🖤' ? '💖' : '🖤');
    handleLikeButton(movieId);
  };
  return (
    <button className='likeButton' onClick={handleClick}>
      {emoji}
    </button>
  );
}

export default LikeButton;