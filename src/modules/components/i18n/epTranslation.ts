// epTranslations.ts

export type EpTexts = {
  epTitle: string;
  uploadArtwork: string;
  artworkDragDrop: string;

  trackNumber: string;
  removeTrack: string;

  creationInfo: string;
  trackTitle: string;
  authors: string;
  producers: string;
  lyricists: string;
  musicians: string;
  musiciansVocals: string;
  musiciansPianoKeyboards: string;
  musiciansWinds: string;
  musiciansPercussion: string;
  musiciansStrings: string;
  mixingEngineer: string;
  masteringEngineer: string;

  uploadButton: string;

  recentEpUploads: string;
  noEpUploadedYet: string;

  // Tracks editor
  epTracksTitle: string;
  forEp: string;
  closeTracksEditor: string;

  dragDrop: string;
  uploadLyrics: string;
  lyricsPlaceholder: string;
  trackMood: string;
  selectMoodPlaceholder: string;

  signLanguageVideo: string;
  signLanguageVideoDragDrop: string;

  brailleFile: string;
  brailleFileDragDrop: string;

  addTrack: string;
  saveTracks: string;

  savedTracksTitle: string;
  noSavedTracks: string;
  prevPage: string;
  nextPage: string;
  pageLabel: string;

  // éventuellement utilisés ailleurs
  goBackToEp?: string;
};

