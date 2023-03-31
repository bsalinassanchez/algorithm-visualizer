import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../styles/Gui.css";
import { red } from "@mui/material/colors";
import { bfsPath } from "../components/SortingAlgorithms";
var found = false;

export default function BFS() {
	const [size, setSize] = useState(20);
	const [board, setBoard] = useState(
		Array(size)
			.fill()
			.map((_, indexH) =>
				Array(size)
					.fill()
					.map((_, indexW) => 0)
			)
	);
	const [barrier, setBarrier] = useState(false);
	const [start, setStart] = useState([0, 0]);
	const [target, setTarget] = useState();
	const [begin, setBegin] = useState(true);

	function resetBoard() {
		setBegin(true);
		const newBoard = Array(size)
			.fill()
			.map((_, indexH) =>
				Array(size)
					.fill()
					.map((_, indexW) => 0)
			);
		setBoard(newBoard);
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				document.getElementById(i + "-" + j).style.background = "white";
			}
		}
	}

	function newSize(size) {
		setSize(size);
		resetBoard();
		document.getElementsByClassName(
			"visual-box-2"
		)[0].style.gridTemplateColumns = `repeat(${size}, 1fr)`;
		document.getElementsByClassName(
			"visual-box-2"
		)[0].style.gridTemplateRows = `repeat(${size}, 1fr)`;
		console.log(document.getElementsByClassName("visual-box-2"));
		resetBoard();
	}

	function visualzePath(path) {
		for (let i = 0; i < path.length; i++) {
			setTimeout(() => {
				document.getElementById(path[i]).style.background = "yellow";
			}, 200);
		}
	}

	async function flood(i, j, path) {
		if (found === true) {
			visualzePath(path);
			return;
		}
		const newBoard = board;
		if (newBoard[i][j] === 0) {
			newBoard[i][j] = 1;
			var index = i + "-" + j;

			setTimeout(() => {
				if (start[0] !== i || start[1] !== j) {
					const elem = document.getElementById(index);
					elem.style.background = "DodgerBlue";
				}
				setBoard(newBoard);

				setTimeout(() => {
					if (i - 1 >= 0) flood(i - 1, j, path);
				}, 20);
				setTimeout(() => {
					if (j - 1 >= 0) flood(i, j - 1, path);
				}, 40);
				setTimeout(() => {
					if (i + 1 < size) flood(i + 1, j, path);
				}, 60);
				setTimeout(() => {
					if (j + 1 < size) flood(i, j + 1, path);
				}, 80);
			}, 150);
		} else if (newBoard[i][j] === 2) {
			document.getElementById(i + "-" + j).style.background = "green";
			found = true;
		}
	}

	return (
		<div className="algorithm">
			<div className="top">
				<h3>BFS</h3>
			</div>
			<div
				className="visual-box-2"
				style={{
					gridTemplateColumns: `repeat(${size}, 1fr)`,
					gridTemplateRows: `repeat(${size}, 1fr)`,
				}}
			>
				{board.map((row, i) =>
					row.map((col, j) => {
						return (
							<div
								className="square"
								key={i + "-" + j}
								id={i + "-" + j}
								onClick={() => {
									if (begin === true) {
										document.getElementById(i + "-" + j).style.background = "green";
										setStart([i, j]);
										setBegin(false);
									} else {
										if (barrier === false) {
											document.getElementById(i + "-" + j).style.background = "gray";
											board[i][j] = 3;
										} else {
											document.getElementById(i + "-" + j).style.background = "red";
											board[i][j] = 2;
											setTarget([i, j]);
										}
									}
								}}
							></div>
						);
					})
				)}
			</div>
			<div className="gui">
				<Button variant="contained" onClick={() => resetBoard()}>
					Reset
				</Button>
				{/*
				<TextField
					id="outlined-number"
					label="grid size (nxn)"
					type="number"
					InputLabelProps={{
						shrink: true,
					}}
					onKeyPress={(event) => {
						if (event.key === "Enter") {
							if (event.target.value > 0) {
								newSize(event.target.value);
							} else alert("grid size cannot be less than or equal to 0!");
						}
					}}
				/>
				*/}
				<Button
					variant="contained"
					onClick={async () => {
						found = false;
						let firstPromise = new Promise((resolve, reject) => {
							const path = bfsPath(board, start, target, size);
							resolve(path);
						});
						const visualPath = await firstPromise;
						//const path = bfsPath(board, start, target, size);
						console.log(visualPath);
						let promise = new Promise((resolve, reject) => {
							flood(start[0], start[1], visualPath);
							resolve(true);
						});
						let result = await promise;
						if (result === true) {
							//finish off the path-visualization
							//visualzePath(path);
						}
						console.log(result);
						//console.log(bfsPath(board, start, size));
					}}
				>
					Flood!
				</Button>
				<Button
					variant="contained"
					onClick={() => {
						if (barrier === true) {
							setBarrier(false);
						} else if (barrier === false) {
							setBarrier(true);
						}
					}}
				>
					{barrier ? "target" : "barrier"}
				</Button>
			</div>
		</div>
	);
}
