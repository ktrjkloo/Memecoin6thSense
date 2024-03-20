const {writeFile} = require('fs');
const csvFilePath='./birdeye_gems_1710414039426.csv';
const csv = require('csvtojson');
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    const config = jsonObj;
    console.log(config);
    const path = './info.json';

    writeFile(path, JSON.stringify(config, null, 2), (error) => {
        if (error) {
        console.log('An error has occurred ', error);
        return;S
        }
        console.log('Data written successfully to disk');
});
})
 
// Async / await usage
