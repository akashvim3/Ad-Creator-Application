// Analytics Dashboard - Chart.js Implementation
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeFilters();
});

// Initialize All Charts
function initializeCharts() {
    // Mini sparkline charts for metric cards
    initializeMetricCharts();

    // Main performance trends chart
    initializePerformanceTrendsChart();

    // Audience insights charts
    initializeAudienceCharts();
}

// Metric Card Sparkline Charts
function initializeMetricCharts() {
    const chartConfigs = [
        {
            id: 'impressionsChart',
            data: [3200, 3800, 3500, 4200, 4500, 4800, 5200],
            color: '#667eea'
        },
        {
            id: 'ctrChart',
            data: [3.2, 3.5, 3.8, 3.6, 4.0, 4.2, 4.2],
            color: '#43e97b'
        },
        {
            id: 'conversionsChart',
            data: [1200, 1350, 1280, 1520, 1680, 1750, 1847],
            color: '#f093fb'
        },
        {
            id: 'cpcChart',
            data: [0.52, 0.50, 0.48, 0.47, 0.46, 0.45, 0.45],
            color: '#4facfe'
        }
    ];

    chartConfigs.forEach(config => {
        const canvas = document.getElementById(config.id);
        if (canvas) {
            createSparklineChart(canvas, config.data, config.color);
        }
    });
}

