export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <span>© {year} Sacha Delhoux</span>
      <nav className="socials">
        <a href="https://x.com/sacha_io" rel="noopener" target="_blank">X</a>
        <a href="https://github.com/Knowzzz/sachadelhoux.com" rel="noopener" target="_blank">GitHub</a>
        <a href="mailto:sacha.delpom@gmail.com">Email</a>
      </nav>
    </footer>
  );
}
