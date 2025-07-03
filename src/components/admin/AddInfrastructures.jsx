import React, { useState } from "react";import { Modal, Grow } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddInfrastructures() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		description: "",
		location: "",
	});
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const infraData = new FormData();
		infraData.append("name", formData.name);
		infraData.append("type", formData.type);
		infraData.append("description", formData.description);
		infraData.append("location", formData.location);
		if (image) {
			infraData.append("image", image);
		}

		try {
			await api.post("/api/infras/create/", infraData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			handleClose();
		} catch (error) {
			console.error("Add infrastructure failed:", error);
			setError("Failed to add infrastructure");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Infrastructure
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
							Add Infrastructure
						</div>
						<form
							className="py-4 px-6"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}>
							<div className="mb-4">
								<label
									htmlFor="name"
									className="block text-yellow-700 font-bold mb-2">
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									value={formData.name}
									onChange={handleChange}
									placeholder="Enter name"
									required
									className="shadow border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="type"
									className="block text-yellow-700 font-bold mb-2">
									Type
								</label>
								<input
									id="type"
									name="type"
									type="text"
									value={formData.type}
									onChange={handleChange}
									placeholder="Enter type"
									required
									className="shadow border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-yellow-700 font-bold mb-2">
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={handleChange}
									rows="3"
									placeholder="Enter description"
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
							<div className="mb-4">
								<label
									htmlFor="image"
									className="block text-yellow-700 font-bold mb-2">
									Image
								</label>
								<input
									type="file"
									accept="image/png, image/jpeg, image/jpg"
									onChange={handleImageChange}
									className="block w-full text-sm text-yellow-700"
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

export default AddInfrastructures;
