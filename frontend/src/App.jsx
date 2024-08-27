import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";
import { Route, Routes } from "react-router-dom";
import Admin from "./spotify-admin/src/Admin";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        {songsData.length !== 0 && (
          <Route
            path="*"
            element={
              <div className="h-screen bg-black">
                <div className="h-[90%] flex">
                  <Sidebar />
                  <Display />
                </div>
                <Player />
                <audio
                  ref={audioRef}
                  src={track ? track.file : ""}
                  preload="auto"
                ></audio>
              </div>
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
