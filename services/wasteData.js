const fs = require('fs');
const path = require('path');

const wasteDataPath = path.join(process.cwd(), 'wasteData.json');


async function getWasteData() {
    try {
        if (!fs.existsSync(wasteDataPath)) {
            await fs.promises.writeFile(wasteDataPath, '[]');
            return [];
        }
        const fileData = await fs.promises.readFile(wasteDataPath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading waste data:', error);
        throw new Error('Could not read waste data.');
    }
}


async function addWasteItem(item) {
    try {
        const wasteData = await getWasteData();
        wasteData.push(item);
        await fs.promises.writeFile(wasteDataPath, JSON.stringify(wasteData, null, 2));
    } catch (error) {
        console.error('Error writing waste data:', error);
        throw new Error('Could not save waste data.');
    }
}

module.exports = {
    getWasteData,
    addWasteItem
};