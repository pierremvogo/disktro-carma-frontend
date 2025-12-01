export default function Footer() {
  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-black/50
        backdrop-blur-xl
        border-t border-white/20
        px-6 py-4
        text-center
        text-sm
        text-white/70
        rounded-t-3xl
        z-40
      "
    >
      <p className="drop-shadow-sm">
        © {new Date().getFullYear()} Music for all. All rights reserved.
      </p>
    </footer>
  );
}
