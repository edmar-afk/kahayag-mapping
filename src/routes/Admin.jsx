import { useState } from "react";import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pwd from "./Pwd";
import Seniors from "./Seniors";
import Infrastructure from "./Infrastructures";
import Household from "./Household";
import HouseholdMembers from "./HouseholdMembers";

// MUI Icons & Tooltip
import HomeIcon from "@mui/icons-material/Home";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
import ElderlyIcon from "@mui/icons-material/Elderly";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

function Admin() {
	const [activeTab, setActiveTab] = useState("dashboard");

	const navItems = [
		{ id: "dashboard", label: "Dashboard", icon: <HomeIcon fontSize="medium" /> },
		{ id: "pwd", label: "PWD", icon: <WheelchairPickupIcon fontSize="medium" /> },
		{ id: "seniors", label: "Seniors", icon: <ElderlyIcon fontSize="medium" /> },
		{ id: "infras", label: "Infrastructure", icon: <ApartmentIcon fontSize="medium" /> },
		{ id: "household", label: "Household", icon: <GroupsIcon fontSize="medium" /> },
		{ id: "householdMembers", label: "Household Members", icon: <PersonIcon fontSize="medium" /> },
	];

	return (
		<div className="flex h-screen bg-yellow-50">
			<aside className="w-20 bg-white border-r border-yellow-300">
				<div className="h-full flex flex-col items-center py-4">
					<div className="p-2">
						<img
							src="https://tailwindflex.com/images/logo.svg"
							alt="Logo"
							className="h-8 w-8"
						/>
					</div>

					<nav className="flex-1 w-full px-2 space-y-2 mt-6">
						{navItems.map(({ id, icon, label }) => (
							<Tooltip
								key={id}
								title={label}
								placement="right">
								<button
									onClick={() => setActiveTab(id)}
									className={`w-full p-3 flex justify-center rounded-lg transition-colors ${
										activeTab === id ? "bg-yellow-100 text-yellow-600" : "text-gray-500 hover:bg-yellow-50"
									}`}>
									{icon}
								</button>
							</Tooltip>
						))}
					</nav>

					<div className="mt-auto pb-4">
						<Tooltip
							title="Logout"
							placement="right">
							<Link
								to="/"
								className="w-12 h-12 flex items-center justify-center rounded-full text-gray-500 hover:bg-yellow-100 hover:text-yellow-600">
								<LogoutIcon fontSize="medium" />
							</Link>
						</Tooltip>
					</div>
				</div>
			</aside>

			<main className="flex-1 p-6">
				{activeTab === "dashboard" && <Dashboard />}
				{activeTab === "pwd" && <Pwd />}
				{activeTab === "seniors" && <Seniors />}
				{activeTab === "infras" && <Infrastructure />}
				{activeTab === "household" && <Household />}
				{activeTab === "householdMembers" && <HouseholdMembers />}
			</main>
		</div>
	);
}

export default Admin;
