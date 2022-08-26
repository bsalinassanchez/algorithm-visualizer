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
import SelectionSort from "../pages/SelectionSort";
import MergeSort from "../pages/MergeSort";
import HeapSort from "../pages/HeapSort";
import BubbleSort from "../pages/BubbleSort";
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
								<ListItemButton component={Link} to="/algorithm-visualizer/">
									<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem key="Selection Sort" disablePadding>
							<ListItemButton component={Link} to="/algorithm-visualizer/selection-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Selection Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Merge Sort" disablePadding>
							<ListItemButton component={Link} to="/algorithm-visualizer/merge-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Merge Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Heap Sort" disablePadding>
							<ListItemButton component={Link} to="/algorithm-visualizer/heap-sort">
								<ListItemIcon>{<InboxIcon />}</ListItemIcon>
								<ListItemText primary="Heap Sort" />
							</ListItemButton>
						</ListItem>
						<ListItem key="Bubble Sort" disablePadding>
							<ListItemButton component={Link} to="/algorithm-visualizer/bubble-sort">
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
					<Route path="/algorithm-visualizer/" element={<Dashboard />} />
					<Route path="/algorithm-visualizer/selection-sort" element={<SelectionSort />} />
					<Route path="/algorithm-visualizer/merge-sort" element={<MergeSort />} />
					<Route path="/algorithm-visualizer/heap-sort" element={<HeapSort />} />
					<Route path="/algorithm-visualizer/bubble-sort" element={<BubbleSort />} />
					<Route path="/algorithm-visualizer/*" element={<h1>404 not found</h1>} />
				</Routes>
			</Box>
		</Box>
	);
}