// Create Sparkline Chart
function createSparklineChart(canvas, data, color) {
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: hexToRgba(color, 0.1),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: color,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    displayColors: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 8,
                    cornerRadius: 8,
                    titleFont: { size: 12 },
                    bodyFont: { size: 14 }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: { display: false }
                },
                y: {
                    display: false,
                    grid: { display: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Performance Trends Chart
function initializePerformanceTrendsChart() {
    const canvas = document.getElementById('performanceTrendsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Create gradient fills
    const impressionsGradient = ctx.createLinearGradient(0, 0, 0, 400);
    impressionsGradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
    impressionsGradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

    const clicksGradient = ctx.createLinearGradient(0, 0, 0, 400);
    clicksGradient.addColorStop(0, 'rgba(67, 233, 123, 0.3)');
    clicksGradient.addColorStop(1, 'rgba(67, 233, 123, 0)');

    const conversionsGradient = ctx.createLinearGradient(0, 0, 0, 400);
    conversionsGradient.addColorStop(0, 'rgba(240, 147, 251, 0.3)');
    conversionsGradient.addColorStop(1, 'rgba(240, 147, 251, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12', 'Feb 19', 'Feb 26', 'Mar 5'],
            datasets: [
                {
                    label: 'Impressions',
                    data: [12500, 15200, 14800, 18500, 19200, 22100, 21800, 24500, 23900, 26200],
                    borderColor: '#667eea',
                    backgroundColor: impressionsGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#667eea',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Clicks',
                    data: [450, 580, 520, 695, 720, 850, 815, 920, 885, 1050],
                    borderColor: '#43e97b',
                    backgroundColor: clicksGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#43e97b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#43e97b',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 3
                },
                {
                    label: 'Conversions',
                    data: [125, 162, 148, 198, 215, 248, 232, 278, 265, 310],
                    borderColor: '#f093fb',
                    backgroundColor: conversionsGradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#f093fb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#f093fb',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 10, 26, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#b4b4b4',
                    borderColor: '#2d2d44',
                    borderWidth: 1,
                    padding: 16,
                    cornerRadius: 12,
                    displayColors: true,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: { size: 14, weight: '600' },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toLocaleString();
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#2d2d44',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#b4b4b4',
                        font: { size: 12 },
                        padding: 10
                    }
                },
                y: {
                    grid: {
                        color: '#2d2d44',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#b4b4b4',
                        font: { size: 12 },
                        padding: 10,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Audience Charts
function initializeAudienceCharts() {
    // Age Distribution Chart
    const ageCanvas = document.getElementById('ageChart');
    if (ageCanvas) {
        new Chart(ageCanvas, {
            type: 'doughnut',
            data: {
                labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
                datasets: [{
                    data: [18, 35, 25, 15, 7],
                    backgroundColor: [
                        '#667eea',
                        '#43e97b',
                        '#f093fb',
                        '#4facfe',
                        '#fa709a'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#b4b4b4',
                            padding: 16,
                            font: { size: 13 },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 26, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#b4b4b4',
                        borderColor: '#2d2d44',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    // Gender Distribution Chart
    const genderCanvas = document.getElementById('genderChart');
    if (genderCanvas) {
        new Chart(genderCanvas, {
            type: 'pie',
            data: {
                labels: ['Male', 'Female', 'Other'],
                datasets: [{
                    data: [48, 46, 6],
                    backgroundColor: [
                        '#667eea',
                        '#f093fb',
                        '#4facfe'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#b4b4b4',
                            padding: 16,
                            font: { size: 13 },
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 26, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#b4b4b4',
                        borderColor: '#2d2d44',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}


// Dashboard Performance Chart (for dashboard.html)
document.addEventListener('DOMContentLoaded', () => {
    const dashboardCanvas = document.getElementById('performanceChart');
    if (dashboardCanvas) {
        const ctx = dashboardCanvas.getContext('2d');

        const impressionsGradient = ctx.createLinearGradient(0, 0, 0, 300);
        impressionsGradient.addColorStop(0, 'rgba(102, 126, 234, 0.3)');
        impressionsGradient.addColorStop(1, 'rgba(102, 126, 234, 0)');

        const clicksGradient = ctx.createLinearGradient(0, 0, 0, 300);
        clicksGradient.addColorStop(0, 'rgba(67, 233, 123, 0.3)');
        clicksGradient.addColorStop(1, 'rgba(67, 233, 123, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Impressions',
                        data: [3200, 4100, 3800, 5200, 4900, 6100, 5800],
                        borderColor: '#667eea',
                        backgroundColor: impressionsGradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: '#667eea',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Clicks',
                        data: [120, 165, 142, 198, 186, 232, 221],
                        borderColor: '#43e97b',
                        backgroundColor: clicksGradient,
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        pointBackgroundColor: '#43e97b',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 10, 26, 0.95)',
                        titleColor: '#fff',
                        bodyColor: '#b4b4b4',
                        borderColor: '#2d2d44',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        boxPadding: 6,
                        usePointStyle: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#2d2d44',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b4b4b4',
                            font: { size: 12 }
                        }
                    },
                    y: {
                        grid: {
                            color: '#2d2d44',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#b4b4b4',
                            font: { size: 12 }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
});

// Filter Functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.date-range-selector .filter-btn, .chart-filters .filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Here you would typically fetch new data and update charts
            console.log('Filter changed to:', this.textContent);

            // Simulate data update
            updateChartsWithNewData();
        });
    });
}

// Update Charts with New Data (simulated)
function updateChartsWithNewData() {
    // This function would typically fetch new data from an API
    // and update all charts accordingly
    console.log('Updating charts with new data...');

    // Add loading state
    showLoadingState();

    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        console.log('Charts updated successfully');
    }, 500);
}

// Loading State Management
function showLoadingState() {
    const charts = document.querySelectorAll('.chart-container, .chart-container-large');
    charts.forEach(chart => {
        chart.style.opacity = '0.5';
        chart.style.pointerEvents = 'none';
    });
}

function hideLoadingState() {
    const charts = document.querySelectorAll('.chart-container, .chart-container-large');
    charts.forEach(chart => {
        chart.style.opacity = '1';
        chart.style.pointerEvents = 'auto';
    });
}

// Utility Functions
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Export Chart Data
function exportChartData(chartId, format = 'csv') {
    console.log(`Exporting chart ${chartId} as ${format}`);
    // Implement export functionality here
    alert(`Exporting chart data as ${format.toUpperCase()}...`);
}

// Print Chart
function printChart(chartId) {
    console.log(`Printing chart ${chartId}`);
    window.print();
}

// Refresh Charts
function refreshCharts() {
    console.log('Refreshing all charts...');
    showLoadingState();

    setTimeout(() => {
        // Re-initialize all charts
        initializeCharts();
        hideLoadingState();

        // Show success notification
        showNotification('Charts refreshed successfully!', 'success');
    }, 1000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#43e97b' : type === 'error' ? '#f5576c' : '#4facfe'};
        color: white;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Real-time Updates Simulation
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time metric updates
        updateMetricValues();
    }, 30000); // Update every 30 seconds
}

function updateMetricValues() {
    // Simulate metric value updates
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach(metric => {
        const currentValue = parseFloat(metric.textContent.replace(/[^0-9.]/g, ''));
        const change = (Math.random() - 0.5) * 100;
        const newValue = currentValue + change;

        // Animate value change
        animateValue(metric, currentValue, newValue, 1000);
    });
}

function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (difference * progress);

        // Format based on original content
        if (element.textContent.includes('K')) {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else if (element.textContent.includes('%')) {
            element.textContent = current.toFixed(1) + '%';
        } else if (element.textContent.includes('$')) {
            element.textContent = '$' + current.toFixed(2);
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Initialize real-time updates if on analytics page
if (window.location.pathname.includes('analytics.html')) {
    startRealTimeUpdates();
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R: Refresh charts
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshCharts();
    }

    // Ctrl/Cmd + E: Export data
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportChartData('performanceTrendsChart', 'csv');
    }

    // Ctrl/Cmd + P: Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printChart('all');
    }
});

// Console info
console.log('%c📊 Analytics Dashboard Loaded', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #43e97b; font-weight: bold;');
console.log('Ctrl/Cmd + R: Refresh charts');
console.log('Ctrl/Cmd + E: Export data');
console.log('Ctrl/Cmd + P: Print charts');