export const epTranslations: Record<"en" | "es" | "ca", EpTexts> = {
  en: {
    epTitle: "EP title",
    uploadArtwork: "Upload artwork",
    artworkDragDrop: "Drag and drop or click to upload an image",

    trackNumber: "Track",
    removeTrack: "Remove track",

    creationInfo: "Creation information",
    trackTitle: "Track title",
    authors: "Authors",
    producers: "Producers",
    lyricists: "Lyricists",
    musicians: "Musicians",
    musiciansVocals: "Vocals",
    musiciansPianoKeyboards: "Piano / Keyboards",
    musiciansWinds: "Winds",
    musiciansPercussion: "Percussion",
    musiciansStrings: "Strings",
    mixingEngineer: "Mixing engineer",
    masteringEngineer: "Mastering engineer",

    uploadButton: "Upload",

    recentEpUploads: "Recent EP uploads",
    noEpUploadedYet: "No EP uploaded yet.",

    epTracksTitle: "EP tracks",
    forEp: "EP",
    closeTracksEditor: "Close editor",

    dragDrop: "Drag and drop or click to select a file",
    uploadLyrics: "Lyrics",
    lyricsPlaceholder: "Type the lyrics here...",
    trackMood: "Track mood",
    selectMoodPlaceholder: "Select a mood",

    signLanguageVideo: "Sign language video",
    signLanguageVideoDragDrop:
      "Drag and drop or click to upload a sign language video",

    brailleFile: "Braille file",
    brailleFileDragDrop: "Drag and drop or click to upload a braille file",

    addTrack: "Add track",
    saveTracks: "Save tracks",

    savedTracksTitle: "Saved tracks",
    noSavedTracks: "No saved tracks yet for this EP.",
    prevPage: "Previous",
    nextPage: "Next",
    pageLabel: "Page",

    goBackToEp: "Back to my EPs",
  },

  es: {
    epTitle: "Título del EP",
    uploadArtwork: "Subir portada",
    artworkDragDrop: "Arrastra y suelta o haz clic para subir una imagen",

    trackNumber: "Pista",
    removeTrack: "Eliminar pista",

    creationInfo: "Información de creación",
    trackTitle: "Título de la pista",
    authors: "Autores",
    producers: "Productores",
    lyricists: "Letristas",
    musicians: "Músicos",
    musiciansVocals: "Voces",
    musiciansPianoKeyboards: "Piano / Teclados",
    musiciansWinds: "Viento",
    musiciansPercussion: "Percusión",
    musiciansStrings: "Cuerdas",
    mixingEngineer: "Ingeniero de mezcla",
    masteringEngineer: "Ingeniero de masterización",

    uploadButton: "Subir",

    recentEpUploads: "EP subidos recientemente",
    noEpUploadedYet: "Todavía no se ha subido ningún EP.",

    epTracksTitle: "Pistas del EP",
    forEp: "EP",
    closeTracksEditor: "Cerrar editor",

    dragDrop: "Arrastra y suelta o haz clic para seleccionar un archivo",
    uploadLyrics: "Letras",
    lyricsPlaceholder: "Escribe aquí las letras...",
    trackMood: "Mood de la pista",
    selectMoodPlaceholder: "Selecciona un mood",

    signLanguageVideo: "Vídeo en lengua de signos",
    signLanguageVideoDragDrop:
      "Arrastra y suelta o haz clic para subir un vídeo en lengua de signos",

    brailleFile: "Archivo en braille",
    brailleFileDragDrop:
      "Arrastra y suelta o haz clic para subir un archivo en braille",

    addTrack: "Añadir pista",
    saveTracks: "Guardar pistas",

    savedTracksTitle: "Pistas guardadas",
    noSavedTracks: "Todavía no hay pistas guardadas para este EP.",
    prevPage: "Anterior",
    nextPage: "Siguiente",
    pageLabel: "Página",

    goBackToEp: "Volver a mis EP",
  },

  ca: {
    epTitle: "Títol de l’EP",
    uploadArtwork: "Puja la portada",
    artworkDragDrop: "Arrossega i deixa anar o fes clic per pujar una imatge",

    trackNumber: "Pista",
    removeTrack: "Eliminar pista",

    creationInfo: "Informació de creació",
    trackTitle: "Títol de la pista",
    authors: "Autors",
    producers: "Productors",
    lyricists: "Lletristes",
    musicians: "Músics",
    musiciansVocals: "Veus",
    musiciansPianoKeyboards: "Piano / Teclats",
    musiciansWinds: "Vents",
    musiciansPercussion: "Percussió",
    musiciansStrings: "Cordes",
    mixingEngineer: "Enginyer de mescla",
    masteringEngineer: "Enginyer de masterització",

    uploadButton: "Pujar",

    recentEpUploads: "EP pujats recentment",
    noEpUploadedYet: "Encara no s’ha pujat cap EP.",

    epTracksTitle: "Pistes de l’EP",
    forEp: "EP",
    closeTracksEditor: "Tancar l’editor",

    dragDrop: "Arrossega i deixa anar o fes clic per seleccionar un fitxer",
    uploadLyrics: "Lletra",
    lyricsPlaceholder: "Escriu aquí la lletra...",
    trackMood: "Mood de la pista",
    selectMoodPlaceholder: "Selecciona un mood",

    signLanguageVideo: "Vídeo en llengua de signes",
    signLanguageVideoDragDrop:
      "Arrossega i deixa anar o fes clic per pujar un vídeo en llengua de signes",

    brailleFile: "Fitxer en braille",
    brailleFileDragDrop:
      "Arrossega i deixa anar o fes clic per pujar un fitxer en braille",

    addTrack: "Afegir pista",
    saveTracks: "Desar pistes",

    savedTracksTitle: "Pistes desades",
    noSavedTracks: "Encara no hi ha pistes desades per a aquest EP.",
    prevPage: "Anterior",
    nextPage: "Següent",
    pageLabel: "Pàgina",

    goBackToEp: "Tornar als meus EP",
  },
};

export type EpLanguageCode = keyof typeof epTranslations;

/**
 * Récupère les textes pour une langue donnée.
 * Si la langue n’est pas supportée, on retourne l’anglais par défaut.
 */
export function getEpTexts(lang: EpLanguageCode | string | undefined): EpTexts {
  if (!lang) return epTranslations.en;
  if (lang in epTranslations) {
    return epTranslations[lang as EpLanguageCode];
  }
  return epTranslations.en;
}
