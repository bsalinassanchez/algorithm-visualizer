import React from "react";
import { useState, useEffect } from "react";
import { getSelectionSortAnimations } from "../components/SortingAlgorithms";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import "../styles/Gui.css";
// Set animation speed
//const ANIMATION_SPEED_MS = 2;

// This is the main color of the array bars.
const PRIMARY_COLOR = "aquamarine";

// Set array size
//const arraySize = 200;

export default function SelectionSort() {
	const [array, setArray] = useState([]);
	const [arraySize, setArraySize] = useState(200);
	const [animationSpeed, setAnimationSpeed] = useState(5);

	useEffect(() => {
		const array = [];
		for (let i = 0; i < 200; i++) {
			array.push(randomIntFromIntervals(5, 550));
		}
		setArray(array);
		//setArraySize(200);
		//setAnimationSpeed(5);
	}, []);

	function handleSpeed(event) {
		setAnimationSpeed(event.target.value);
	}
	function resetArray() {
		const array = [];
		for (let i = 0; i < arraySize; i++) {
			array.push(randomIntFromIntervals(5, 550));
		}
		setArray(array);
		const bars = document.getElementsByClassName("bar");
		for (let i = 0; i < arraySize; i++) {
			bars[i].style.backgroundColor = PRIMARY_COLOR;
		}
	}

	async function resetArraySize(size) {
		const array = [];
		for (let i = 0; i < size; i++) {
			array.push(randomIntFromIntervals(5, 550));
		}
		await setArray(array);
		const bars = document.getElementsByClassName("bar");
		for (let i = 0; i < size; i++) {
			bars[i].style.backgroundColor = PRIMARY_COLOR;
		}
	}
	function selectionSort() {
		const animations = getSelectionSortAnimations(array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName("bar");
			const isColorChange = animations[i][2];
			if (isColorChange) {
				//const [barOneIdx, barTwoIdx] = animations[i];
				const barOneIdx = animations[i][0];
				const barTwoIdx = animations[i][1];
				const barOneStyle = arrayBars[barOneIdx].style; //ERROR?
				const barTwoStyle = arrayBars[barTwoIdx].style;

				//const color = animations[i][3] ? PRIMARY_COLOR : SECONDARY_COLOR;
				const color = animations[i][3];
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * animationSpeed);
			} else {
				//ERROR?
				setTimeout(() => {
					const [barOneIdx, newHeight] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * animationSpeed);
			}
		}
	}

	return (
		<div className="selection-sort">
			<div className="top">
				<h3>Selection Sort</h3>
			</div>
			<div className="visual-box">
				{array.map((value, index) => {
					return <div className="bar" key={index} style={{ height: `${value}px` }}></div>;
				})}
			</div>
			<div className="gui">
				<TextField
					id="outlined-number"
					label="Array Size"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							setArraySize(event.target.value);
							resetArraySize(event.target.value);
						}
					}}
				/>

				<Button variant="contained" onClick={resetArray}>
					Reset Array
				</Button>
				<Button variant="contained" onClick={selectionSort}>
					Sort Array
				</Button>
				<FormControl>
					<FormLabel id="demo-row-radio-buttons-group-label">Speed</FormLabel>
					<RadioGroup
						row
						aria-labelledby="demo-row-radio-buttons-group-label"
						name="row-radio-buttons-group"
						value={animationSpeed}
						onChange={handleSpeed}
					>
						<FormControlLabel value={20} control={<Radio />} label="slow" />
						<FormControlLabel value={5} control={<Radio />} label="normal" />
						<FormControlLabel value={1} control={<Radio />} label="fast" />
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

function randomIntFromIntervals(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
