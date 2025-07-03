import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddPwd from "../components/admin/AddPwd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Pwd() {
	const [pwds, setPwds] = useState([]);

	const fetchPwds = async () => {
		try {
			const res = await api.get("/api/pwds/");
			setPwds(res.data);
		} catch (err) {
			console.error("Failed to fetch PWDs:", err);
		}
	};

	const deletePwd = async (id) => {
		try {
			await api.delete(`/pwds/${id}/`);
			setPwds((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Failed to delete PWD:", err);
		}
	};

	useEffect(() => {
		fetchPwds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddPwd />
				<p
					onClick={fetchPwds}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-xl font-bold">List of PWDs</h1>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 ">
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
							{pwds.length > 0 ? (
								pwds.map((pwd) => (
									<tr
										key={pwd.id}
										className="odd:bg-orange-200 even:bg-gray-50 border-b border-orange-200">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											{pwd.people}
										</th>
										<td className="px-6 py-4">{pwd.age}</td>
										<td className="px-6 py-4">{pwd.gender}</td>
										<td className="px-6 py-4">
											<button
												type="button"
												onClick={() => deletePwd(pwd.id)}
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
										No PWD records found.
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

export default Pwd;
