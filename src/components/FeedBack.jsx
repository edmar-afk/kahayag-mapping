import React, { useState } from "react";import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import api from "../assets/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function FeedBack({lat, lng}) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleClose(); // ✅ close modal first
		} catch (err) {
			handleClose(); // ✅ close modal first
			console.error(err);
		}
	};

	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(`${lat}, ${lng}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			<div className="fixed top-4 left-24 z-[99999] flex flex-row w-full">
				<button
					onClick={handleOpen}
					className="bg-yellow-600 cursor-pointer w-[200px] hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-full shadow">
					Send Feedback
				</button>

				<div className=" py-3 pl-4 w-full flex flex-row items-center gap-2 left-0">
					<button
						onClick={handleCopy}
						className="flex cursor-pointer flex-row items-center border px-2 rounded-md text-sm py-1 border-yellow-600 bg-yellow-100 text-yellow-800">
						<ContentCopyIcon fontSize="small" />
						<span>{copied ? "Copied" : " "}</span>
					</button>
					<p className="w-44 bg-yellow-100 px-3 py-1 rounded-full overflow-hidden whitespace-nowrap text-ellipsis">
						{lat}, {lng}
					</p>
				</div>
			</div>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label="Your Feedback"
							multiline
							rows={4}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2 }}>
							Submit your Feedback
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default FeedBack;
