Video Player With Chapters
==========================

A simple interactive video player with chapter support, HLS streaming, and basic controls.

--------------------------
Quick Start
--------------------------

After downloading:

1. Install dependencies:
   npm install

2. Run the development server:
   npm run start

3. The app will be available at:
   http://localhost:3000

--------------------------
Usage
--------------------------

To test with your own playlist, use the file App.js. There, define a video data object in the following format:

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

Some basic input validation is included. Edge cases like incorrect time or missing values are accounted for. However, for production-grade implementation, further specification is needed:

- What to do if the start time of a chapter is earlier than the end of the previous one
- What to do if there is a gap between the end of one chapter and the start of another
- Should invalid formats or out-of-range values be ignored or blocked
- What Unicode characters are allowed (emoji, foreign languages, special symbols, etc.)
- What maximum text lengths should be enforced

--------------------------
Design and Interaction Notes
--------------------------

- Fullscreen exits via Escape key because the mockup did not include a "return" or "exit fullscreen" button
- Responsive design is limited; the layout follows mockup dimensions but includes basic resizing behavior
- UI controls are based on standard React libraries. The volume control is lightly customized to match the style. Since the mockup did not show the expanded view, this was implemented at developer discretion

--------------------------
Testing and Production Notes
--------------------------

No unit tests or integration tests are included. For demonstration purposes this is likely sufficient, but for real-world use the component should be completed with:
- additional validation
- clarified requirements
- a suite of automated tests

--------------------------
Default Port
--------------------------

Runs on port 3000 by default.
