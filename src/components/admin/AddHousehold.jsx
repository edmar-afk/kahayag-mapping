import React, { useState } from "react";import { Modal, Grow } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddHousehold() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		family_name: "",
		location: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setFormData({ family_name: "", location: "" });
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...formData,
				members: [],
			};
			const response = await api.post("/api/households/", payload);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add household");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Household
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.4)",
					},
				}}>
				<Grow in={open}>
					<div className="w-[400px] mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
						<div className="text-2xl py-4 px-6 bg-yellow-900 text-white text-center font-bold uppercase">
							Add Household
						</div>
						<form
							className="py-4 px-6"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}>
							<div className="mb-4">
								<label
									htmlFor="family_name"
									className="block text-yellow-700 font-bold mb-2">
									Family Name
								</label>
								<input
									id="family_name"
									name="family_name"
									type="text"
									value={formData.family_name}
									onChange={handleChange}
									placeholder="Enter family name"
									required
									className="shadow border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="location"
									className="block text-yellow-700 font-bold mb-2">
									Location
								</label>
								<input
									id="location"
									name="location"
									type="text"
									value={formData.location}
									onChange={handleChange}
									placeholder="Enter location"
									required
									className="shadow border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							{error && <p className="text-sm text-red-500 mb-4">{error}</p>}
							<div className="flex items-center justify-center mb-2">
								<button
									type="submit"
									className="bg-yellow-900 text-white py-2 px-4 rounded hover:bg-yellow-800 focus:outline-none focus:shadow-outline">
									Submit
								</button>
							</div>
						</form>
					</div>
				</Grow>
			</Modal>
		</>
	);
}

export default AddHousehold;
