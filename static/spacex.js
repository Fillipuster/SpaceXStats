function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function sleep(millis) {
	let e = new Date().getTime() + millis;
	while (new Date().getTime() <= e) {}
}

let ctx = document.getElementById("chart").getContext("2d");
window.chart = new Chart(ctx, {
	type: "bar",
	data: {
		labels: [],
		datasets: [
			{
				label: "Successful Launches",
				data: [],
				backgroundColor: "#74E06C",
				stack: "launches"
			},
			{
				label: "Unsuccessful Launches",
				data: [],
				backgroundColor: "#C64B4B",
				stack: "launches"
			},
			{
				label: "Upcoming Launches",
				data: [],
				backgroundColor: "#647CE4",
				stack: "launches"
			}
		]
	},
	options: {
		scales: {
			yAxes: [
				{
					stacked: true
				}
			]
		}
	}
});

fetch("https://api.spacexdata.com/v3/launches")
	.then(res => res.json())
	.then(launches => {
		console.log(launches);

		let year = 0;
		let dataIndex = -1;
		for (let launch of launches) {
			if (launch.launch_year > year) {
				year = launch.launch_year;
				window.chart.data.labels.push(year);
				dataIndex++;
				window.chart.data.datasets[0].data[dataIndex] = 0;
				window.chart.data.datasets[1].data[dataIndex] = 0;
				window.chart.data.datasets[2].data[dataIndex] = 0;
			}

			if (!launch.upcoming) {
				if (launch.launch_success) {
					window.chart.data.datasets[0].data[dataIndex]++;
				} else {
					window.chart.data.datasets[1].data[dataIndex]++;
				}
			} else {
				window.chart.data.datasets[2].data[dataIndex]++;
			}
		}

		window.chart.update();
	});
