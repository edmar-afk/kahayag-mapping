import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddSeniors from "../components/admin/AddSeniors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Seniors() {
	const [seniors, setSeniors] = useState([]);

	const fetchSeniors = async () => {
		try {
			const res = await api.get("/api/seniors/");
			setSeniors(res.data);
		} catch (err) {
			console.error("Failed to fetch Seniors:", err);
		}
	};

	const deleteSenior = async (id) => {
		try {
			await api.delete(`/api/seniors/${id}/`);
			setSeniors((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error("Failed to delete Senior:", err);
		}
	};

	useEffect(() => {
		fetchSeniors();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddSeniors />
				<p
					onClick={fetchSeniors}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-xl font-bold">List of Seniors</h1>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-orange-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3">
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Age
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Gender
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{seniors.length > 0 ? (
								seniors.map((senior) => (
									<tr
										key={senior.id}
										className="odd:bg-orange-200 even:bg-gray-50 border-b border-orange-200">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											{senior.people}
										</th>
										<td className="px-6 py-4">{senior.age}</td>
										<td className="px-6 py-4">{senior.gender}</td>
										<td className="px-6 py-4">
											<button
												type="button"
												onClick={() => deleteSenior(senior.id)}
												className="text-red-700 hover:underline">
												<DeleteForeverIcon /> Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="4"
										className="px-6 py-4 text-center text-gray-500">
										No Senior records found.
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

export default Seniors;
