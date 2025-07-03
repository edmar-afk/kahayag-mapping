import { useState, useEffect } from "react";import api from "../../assets/api";

function HouseholdChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<div className="pt-4">
			<p className="text-center text-lg font-semibold my-12">
				Household Members
			</p>

			{data.length === 0 ? (
				<p className="text-center text-gray-500 italic">No household data available.</p>
			) : (
				data.map((household, index) => (
					<div
						key={index}
						className="mb-12">
						<h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{household.family_name} Family</h2>

						{household.members && household.members.length > 0 ? (
							<div className="overflow-x-auto shadow rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead>
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Name
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Age
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Role
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{household.members.map((member, i) => (
											<tr key={i}>
												<td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
												<td className="px-6 py-4 whitespace-nowrap">{member.age}</td>
												<td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
												<td className="px-6 py-4 whitespace-nowrap"></td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<p className="text-center text-gray-500 italic">No family members found.</p>
						)}
					</div>
				))
			)}
		</div>
	);
}

export default HouseholdChart;
