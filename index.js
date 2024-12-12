import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([{
        message: "Type in your URL: ",
        name: "URL",
    }])
    .then((answers) => {
        const url = answers.URL;
        var qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream("qr-image.png"));
        fs.writeFile("URL.txt", url, (err) => {
            if(err) throw err;
            console.log("The file has been saved!");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            //indicating that the prompt cannot be displayed in the current environment.
            console.error("This operation requires a Teletypewriter.");
        } else {
            console.error("An unexpected error occured: ", error.message);
        }
    })