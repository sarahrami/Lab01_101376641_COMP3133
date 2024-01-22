const fs = require('fs');
const csv = require('csv-parser');

const dataArray = []

// Writing to a file
const writeToFile = (file, data) => {
    const writeFile = fs.createWriteStream(file)
    writeFile.write('country,year,population\n')
    data.forEach(row => writeFile.write(`${row.country},${row.year},${row.population}\n`))
    writeFile.end()
};

// a. Deleting files
['canada.txt', 'usa.txt'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file)
    }
});

// b & c. Filter data for usa & canada

fs.createReadStream('input_countries.csv').pipe(csv())
    .on('data', (data) => dataArray.push(data)).on('end', () => {
        
        const canada = dataArray.filter(row => row.country.toLowerCase() === 'canada')
        const usa = dataArray.filter(row => row.country.toLowerCase() === 'united states')

        writeToFile('canada.txt', canada)
        writeToFile('usa.txt', usa)
    });

