import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import "../styles/Gui.css";

// This is the main color of the array bars (indicates unsorted)
const PRIMARY_COLOR = "aquamarine";

export default function SortAlgorithm({ algorithm, algo }) {
	const [array, setArray] = useState([]);
	const [arraySize, setArraySize] = useState(25);
	const [animationSpeed, setAnimationSpeed] = useState(5);

	useEffect(() => {
		const array = [];
		for (let i = 0; i < 25; i++) {
			array.push(randomIntFromIntervals(5, 550));
		}
		setArray(array);
		//setArraySize(200);
		//setAnimationSpeed(5);
	}, []);

	function handleSpeed(event) {
		setAnimationSpeed(event.target.value);
	}

	//creates a new array with random integers with current array size
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

	//creates a new array with random integers with new array size
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
		const animations = algorithm(array);
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
		<div className="algorithm">
			<div className="top">
				<h3>{algo}</h3>
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
							if (event.target.value > 0) {
								setArraySize(event.target.value);
								resetArraySize(event.target.value);
							} else alert("array size cannot be less than or equal to 0!");
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
						<FormControlLabel value={50} control={<Radio />} label="slow" />
						<FormControlLabel value={15} control={<Radio />} label="normal" />
						<FormControlLabel value={5} control={<Radio />} label="fast" />
					</RadioGroup>
				</FormControl>
			</div>
		</div>
	);
}

function randomIntFromIntervals(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
