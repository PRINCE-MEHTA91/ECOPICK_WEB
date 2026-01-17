const fs = require('fs');
const path = require('path');

const globalStatsPath = path.join(process.cwd(), 'globalStats.json');


async function getGlobalStats() {
    try {
        if (!fs.existsSync(globalStatsPath)) {
            const initialStats = { totalMaterials: 0, totalKilograms: 0, totalValue: 0 };
            await fs.promises.writeFile(globalStatsPath, JSON.stringify(initialStats, null, 2));
            return initialStats;
        }
        const fileData = await fs.promises.readFile(globalStatsPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading global stats:', error);
        throw new Error('Could not read global stats.');
    }
}


async function updateGlobalStats(newlyAdded) {
    try {
        const stats = await getGlobalStats();
        stats.totalMaterials += 1;
        stats.totalKilograms += newlyAdded.weight;
        stats.totalValue += newlyAdded.earnings;
        await fs.promises.writeFile(globalStatsPath, JSON.stringify(stats, null, 2));
        return stats;
    } catch (error) {
        console.error('Error writing global stats:', error);
        throw new Error('Could not save global stats.');
    }
}

module.exports = {
    getGlobalStats,
    updateGlobalStats
};