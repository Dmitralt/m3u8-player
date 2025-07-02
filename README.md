Video Player With Chapters
==========================

A simple interactive video player with chapter support, HLS streaming, and basic controls.

--------------------------
Quick Start
--------------------------

1. Install dependencies:
   npm install

2. Run the development server:
   npm run start

3. The app will be available at:
   http://localhost:3000

--------------------------
Usage
--------------------------

In your App.js file, define a video data object in the following format:

const videoData = {
  hlsPlaylistUrl: "https://.../master.m3u8",
  videoLength: 107,
  chapters: [
    { title: "FIRST", start: 0, end: 30 },
    { title: "SECOND", start: 31, end: 62 },
    { title: "THIRD", start: 63, end: 95 },
    { title: "FOUR", start: 96, end: 130 }
  ]
};

Then pass this object to the player component like so:

<VideoPlayerWithChapters data={videoData} />

--------------------------
Features
--------------------------

- Play / Pause control
- Volume control and mute/unmute
- Display of current playback time
- Quality selection (based on provided HLS stream levels)
- Fullscreen mode (exit with the Escape key)
- Company logo (static, not clickable)

--------------------------
Chapters and Progress Bar
--------------------------

- Hovering over the progress bar highlights the corresponding chapter
- Tooltip displays chapter title and exact time
- Clicking the progress bar seeks to the selected time

--------------------------
Data Validation
--------------------------

Some basic input validation is included. For better behavior in edge cases, additional specifications are needed, such as:

- What should happen if the start of a chapter is earlier than the end of the previous one
- What to do if there are time gaps between chapter segments
- Should invalid time formats or malformed data be ignored or raise errors

--------------------------
Structure Overview
--------------------------

- VideoPlayerWithChapters: main component that handles layout and logic
- ControlsBar: UI for controls like play, volume, fullscreen, quality
- ProgressBarWithChapters: displays chapters on a timeline and handles seeking
- VideoElement: video element abstraction
- hooks/: custom React hooks for HLS setup, volume control, and fullscreen toggle

--------------------------
Default Port
--------------------------

Runs on port 3000 by default.

