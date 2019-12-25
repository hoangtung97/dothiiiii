$(function () {

	var revenueSplineAreaChart = new CanvasJS.Chart("revenue-spline-area-chart", {
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX: {
			interval: 2,
			intervalType: "month",
			labelFontColor: "#717171",
			labelFontSize: 16,
			lineColor: "#a2a2a2",
			minimum: new Date("1 Jan 2019"),
			tickColor: "#a2a2a2",
			valueFormatString: "MMM YYYY"
		},
		axisY: {
			gridThickness: 0,
			includeZero: false,
			labelFontColor: "#717171",
			labelFontSize: 16,
			lineColor: "#a2a2a2",
			prefix: "$",
			tickColor: "#a2a2a2"
		},
		toolTip: {
			borderThickness: 0,
			cornerRadius: 0,
			fontStyle: "normal"
		},
		data: [
			{
				color: "#393f63",
				markerSize: 0,
				type: "splineArea",
				yValueFormatString: "$###,###.##",
				dataPoints: [
					{ x: new Date("1 Jan 2019"), y: 2000000 },
					{ x: new Date("1 Feb 2019"), y: 195300 },
					{ x: new Date("1 Mar 2019"), y: 214200 },
					{ x: new Date("1 Apr 2019"), y: 207900 },
					{ x: new Date("1 May 2019"), y: 226800 },
					{ x: new Date("1 Jun 2019"), y: 220500 },
					{ x: new Date("1 Jul 2019"), y: 239400 },
					{ x: new Date("1 Aug 2019"), y: 258300 },
					{ x: new Date("1 Sep 2019"), y: 252000 },
					{ x: new Date("1 Oct 2019"), y: 264600 },
					{ x: new Date("1 Nov 2019"), y: 258300 },
					{ x: new Date("1 Dec 2019"), y: 270900 }
				]
			}
		]
	});
	
	revenueSplineAreaChart.render();

	var allCharts = [
		revenueSplineAreaChart,
		annualRevenueByCategoryPieChart,
		monthlyRevenueByCategoryColumnChart,
		visitorsChart,
		usersSplineChart
	];
	
	function populateMonthlyRevenueByCategoryChart() {
		for (var prop in dataMonthlyRevenueByCategory)
			if  (dataMonthlyRevenueByCategory.hasOwnProperty(prop))
				monthlyRevenueByCategoryColumnChart.options.data.push( dataMonthlyRevenueByCategory[prop] );
	}
	
	function monthlyRevenueByCategoryDrilldownHandler(e) {
		monthlyRevenueByCategoryColumnChart.options.data = [];

		for (var i = 0; i < annualRevenueByCategoryPieChart.options.data[0].dataPoints.length; i++)
			if (annualRevenueByCategoryPieChart.options.data[0].dataPoints[i].exploded === true)
				monthlyRevenueByCategoryColumnChart.options.data.push( dataMonthlyRevenueByCategory[annualRevenueByCategoryPieChart.options.data[0].dataPoints[i].name] );

		if (monthlyRevenueByCategoryColumnChart.options.data.length === 0)
			populateMonthlyRevenueByCategoryChart();

		monthlyRevenueByCategoryColumnChart.render();
	}
	function renderAllCharts() {
		for (var i = 0; i < allCharts.length; i++)
			allCharts[i].render();
	}
	
	function sidebarToggleOnClick() {
		$('#sidebar-toggle-button').on('click', function () {
			$('#sidebar').toggleClass('sidebar-toggle');
			$('#page-content-wrapper').toggleClass('page-content-toggle');
			renderAllCharts();
		});	
	}
	
	(function init() {
		chartPropertiesCustomization();
		$(window).resize(chartPropertiesCustomization);
		sidebarToggleOnClick();
	})();
	
});