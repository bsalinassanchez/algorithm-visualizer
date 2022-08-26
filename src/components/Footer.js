import React from "react";
import { SocialIcon } from "react-social-icons";
import "../styles/Footer.css";

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<div className="socials">
					<SocialIcon
						url="https://www.linkedin.com/in/bsalinassanchez/"
						fgColor="white"
					></SocialIcon>
					<SocialIcon url="https://github.com/bsalinassanchez" fgColor="white"></SocialIcon>
					<SocialIcon url="https://twitter.com/BossbabyBrandon" fgColor="white"></SocialIcon>
					<SocialIcon url="mailto:brandonsalinas619@gmail.com" fgColor="white"></SocialIcon>
				</div>
				<p> &copy; 2022 bsalinassanchez</p>
			</div>
		);
	}
}

export default Footer;
