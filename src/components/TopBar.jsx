import AccessibleIcon from "@mui/icons-material/Accessible";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ElderlyIcon from "@mui/icons-material/Elderly";
import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar({isVisible, onCategorySelect, activeCategory }) {
	const categories = [
		{ label: "PWD", key: "pwds", icon: <AccessibleIcon fontSize="small" /> },
		{ label: "Infrastructure", key: "infras", icon: <ApartmentIcon fontSize="small" /> },
		{ label: "Senior Citizens", key: "seniors", icon: <ElderlyIcon fontSize="small" /> },
		{ label: "Households", key: "households", icon: <HouseIcon fontSize="small" /> },
		{ label: "Feedbacks", key: "feedbacks", icon: <PeopleIcon fontSize="small" /> },
	];

	

	return (
		<div
			className={`bg-white py-6 border-r-4 border-orange-500 fixed top-0 left-0 h-full w-20 z-[999] transition-transform duration-300 ${
				isVisible ? "translate-x-0" : "-translate-x-full"
			}`}>
			<div className="flex flex-col items-center space-y-6 pt-16">
				{categories.map((cat) => (
					<div
						key={cat.key}
						className="relative group">
						<button
							onClick={() => onCategorySelect(cat.key)}
							className={`p-3 cursor-pointer rounded-full transition-colors ${
								activeCategory === cat.key ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-700 hover:text-white"
							}`}>
							{cat.icon}
						</button>
						<span className="absolute left-14 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
							{cat.label}
						</span>
					</div>
				))}
				<Link
					to={"/login"}
					className="mt-24 font-bold">
					Login
				</Link>
			</div>
		</div>
	);
}

export default Sidebar;
