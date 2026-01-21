let myChart;

async function updateDashboard() {
    const start = document.getElementById('start_date').value;
    const end = document.getElementById('end_date').value;
    const selectedField = document.getElementById('field_selector').value;

    // 1. Fetch Metrics
    const metricsRes = await fetch(`/climate/metrics?start_date=${start}&end_date=${end}&field=${selectedField}`);
    const metrics = await metricsRes.json();
    
    document.getElementById('m_avg').innerText = metrics.average?.toFixed(2) || 0;
    document.getElementById('m_min').innerText = metrics.min || 0;
    document.getElementById('m_max').innerText = metrics.max || 0;
    document.getElementById('m_std').innerText = metrics.stdDev?.toFixed(2) || 0;
    document.getElementById('m_count').innerText = metrics.count || 0;

    // 2. Fetch Time-Series Data
    const dataRes = await fetch(`/climate?start_date=${start}&end_date=${end}`);
    const rawData = await dataRes.json();

    const labels = rawData.map(d => d.date);
    const values = rawData.map(d => d[selectedField])

    console.log(values)

    // 3. Render Chart
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');
    
    if (myChart) myChart.destroy(); // Clear old chart before redrawing

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: selectedField,
                data: values,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}

// Initial load
updateDashboard();