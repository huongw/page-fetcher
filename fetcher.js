const args = process.argv.slice(2);
const fs = require('fs');
const request = require('request');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const URL = args[0];
const filePath = args[1];

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  fs.writeFile(filePath, body, err => {
    if (err) {
      console.error("its an error:", err);
      return;
    }

    if (fs.existsSync(filePath)) {
      rl.question(`You are about to overwrite your file path! Type Y to continue, otherwise CTRL + C to exit \n`, (answer) => {
        if (answer === `Y`) {
          console.log(`Overwritten ${filePath}`);
        }

        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${filePath}`);

        rl.close();
      });
    }


    
  });
});


