import { useEffect, useState } from "react";import api from "../assets/api";
import AddMembers from "../components/admin/AddMembers";

function HouseholdMembers() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddMembers />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-orange-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container mx-auto p-4">
				<h1 className="mb-4 text-xl font-bold">List of Household Members</h1>

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
									Member Name
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Age
								</th>
								<th
									scope="col"
									className="px-6 py-3">
									Role
								</th>
							</tr>
						</thead>
						<tbody>
							{households.length > 0 ? (
								households.flatMap((household) =>
									household.members.map((member, idx) => (
										<tr
											key={member.id}
											className="odd:bg-orange-200 even:bg-gray-50 border-b border-orange-200">
											<td className="px-6 py-4">{idx === 0 ? household.family_name : ""}</td>
											<td className="px-6 py-4">{member.name}</td>
											<td className="px-6 py-4">{member.age}</td>
											<td className="px-6 py-4">{member.role}</td>
										</tr>
									))
								)
							) : (
								<tr>
									<td
										colSpan="4"
										className="px-6 py-4 text-center text-gray-500">
										No household members found.
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

export default HouseholdMembers;
