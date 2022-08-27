import twitterIcon from "./imgs/twitter.png";
import linkedInIcon from "./imgs/linkedin.png";
import githubIcon from "./imgs/github.png";
import "./Credits.css";

export default function Credits() {
  return (
    <div className="Credits">
      <p>By Abeer Ali Khan</p>
      <div className="Credits-socials">
        <a
          href="https://github.com/abeeralikhan"
          target="_blank"
          aria-label="Github"
        >
          <img src={githubIcon} alt="" />
        </a>
        <a
          href="https://twitter.com/abeerkh4n"
          target="_blank"
          aria-label="Twitter"
        >
          <img src={twitterIcon} alt="" />
        </a>
        <a href="https://linkedin.com/in/abeeralikhan">
          <img
            src={linkedInIcon}
            alt=""
            target="_blank"
            aria-label="LinkedIn"
          />
        </a>
      </div>
    </div>
  );
}
