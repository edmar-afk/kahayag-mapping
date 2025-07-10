import React, { useState } from "react";import { Modal, Grow } from "@mui/material";import api from "../../assets/api";const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		purok: "",
		status: "",
		household: "",
	});
	const [error, setError] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const handleOpen = () => {
		fetchHouseholds();
		setOpen(true);
	};

	const handleClose = () => {
		setFormData({
			name: "",
			age: "",
			role: "",
			purok: "",
			status: "",
			household: "",
		});
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
			await api.post("/api/householdmembers/", formData);
			handleClose();
		} catch (err) {
			console.error("Add member failed:", err);
			setError("Failed to add member");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Member
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
							Add Member
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
									htmlFor="name">
									Name
								</label>
								<input
									id="name"
									name="name"
									type="text"
									placeholder="Enter name"
									value={formData.name}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700"
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
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700"
								/>
							</div>

							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="role">
									Role
								</label>
								<select
									id="role"
									name="role"
									value={formData.role}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700">
									<option
										value=""
										disabled>
										Select Role
									</option>
									<option value="Father">Father</option>
									<option value="Mother">Mother</option>
									<option value="Son">Son</option>
									<option value="Daughter">Daughter</option>
								</select>
							</div>

							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="purok">
									Purok
								</label>
								<select
									id="purok"
									name="purok"
									value={formData.purok}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700">
									<option
										value=""
										disabled>
										Select Purok
									</option>
									<option value="Purok 1">Purok 1</option>
									<option value="Purok 2">Purok 2</option>
									<option value="Purok 3">Purok 3</option>
									<option value="Purok 4">Purok 4</option>
									<option value="Purok 5">Purok 5</option>
									<option value="Purok 6">Purok 6</option>
									<option value="Purok 7">Purok 7</option>
									<option value="Purok 8">Purok 8</option>
									<option value="Purok 9">Purok 9</option>
									<option value="Purok 10">Purok 10</option>
								</select>
							</div>

							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="status">
									Status
								</label>
								<select
									id="status"
									name="status"
									value={formData.status}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700">
									<option
										value=""
										disabled>
										Select Status
									</option>
									<option value="Single">Single</option>
									<option value="Married">Married</option>
								</select>
							</div>

							<div className="mb-4">
								<label
									className="block text-yellow-700 font-bold mb-2"
									htmlFor="household">
									Household
								</label>
								<select
									id="household"
									name="household"
									value={formData.household}
									onChange={handleChange}
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-700">
									<option
										value=""
										disabled>
										Select Household
									</option>
									{households.map((h) => (
										<option
											key={h.id}
											value={h.id}>
											{h.family_name}
										</option>
									))}
								</select>
							</div>

							{error && <p className="text-sm text-red-500 mb-4">{error}</p>}

							<div className="flex items-center justify-center mb-2">
								<button
									type="submit"
									className="bg-yellow-900 text-white py-2 px-4 rounded hover:bg-yellow-800 focus:outline-none">
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

export default AddMembers;
