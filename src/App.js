import React from "react";
import VideoPlayerWithChapters from "../src/components/VideoPlayerWithChapters";

const videoData = {
  hlsPlaylistUrl: "http://localhost:3000/master.m3u8",
  videoLength: 107,
  chapters: [
    { title: "FIRST", start: 0, end: 30 },
    { title: "SECOND", start: 31, end: 62 },
    { title: "THIRD", start: 63, end: 95 },
    { title: "FOUR", start: 96, end: 130 },
  ],
};
function App() {
  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1rem" }}>
      <VideoPlayerWithChapters data={videoData} />
    </div>

  );
}

export default App;

