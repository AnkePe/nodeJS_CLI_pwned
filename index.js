#!/usr/bin/env node     
//vorige lijn wordt shebang genoemd of bang-line

// console.log("Hello, Node.JS!");
const validator = require("email-validator");   //validates the email adress
const axios = require("axios");                 //voor het uitvoeren van HTTP requests
const chalk = require('chalk');                 //om met kleurtjes te werken in de terminal
const problem = chalk.red.bold;
const ok = chalk.black.bgGreenBright;

// validator.validate("ankepeeraer@hotmail.com"); // true

// console.log(process.argv)

// const email = `tjilpie@hotmail.com`  // vb van een gepwned mailadres
const email = process.argv[2]           // hiermee haal je de argumenten uit de command line
// console.log(email)

const mailVal = validator.validate(email)   //returns true or false
if(mailVal) {
    // console.log(`dit is een geldig emailadres`)
    const encodedEmail = encodeURIComponent(email)  //
    // console.log(encodedEmail)

    // GET https://haveibeenpwned.com/api/v2/breachedaccount/{account}
    // voorbeeld van axios:
                // axios.get('/user', {
                //     params: {
                //       ID: 12345
                //     }
                //   })


    axios.get(`https://haveibeenpwned.com/api/v2/breachedaccount/${encodedEmail}`, {
        "headers" : {"User-Agent" : "Node CLI Tool"}    // werkt niet zonder user-agent
    })
    .then(function (response) {
        // console.log(response.data);                  // geeft de data weer als je gepwned bent
        console.log(problem(`OOPS, you've been pwned`))
    })
    .catch(function (error) {
        console.log(ok(`EVERYTHING OK, you've not been pwned`));         // als er niks mis is met mailadres, mislukt de request
    });
  
}
else {console.log(problem(`This is not a valid email adress.`))}
