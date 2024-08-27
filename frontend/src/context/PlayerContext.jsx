import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext({});

function PlayerContextProvider(props) {
  const audioRef = useRef(null);
  const seekBar = useRef(null);
  const seekBg = useRef(null);

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState(null);
  const [playerStatus, setPlayerStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  function play() {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayerStatus(true);
    }
  }

  function pause() {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayerStatus(false);
    }
  }

  const playWithId = async (id) => {
    for (const item of songsData) {
      if (id === item._id) {
        setTrack(item);
        break;
      }
    }
    if (audioRef.current) {
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const previous = async () => {
    for (let index = 0; index < songsData.length; index++) {
      if (track?._id === songsData[index]._id && index > 0) {
        setTrack(songsData[index - 1]);
        break;
      }
    }
    if (audioRef.current) {
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const next = async () => {
    for (let index = 0; index < songsData.length; index++) {
      if (track?._id === songsData[index]._id && index < songsData.length - 1) {
        setTrack(songsData[index + 1]);
        break;
      }
    }
    if (audioRef.current) {
      await audioRef.current.play();
      setPlayerStatus(true);
    }
  };

  const seekSong = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      console.log("Response Data:", response.data); // Log the entire response data
  
      if (response.data && Array.isArray(response.data.songs) && response.data.songs.length > 0) {
        setSongsData(response.data.songs);
        setTrack(response.data.songs[0]);
      } else {
        console.error("Songs data is not in expected format or is empty");
      }
    } catch (error) {
      console.error("Failed to fetch songs data", error);
    }
  };
  

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.album);
    } catch (error) {
      console.error("Failed to fetch albums data", error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current.duration) {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";
          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        }
      };
    }
  }, [audioRef.current]);

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playerStatus,
    setPlayerStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioRef} src={track?.url} />
    </PlayerContext.Provider>
  );
}

export default PlayerContextProvider;
