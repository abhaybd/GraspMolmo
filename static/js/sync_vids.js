$(document).ready(function() {
    const videosToSync = document.querySelectorAll("video.synced");
    const syncedGroups = new Set();
    for (const video of videosToSync) {
        const group = video.className.split(" ").filter(c => c.startsWith("synced-"))[0];
        syncedGroups.add(group);
    }

    let vidsReady = {};
    let vidsEnded = {};

    for (const group of syncedGroups) {
        vidsReady[group] = 0;
        vidsEnded[group] = 0;

        const syncedVids = document.querySelectorAll(`video.synced.${group}`);

        for (const vid of syncedVids) {
            vid.oncanplay = () => {
                vid.oncanplay = null;
                vidsReady[group] += 1;
                console.log(`${vidsReady[group]}/${syncedVids.length} videos ready in group ${group}`);
                if (vidsReady[group] === syncedVids.length) {
                    console.log(`Starting all videos in group ${group}`);
                    for (const v of syncedVids) {
                        v.play();
                    }
                }
            }

            // trigger callback if already ready
            if (vid.readyState > 3) {
                vid.oncanplay();
            }

            vid.onended = () => {
                vidsEnded[group] += 1;
                console.log(`${vidsEnded[group]}/${syncedVids.length} videos finished in group ${group}`);
                if (vidsEnded[group] === syncedVids.length) {
                    console.log(`Restarting all videos in group ${group}`);
                    setTimeout(() => {
                        vidsEnded[group] = 0;
                        for (const v of syncedVids) {
                            v.currentTime = 0;
                            v.play();
                        }
                    }, 1000);
                }
            }
        }
    }
});
