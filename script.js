let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let timeout;

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 0.9;
  text_speak.pitch = 0.8; 
  text_speak.volume = 1;
  text_speak.lang = ("en-GB");
  window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
  

  clearTimeout(timeout);
  resetButtonAfterDelay();
};

btn.addEventListener('click', () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
  
  clearTimeout(timeout);
  resetButtonAfterDelay();
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hey")) {
    speak("hello, how can i help you");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by karthi. I am here to help you out!");
  }else if (message.includes("open my portfolio")) {
    speak("Opening your portfolio...");
    window.open("https://karthikravi3121.github.io/portfolio/", "_blank");
  }else if (message.includes("time")) {
    let time = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString('en-US', { day: 'numeric', month: 'short' });
    speak(date);
  } else if (message.includes("open")) {
    const match = message.match(/open (.+)/i);
    if (match && match[1]) {
      const siteName = match[1].trim().toLowerCase();
      const url = `https://www.${siteName}.com`;
      speak(`Opening ${siteName}...`);
      window.open(url, "_blank");
    } else {
      speak("I couldn't understand the website name.");
    }
  } else if (message.includes("play") && (message.includes("song") || message.includes("music"))) {
    const songName = message.replace("play", "").replace("song", "").replace("music", "").trim();
    if (songName) {
      speak(`Playing ${songName}...`);
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songName)}`;
      window.open(youtubeUrl, "_blank");
    } else {
      speak("Please specify the song you want to play.");
    }
  } else if (message.toLowerCase().includes("show me the images of")) {
    let searchQuery = message.replace("show me the images of", "").trim();
    finalText = "Here are the images I found for " + searchQuery;
    speak(finalText);
    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery)}`);
  } else {
    let searchQuery = message.replace("Bolt", "").trim();
    finalText = "This is what I found on the internet regarding " + searchQuery;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);
  }
}

function resetButtonAfterDelay() {
  timeout = setTimeout(() => {
    btn.style.display = "flex";
    voice.style.display = "none";
  }, 5000); 
}
