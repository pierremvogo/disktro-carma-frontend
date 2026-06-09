export const speak = (text: string, lang: string = "en-US") => {
  if (!window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
