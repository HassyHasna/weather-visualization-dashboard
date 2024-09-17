document.addEventListener('DOMContentLoaded', () => {
    const ctx1 = document.getElementById('chart1').getContext('2d');
    const ctx2 = document.getElementById('chart2').getContext('2d');
    
    // Create Chart instances with initial empty data
    const chart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [], // This will be filled dynamically
            datasets: [{
                label: '',
                data: [], // This will be filled dynamically
                borderColor: '#ffab00', // Brighter color for line
                backgroundColor: 'rgba(255, 171, 0, 0.2)', // Light background color
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#ffab00', // Bright color for X-axis title
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0', // Bright color for X-axis labels
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '',
                        color: '#ffab00', // Bright color for Y-axis title
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0', // Bright color for Y-axis labels
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });

    const chart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: [], // This will be filled dynamically
            datasets: [{
                label: '',
                data: [], // This will be filled dynamically
                backgroundColor: '#ffab00', // Brighter color for bars
                borderColor: '#e65100', // Darker border color
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                        color: '#ffab00', // Bright color for X-axis title
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0', // Bright color for X-axis labels
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '',
                        color: '#ffab00', // Bright color for Y-axis title
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        color: '#e0e0e0', // Bright color for Y-axis labels
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('applyFilters').addEventListener('click', () => {
        const dataType = document.getElementById('dataType').value;
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);

        // Fetch and render data based on selected filters
        fetchDataAndRenderCharts(dataType, startDate, endDate);
    });

    function fetchDataAndRenderCharts(dataType, startDate, endDate) {
        // Fetch data based on the filters (this is a placeholder function)
        const data = getDataBasedOnFilters(dataType, startDate, endDate);

        // Render charts
        renderChart1(data, dataType);
        renderChart2(data, dataType);
    }

    function renderChart1(data, dataType) {
        chart1.data.labels = data.labels;
        chart1.data.datasets[0].data = data.values;
        chart1.data.datasets[0].label = `Data: ${dataType}`;
        chart1.options.scales.y.title.text = `Units: ${data.unit}`;
        chart1.update();
    }

    function renderChart2(data, dataType) {
        chart2.data.labels = data.labels;
        chart2.data.datasets[0].data = data.values;
        chart2.data.datasets[0].label = `Data: ${dataType}`;
        chart2.options.scales.y.title.text = `Units: ${data.unit}`;
        chart2.update();
    }

    function getDataBasedOnFilters(dataType, startDate, endDate) {
        // Placeholder data for demonstration purposes
        const months = ['February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January'];
        const data = {
            temperature: {
                values: [28, 25, 22, 20, 18, 17, 19, 22, 25, 27, 30, 30],
                unit: '°C'
            },
            humidity: {
                values: [65, 60, 55, 50, 45, 40, 43, 47, 50, 55, 60, 70],
                unit: '%'
            },
            precipitation: {
                values: [100, 80, 70, 60, 50, 40, 30, 20, 10, 5, 0, 120],
                unit: 'mm'
            },
            'wind-speed': {
                values: [18, 20, 22, 25, 28, 30, 32, 35, 37, 40, 42, 15],
                unit: 'km/h'
            }
        };

        const selectedData = data[dataType] || { values: [], unit: '' };

        // Filter data based on date range (this example assumes monthly data)
        const filteredLabels = months.filter((month, index) => {
            const monthDate = new Date(`2024-${index + 1}-01`);
            return monthDate >= startDate && monthDate <= endDate;
        });

        const filteredValues = filteredLabels.map((month) => selectedData.values[months.indexOf(month)]);

        return {
            labels: filteredLabels,
            values: filteredValues,
            unit: selectedData.unit
        };
    }
});
