import React from "react";
import "../styles/VisualBox.css";
import Footer from "../components/Footer";

export default function Dashboard() {
	return (
		<div className="dashboard">
			<div className="top">
				<h1>Welcome to my algorithm visualizer!</h1>
				<h3>Please make sure to select an algorithm on the left-hand side!</h3>
				<h3>This project was built using React and implements MUI</h3>
			</div>
			<div className="dev-notes">
				<p>Note: I plan on adding more sorting algorithms in the future.</p>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
}
