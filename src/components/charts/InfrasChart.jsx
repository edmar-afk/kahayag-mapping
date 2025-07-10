import { useState, useEffect } from "react";import api from "../../assets/api";
function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://bislig.gov.ph/wp-content/uploads/2021/06/Kahayag-Seal-1-300x300.jpg";

	return (
		<div className="flex flex-col gap-10 justify-center items-center mt-10">
			{data.map((infra, index) => (
				<div
					key={index}
					className="relative max-w-xl w-full mx-auto">
					<img
						className="h-64 w-full object-cover rounded-md"
						src={infra.image || defaultImage}
						alt={infra.name}
					/>
					<div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<h2 className="text-white text-3xl font-bold">{infra.name}</h2>
					</div>
				</div>
			))}
		</div>
	);
}

export default InfrasChart;
