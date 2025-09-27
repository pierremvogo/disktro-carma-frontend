export default function VideoPlayer({ src }: any) {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden">
      <video controls className="w-full max-h-[400px] object-cover">
        <source src={src} type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>
    </div>
  );
}
