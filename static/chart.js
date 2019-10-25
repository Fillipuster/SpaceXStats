function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

let ctx = document.getElementById("chart").getContext("2d");
window.chart = new Chart(ctx, {
	type: "scatter",
	data: {
		datasets: [
			{
				label: "Scatter Dataset",
				data: [],

				pointBackgroundColor: "#6ACCFF",
				// pointBorderColor: "#757575",
				// borderColor: "#B23333",
				showLine: true,
				pointHoverRadius: 10,
				tension: 0.3,
				fill: false
			}
		]
	},
});

function addRandomPoint() {
	let y = getRandomInt(20);
	let x = window.chart.data.datasets[0].data.length + 1;
	window.chart.data.datasets[0].data.push({ x, y });
	window.chart.update();
}

function tick() {
	if (tick) {
		addRandomPoint();
	}
}

window.timer = window.setInterval(tick, 500);
