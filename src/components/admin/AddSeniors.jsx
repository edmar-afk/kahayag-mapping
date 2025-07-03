import React, { useState } from "react";import { Modal, Grow } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddSeniors() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ people: "", age: "", gender: "", location: "" });
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
			const response = await api.post("/api/seniors/", formData);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add data");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Seniors
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
							Add Senior
						</div>
						<form
							className="py-4 px-6"
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}>
							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="people">
									Full Name
								</label>
								<input
									id="people"
									name="people"
									type="text"
									placeholder="Enter full name"
									value={formData.people}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="age">
									Age
								</label>
								<input
									id="age"
									name="age"
									type="number"
									placeholder="Enter age"
									value={formData.age}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="gender">
									Gender
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline">
									<option
										value=""
										disabled>
										Select gender
									</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>
							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="location">
									Location
								</label>
								<input
									id="location"
									name="location"
									type="text"
									placeholder="Enter location"
									value={formData.location}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default AddSeniors;
