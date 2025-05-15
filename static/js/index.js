window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
  // Add a timestamp to all video sources to prevent browser caching
  const allVideos = document.querySelectorAll('video');
  for (const video of allVideos) {
    video.pause();
    for (const source of video.getElementsByTagName('source')) {
      source.src += '?' + new Date().getTime();
    }
    video.load();
    video.play();
  }
})
