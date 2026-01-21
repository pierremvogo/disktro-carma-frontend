export async function getLyrics(artist: string, title: string) {
  const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
  if (!res.ok) {
    console.log("Not found lyrics");
    throw new Error("Paroles non trouvées.");
  }
  const data = await res.json();
  return data.lyrics;
}
