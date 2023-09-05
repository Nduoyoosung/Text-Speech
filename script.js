const textArea = document.querySelector("textarea");
let speechBtn = document.querySelector("button");
let voiceList = document.querySelector("select");

let sound;
sound = speechSynthesis;
isSpeaking = true;

voices();

function voices() {
  for(let voice of sound.getVoices()){
    //selecting MS David as default
    let selected = voice.name === "Microsoft David - English (United States)" ? "selected" : "";
    //creating an option tag with voice name and language
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

sound.addEventListener("voiceschanged", voices);


// MAIN CODE
function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for(let voice of sound.getVoices()){
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  speechSynthesis.speak(utterance); //speak the speech/utterance
}

speechBtn.addEventListener("click", e => {
  e.preventDefault();
  if (textArea.value !== "") {
    if (!sound.speaking) {
    textToSpeech(textArea.value);
    }
    if (textArea.value.length > 20) {
      if (isSpeaking) {
        sound.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        sound.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }

      setInterval(() => {
        if (!sound.speaking && !sSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert to Speech";
        }
      });
    } else {
      speechBtn.innerText = "Convert to Speech";
    }
  }
});