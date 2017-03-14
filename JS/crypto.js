const readline = require('readline');
const _ = require('lodash');
const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    " "
];

var vigenereEncryption = () => {
    console.log("test");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    var textToCrypt;
    var keyToCrypt;
    var encryptedText = "";
    rl.question('Quel texte voulez-vous crypter ?', (answer) => {
        textToCrypt = answer;
        rl.close();
        const r2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        r2.question('Avec quelle clé voulez-vous crypter ?', (answer) => {
            keyToCrypt = answer;
            r2.close();
            console.log("le text est : " + textToCrypt);
            console.log("la clé est : " + keyToCrypt);
            var shift = _.indexOf(alphabet, keyToCrypt);
            for (var i = 0; i < textToCrypt.length; i++) {
                let letterInCode = _.indexOf(alphabet, textToCrypt[i]);
                let encryptedLetterInCode = (letterInCode + shift) % alphabet.length;
                encryptedText += alphabet[encryptedLetterInCode];
            }
            console.log(`le text crypté est : "${encryptedText}"`);

        });

    });



}


vigenereEncryption();
