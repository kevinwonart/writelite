const fs = require('fs');
const readline = require('readline');

let config ={};

try{
  const configData =fs.readFileSync('config.json');
  config = JSON.parse(configData);
} catch (err) {
  console.error("error reading config file:", err);
}

const journalFilePath = config.journalFilePath;

console.log("Jrounalfile path: " + journalFilePath);

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
const date = `${year}${month}${day}`;
const filename = journalFilePath + `${date}.md`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



let input = '';

rl.question(`Begin your journal entry for ${date}:\n`, (entry) => {
  input = entry;

  try {
    if(fs.existsSync(filename)) {
      fs.appendFileSync(filename, "\n");
      fs.appendFileSync(filename, input);
    } else {
      fs.writeFileSync(filename, input);
    }
    console.log(`Saved to ./${filename}`);
    } catch (error){
    console.log(`Error: ${error.message}`);
    }
  rl.close();
});
