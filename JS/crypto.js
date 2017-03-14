const prompt = require('prompt');
const readline = require('readline');

var main = () => {
    console.log("test");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var textToCrypt;


    rl.question('Quel texte voulez-vous crypter ?', (answer) => {
        rl.close();
        textToCrypt = answer;
        console.log(textToCrypt);
    });



}


main();
