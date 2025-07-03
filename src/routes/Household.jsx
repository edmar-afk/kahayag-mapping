import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddHousehold from "../components/admin/AddHousehold";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Household() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteHousehold = async (id) => {
		try {
			await api.delete(`/api/households/delete/${id}/`);
			setHouseholds((prev) => prev.filter((h) => h.id !== id));
		} catch (err) {
			console.error("Failed to delete household:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddHousehold />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-xl font-bold">List of Households</h1>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-orange-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3">
									Family Name
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{households.length > 0 ? (
								households.map((household) => (
									<tr
										key={household.id}
										className="odd:bg-orange-200 even:bg-gray-50 border-b border-orange-200">
										<td className="px-6 py-4">{household.family_name}</td>
										<td className="px-6 py-4">
											<button
												type="button"
												onClick={() => deleteHousehold(household.id)}
												className="text-red-700 hover:underline">
												<DeleteForeverIcon /> Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="2"
										className="px-6 py-4 text-center text-gray-500">
										No household records found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default Household;
