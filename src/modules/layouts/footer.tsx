export default function Footer() {
  return (
    <footer className="mt-12 bg-white/50 backdrop-blur-md shadow-inner rounded-t-3xl px-6 py-4 text-center text-sm text-gray-700">
      {" "}
      <p>© {new Date().getFullYear()} Cosmic. All rights reserved.</p>{" "}
      <div className="mt-2 space-x-4">
        {" "}
        {/* <a href="/legal" className="underline hover:text-purple-600">
          {" "}
          Mentions légales{" "}
        </a>{" "}
        <a href="/contact" className="underline hover:text-purple-600">
          {" "}
          Contact{" "}
        </a>{" "} */}
      </div>{" "}
    </footer>
  );
}
