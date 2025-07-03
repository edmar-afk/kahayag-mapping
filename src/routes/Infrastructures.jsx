import { useEffect, useState } from "react";import api from "../assets/api";
import AddInfrastructures from "../components/admin/AddInfrastructures";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Infrastructure() {
	const [infras, setInfras] = useState([]);

	const fetchInfras = async () => {
		try {
			const res = await api.get("/api/infras/");
			setInfras(res.data);
		} catch (err) {
			console.error("Failed to fetch Infrastructures:", err);
		}
	};

	const deleteInfra = async (id) => {
		try {
			await api.delete(`/api/infrastructure/delete/${id}/`);
			setInfras((prev) => prev.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Failed to delete Infrastructure:", err);
		}
	};

	useEffect(() => {
		fetchInfras();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddInfrastructures />
				<p
					onClick={fetchInfras}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-xl font-bold">List of Infrastructures</h1>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-orange-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3">
									Image
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Type
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Description
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{infras.length > 0 ? (
								infras.map((infra) => (
									<tr
										key={infra.id}
										className="odd:bg-orange-200 even:bg-gray-50 border-b border-orange-200">
										<td className="px-6 py-4">
											{infra.image ? (
												<img
													src={infra.image}
													alt="infra"
													className="w-16 h-16 object-cover rounded"
												/>
											) : (
												<span className="text-gray-400 italic">No Image</span>
											)}
										</td>
										<td className="px-6 py-4">{infra.name}</td>
										<td className="px-6 py-4">{infra.type}</td>
										<td className="px-6 py-4">{infra.description}</td>
										<td className="px-6 py-4">
											<button
												type="button"
												onClick={() => deleteInfra(infra.id)}
												className="text-red-700 hover:underline">
												<DeleteForeverIcon /> Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
										className="px-6 py-4 text-center text-gray-500">
										No infrastructure records found.
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

export default Infrastructure;
