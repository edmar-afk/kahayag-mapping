import { useState, useEffect } from "react";import api from "../../assets/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<div className="relative flex flex-col justify-center overflow-hidden">
			<div
				className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer pr-6 pb-6"
				onClick={fetchFeedback}>
				<RefreshIcon fontSize="small" />
				<p>Refresh</p>
			</div>

			{data.length > 0 ? (
				<div className="flex flex-col items-center space-y-6">
					{data.map((item, index) => (
						<div
							key={index}
							className="group relative cursor-pointer overflow-hidden bg-yellow-100 rounded-xl w-[400px] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto">
							<span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-yellow-500 transition-all duration-300 group-hover:scale-[10]"></span>
							<div className="relative z-10 mx-auto max-w-md">
								<span className="grid h-20 w-20 place-items-center rounded-full bg-yellow-500 transition-all duration-300 group-hover:bg-yellow-400">
									<ChatBubbleIcon className="h-4 w-4 text-white transition-all" />
								</span>
								<div className="space-y-6 pt-5 text-base text-gray-600 transition-all duration-300 group-hover:text-white/90">
									<p className="italic font-light text-lg mb-1">"{item.feedback}"</p>
									<p className="uppercase font-bold">{item.name}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<p className="text-center text-gray-500 italic">No feedbacks found.</p>
			)}
		</div>
	);
}

export default FeedbackChart;
