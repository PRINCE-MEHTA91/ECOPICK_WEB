document.addEventListener('DOMContentLoaded', () => {
    const isIndexPage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    if (isIndexPage) {
        const totalMaterialsEl = document.getElementById('total-materials');
        const totalKgEl = document.getElementById('total-kg');
        const totalPriceEl = document.getElementById('total-price');

        const options = {
            duration: 2.5,
            separator: ',',
            decimal: '.',
        };

        const totalMaterialsAnim = new CountUp(totalMaterialsEl, 0, options);
        const totalKgAnim = new CountUp(totalKgEl, 0, { ...options, decimalPlaces: 2 });
        const totalPriceAnim = new CountUp(totalPriceEl, 0, { ...options, decimalPlaces: 2, prefix: '₹' });

        const startAnimations = (data) => {
            totalMaterialsAnim.update(data.totalMaterials || 0);
            totalKgAnim.update(data.totalKilograms || 0);
            totalPriceAnim.update(data.totalValue || 0);
        };
        
        // Fetch initial data
        fetch('/api/global-stats')
            .then(response => response.json())
            .then(data => {
                startAnimations(data);
            })
            .catch(error => console.error('Error fetching initial stats:', error));

        // WebSocket connection
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}`);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            startAnimations(data);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
});
