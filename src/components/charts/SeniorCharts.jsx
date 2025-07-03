import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function SeniorCharts() {
	const [, setData] = useState([]);
	const [genderSeries, setGenderSeries] = useState([]);
	const [ageLabels, setAgeLabels] = useState([]);

	useEffect(() => {
		const fetchSeniors = async () => {
			try {
				const response = await api.get(`/api/seniors/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const genderAgeMap = {};

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (!genderAgeMap[age]) {
							genderAgeMap[age] = { Male: 0, Female: 0 };
						}
						if (gender === "Male" || gender === "Female") {
							genderAgeMap[age][gender]++;
						}
					}
				});

				const sortedAges = Object.keys(genderAgeMap)
					.map(Number)
					.sort((a, b) => a - b);

				setAgeLabels(sortedAges.map(String));

				setGenderSeries([
					{
						name: "Male",
						data: sortedAges.map((age) => genderAgeMap[age]?.Male || 0),
					},
					{
						name: "Female",
						data: sortedAges.map((age) => genderAgeMap[age]?.Female || 0),
					},
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setGenderSeries([]);
				setAgeLabels([]);
			}
		};

		fetchSeniors();
	}, []);

	const styledBarOptions = {
		chart: {
			type: "bar",
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				borderRadius: 10,
				dataLabels: {
					position: "top",
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val) => val,
			offsetY: -20,
			style: {
				fontSize: "12px",
				colors: ["#304758"],
			},
		},
		xaxis: {
			categories: ageLabels,
			position: "top",
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				fill: {
					type: "gradient",
					gradient: {
						colorFrom: "#D8E3F0",
						colorTo: "#BED1E6",
						stops: [0, 100],
						opacityFrom: 0.4,
						opacityTo: 0.5,
					},
				},
			},
			tooltip: {
				enabled: true,
			},
			title: {
				text: "Age",
			},
		},
		yaxis: {
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
			},
			title: {
				text: "Senior Count",
			},
		},

		legend: {
			position: "right",
			offsetY: 40,
		},
		fill: {
			opacity: 1,
		},
	};

	return (
		<div className="pt-4 min-h-[400px]">
			<p className="text-center font-bold mb-12">Seniors chart</p>
			<Chart
				options={styledBarOptions}
				series={genderSeries}
				type="bar"
				height={390}
			/>
		</div>
	);
}

export default SeniorCharts;
