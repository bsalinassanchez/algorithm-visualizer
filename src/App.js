import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ClippedDrawer from "./components/ClippedDrawer";
import { HashRouter } from "react-router-dom";
function App() {
	return (
		<div className="App">
			<HashRouter>
				<ClippedDrawer></ClippedDrawer>
			</HashRouter>
		</div>
	);
}

export default App;
