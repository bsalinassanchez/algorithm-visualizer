import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ClippedDrawer from "./components/ClippedDrawer";

function App() {
	return (
		<div className="App">
			<Router>
				<ClippedDrawer></ClippedDrawer>
			</Router>
		</div>
	);
}

export default App;
