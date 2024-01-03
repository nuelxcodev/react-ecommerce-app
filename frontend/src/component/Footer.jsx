import Logo from "./part/logo";

function Footer() {
  return (
    <div>
      <footer style={{ position: "relative" }} id="about">
        <div
          style={{
            opacity: "10%",
            position: "absolute",
            top: "50%",
            left: "40vw",
            width: "20%",
            height: " 20%",
          }}
        >
          <Logo />
        </div>
      </footer>
    </div>
  );
}

export default Footer;
