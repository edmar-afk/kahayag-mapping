import { useState, useEffect } from "react";
import PwdCharts from "./charts/PwdCharts";
import InfrasChart from "./charts/InfrasChart";
import SeniorCharts from "./charts/SeniorCharts";
import HouseholdChart from "./charts/HouseholdChart";
import FeedbackChart from "./charts/FeedbackChart";

function Sidebar({ isVisible, categoryKey }) {
	const [isResizing, setIsResizing] = useState(false);

	useEffect(() => {
		if (isVisible) {
			const resizeChart = () => window.dispatchEvent(new Event("resize"));
			resizeChart();
			const t1 = setTimeout(resizeChart, 200);
			const t2 = setTimeout(resizeChart, 500);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
			};
		}
	}, [isVisible, categoryKey]);

	useEffect(() => {
		const delayTimer = setTimeout(() => {
			setIsResizing(true);
			const resetTimer = setTimeout(() => {
				setIsResizing(false);
			}, 1300);
			return () => clearTimeout(resetTimer);
		}, 1000);

		return () => clearTimeout(delayTimer);
	}, [categoryKey]);

	return (
		<div
			className={`fixed top-0 right-0 z-[9999] h-screen bg-white p-4 shadow-lg transition-all duration-300`}
			style={{ width: isResizing ? "501px" : "500px" }}>
			<div className="h-[calc(100%-56px)] overflow-y-auto overflow-x-hidden pt-8 space-y-4">
				{categoryKey === "pwds" ? (
					<PwdCharts />
				) : categoryKey === "infras" ? (
					<InfrasChart />
				) : categoryKey === "seniors" ? (
					<SeniorCharts />
				) : categoryKey === "households" ? (
					<HouseholdChart />
				) : categoryKey === "feedbacks" ? (
					<FeedbackChart />
				) : (
					<p className="text-gray-500 text-center pt-44 text-xl">No Data found.</p>
				)}
			</div>
		</div>
	);
}

export default Sidebar;
