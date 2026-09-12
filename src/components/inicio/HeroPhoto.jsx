import heroImage from "../../assets/hero.png";

function HeroPhoto() {
  return (
    <div className="hero-visual">
      <img src={heroImage} alt="Cuchubal Digital" className="float-animation" />
      <div className="visual-glow"></div>
    </div>
  );
}

export default HeroPhoto;