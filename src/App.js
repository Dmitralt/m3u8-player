import React from "react";
import VideoPlayerWithChapters from "../src/components/VideoPlayerWithChapters";

/*const videoData = {
  hlsPlaylistUrl: "http://localhost:3000/master.m3u8",
  videoLength: 107,
  chapters: [
    { title: "FIRST", start: 0, end: 30 },
    { title: "SECOND", start: 31, end: 62 },
    { title: "THIRD", start: 63, end: 95 },
    { title: "FOUR", start: 96, end: 130 },
  ],
};*/
const videoData = {
  "hlsPlaylistUrl":
    "https://vz-50e60d70-540.b-cdn.net/b87ac5f4-2cf0-42d1-acc8-32a89d3c71c7/playlist.m3u8",
  "videoLength": 348, // seconds
  "chapters": [
    { "title": "Introduction & Course Overview", "start": 0, "end": 14 },
    {
      "title": "Curiosity's Role in Critical & Creative Thinking",
      "start": 15,
      "end": 57
    },
    {
      "title": "Analytical vs Creative Thinking Explained",
      "start": 58,
      "end": 116
    },
    {
      "title": "Building Your Bank of Dots",
      "start": 117,
      "end": 138
    },
    {
      "title": "Practical Strategies to Stay Curious",
      "start": 139,
      "end": 225
    },
    { "title": "Benefits of Curiosity", "start": 226, "end": 312 },
    { "title": "Conclusion & Recap", "start": 313, "end": 348 }]
}
function App() {
  return (
    <div>
      <VideoPlayerWithChapters data={videoData} />
    </div>
  );
}

export default App;

