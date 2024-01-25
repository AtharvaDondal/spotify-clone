console.log("Javascript initializing");
async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      // it will written all the name after /songs/
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main() {
  // Get the list of all songs
  let songs = await getSongs();
  console.log(songs);

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
        <img class="invert" src="music.svg" alt="music_svg">
    <div class="info">
      <div>${song.replaceAll("%20", " ")}</div>
      <div>Atharva</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert" src="play2.svg" alt="play">
    </div>    
    
    </li>`;
  }

  // Play the first songs
  var audio = new Audio(songs[0]);
  audio.play();

  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
    // The duration variable now holds the duration (in seconds) of the audio clip
  });
}

main();
