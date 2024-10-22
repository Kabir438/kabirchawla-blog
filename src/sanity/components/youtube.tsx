import React from 'react';
import YouTube from 'react-youtube';

interface Props {
  title: string;
  media: string; // Expecting the YouTube video ID
}

export const YoutubeEmbed = ({ title, media }: Props) => {
  const videoId = media; // Assuming media is the YouTube video ID
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Change to 1 if you want it to autoplay
    },
  };

  return (
    <div>
      <h3>{title}</h3>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  )
    ;
};
