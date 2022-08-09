const Header = (): JSX.Element => {
  return (
    <header>
      <a
        href="https://github.com/hctmanuelortiz/guess-pokemon"
        rel="noreferrer"
        target={"_blank"}
      >
        <i className="nes-icon github is-medium" />
      </a>
      <a
        href="https://github.com/goncy/interview-challenges"
        rel="noreferrer"
        target={"_blank"}
      >
        <p>Challenge by Goncy </p>
      </a>
      <a
        href="https://twitter.com/hctmanuelortiz"
        rel="noreferrer"
        target={"_blank"}
      >
        <i className="nes-icon twitter is-medium" />
      </a>
    </header>
  );
};

export default Header;
