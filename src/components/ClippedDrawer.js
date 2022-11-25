import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SortAlgorithm from "./SortAlgorithm";
import {
	getSelectionSortAnimations,
	getBubbleSortAnimations,
	getHeapSortAnimations,
	getMergeSortAnimations,
} from "../components/SortingAlgorithms";

const drawerWidth = 240;

export default function ClippedDrawer() {
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography variant="h6" noWrap component="div">
						Algorithm Visualizer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{["Dashboard"].map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton component={Link} to="/">
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem key="Selection Sort" disablePadding>
							<ListItemButton component={Link} to="/selection-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Selection Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Merge Sort" disablePadding>
							<ListItemButton component={Link} to="/merge-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Merge Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Heap Sort" disablePadding>
							<ListItemButton component={Link} to="/heap-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Heap Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Bubble Sort" disablePadding>
							<ListItemButton component={Link} to="/bubble-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Bubble Sort" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route
						path="/selection-sort"
						element={<SortAlgorithm algorithm={getSelectionSortAnimations} algo="Selection Sort" />}
					/>
					<Route
						path="/merge-sort"
						element={<SortAlgorithm algorithm={getMergeSortAnimations} algo="Merge Sort" />}
					/>
					<Route
						path="/heap-sort"
						element={<SortAlgorithm algorithm={getHeapSortAnimations} algo="Heap Sort" />}
					/>
					<Route
						path="/bubble-sort"
						element={<SortAlgorithm algorithm={getBubbleSortAnimations} algo="Bubble Sort" />}
					/>
					<Route path="/*" element={<h1>404 not found</h1>} />
				</Routes>
			</Box>
		</Box>
	);
}
