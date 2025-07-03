import React, { useEffect, useState } from "react";
import api from "../assets/api";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ElderlyIcon from "@mui/icons-material/Elderly";
import GroupIcon from "@mui/icons-material/Group";
import LocationCityIcon from "@mui/icons-material/LocationCity";

function Dashboard() {
	const [stats, setStats] = useState({
		total_pwds: 0,
		total_seniors: 0,
		total_households: 0,
		total_infrastructures: 0,
	});

	useEffect(() => {
		api.get("/api/stats/").then((res) => {
			setStats(res.data);
		});
	}, []);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Supon Overall Statistics</h1>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-semibold text-gray-700">PWDs</h2>
					
					</div>
					<p className="text-3xl font-bold text-blue-600">{stats.total_pwds}</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-semibold text-gray-700">Seniors</h2>
						
					</div>
					<p className="text-3xl font-bold text-green-600">{stats.total_seniors}</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-semibold text-gray-700">Households</h2>
						
					</div>
					<p className="text-3xl font-bold text-purple-600">{stats.total_households}</p>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
					<div className="flex items-center justify-between mb-2">
						<h2 className="text-xl font-semibold text-gray-700">Infrastructures</h2>
						
					</div>
					<p className="text-3xl font-bold text-orange-600">{stats.total_infrastructures}</p>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
