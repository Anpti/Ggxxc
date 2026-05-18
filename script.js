// Image URLs
const STATIC_IMAGE = "https://share.google/zQM2Hw1Qe7kBAggzQ";
const HOLD_IMAGE = "https://share.google/DlUnOGO2dYCbLjsPr";

// List of YouTube Video IDs (Change these to your preferred Kirby/Kawaii tracks)
// Example IDs represent standard Kirby music tracks or covers found on YouTube
const songList = [
    "3w6L_bVvOaU", // Green Greens Theme
    "6n6fC_G_2G0", // Gourmet Race
    "uU86G-v7MvA", // Kirby Plaza Theme
    "O9K8_bE9bS0", // Butter Building
    "Y4b8_6bMvO0"  // Float Islands
];

let player;
let isPlaying = false;
const kirbyImg = document.getElementById('kirby');

// Initialize the YouTube Player API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-audio-player', {
        height: '0',
        width: '0',
        videoId: songList[0], // load a default initial track
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'fs': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Setup interaction listeners once the player is ready
    
    // Mouse Events
    kirbyImg.addEventListener('mousedown', startAction);
    window.addEventListener('mouseup', stopAction);

    // Touch Events (For Mobile Support)
    kirbyImg.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents zoom/scroll gestures during hold
        startAction();
    });
    window.addEventListener('touchend', stopAction);
}

function startAction() {
    if (isPlaying) return;
    isPlaying = true;

    // 1. Change the image to the active holding state
    kirbyImg.src = HOLD_IMAGE;

    // 2. Select a completely random song from the list
    const randomIndex = Math.floor(Math.random() * songList.length);
    const selectedVideoId = songList[randomIndex];

    // 3. Load and play the video via YouTube API
    if (player && typeof player.loadVideoById === 'function') {
        player.loadVideoById({
            videoId: selectedVideoId,
            startSeconds: 0
        });
        player.playVideo();
    }
}

function stopAction() {
    if (!isPlaying) return;
    isPlaying = false;

    // 1. Change the image back to the static state
    kirbyImg.src = STATIC_IMAGE;

    // 2. Stop the video playback instantly
    if (player && typeof player.stopVideo === 'function') {
        player.stopVideo();
    }
}
