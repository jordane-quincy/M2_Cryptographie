'use strict'
const config = require('config/config');
const gcd = require('gcd');
// const alphabet = config.alphabet;
const freqApparitionLetter = config.freqApparitionLetter;
const readline = require('readline');
const _ = require('lodash');
const menu = require('crypto');

/**
 * Fonction cryptant la lettre en fonction du décallage voulez-vous
 * @param  {char} letter lettre à crypter
 * @param  {int}  shift  Décallage voulu
 * @return {char}        lettre crypté
 */
const encodeLetter = (letter, alphabet, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterIndex + shift) % alphabet.length];
};

const decodeLetter = (letter, alphabet, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    if (letterIndex === -1) {
        return null;
    }
    return alphabet[
        (
            (letterIndex - shift) % alphabet.length >= 0 ?
                (letterIndex - shift) % alphabet.length
                :
                ((letterIndex - shift) % alphabet.length) + alphabet.length
        )
    ];
};

const cesarEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le texte est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToEncode);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToEncode.length; i++) {
                let encodedLetter = encodeLetter(textToEncode[i], alphabet, shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
            }
            console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};

const cesarDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous déchiffrer ? ", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé le texte a été chiffré ? ", answer => {
            let usedKey;
            let decodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le texte est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToDecode);
            let shift = _.indexOf(alphabet, usedKey);
            for (let i = 0; i < textToDecode.length; i++) {
                let decodedLetter = decodeLetter(textToDecode[i], alphabet, shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`le texte déchiffré est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};


const countLetterOccurence = (textToDecrypt) => {
  var mapLetterOccurence = new Map();
  for (let i = 0; i < textToDecrypt.length; i++) {
    let letterCurrent = textToDecrypt[i];
    // console.log(`letterCurrent : "${letterCurrent}"\n`);
    let countLetter = mapLetterOccurence.get(letterCurrent) === undefined ? 0 : mapLetterOccurence.get(letterCurrent);
    // console.log(`countLetter : "${countLetter}"\n`);

    countLetter++;
    mapLetterOccurence.set(letterCurrent, countLetter);
  }

  return mapLetterOccurence;
};

const analyseFrequence = (textToDecrypt) => {
  let mapLetterOccurence = countLetterOccurence(textToDecrypt);

  var maxOccurence = 0;
  var letterMaxOccurence = '';
  for (var [letter, countLetter] of mapLetterOccurence) {
    // console.log(`mapLetterOccurence : "${letter}" = "${countLetter}"`);
    if(countLetter > maxOccurence){
      maxOccurence = countLetter;
      letterMaxOccurence = letter;
    }
  }

  console.log(`letterMaxOccurence : "${letterMaxOccurence}" (${maxOccurence})\n`);

  return letterMaxOccurence;
};

const cesarDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous décrypter ? ", answer => {
        let textToDecrypt = answer;
        rl.close();
        let alphabet = config.getAlphabet(textToDecrypt);

        //On est en français donc la letter qui apparait le plus dans le texte chiffré est un 'e' dans le texte en clair
        let letterMaxOccurence = analyseFrequence(textToDecrypt);

        let shiftLetterMaxOccurence = _.indexOf(alphabet, letterMaxOccurence);

        let shiftLetterE = 4; // le 'E' ou 'e' est toujours à la cinquième place (alphabet[4]) que l'on soit en majuscule ou minuscule

        let shift = ((shiftLetterMaxOccurence - shiftLetterE) % alphabet.length);
        // console.log(`shift : "${shift}"\n`);

        var decodedText = '';
        for (let i = 0; i < textToDecrypt.length; i++) {
            let decodedLetter = decodeLetter(textToDecrypt[i], alphabet, shift);
            // console.log(`textToDecrypt[i] : "${textToDecrypt[i]}" = "${decodedLetter}"\n`);
            if (!decodedLetter) {
                // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                process.exit(1);
            }
            decodedText += decodedLetter;
        }
        console.log(`le texte déchiffré est : "${decodedText}"\n\n\n`);
        next();
    });
};

const vigenereEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le texte est : " + textToEncode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToEncode);
            for (let i = 0; i < textToEncode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                //console.log(`usedKey : "${usedKey[i % usedKey.length]}"\n`);
                let encodedLetter = encodeLetter(textToEncode[i], alphabet, shift);
                if (!encodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                encodedText += encodedLetter;
                //console.log(`encodedText : "${encodedText}"\n`);
            }
            console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};


const vigenereDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous déchiffrer ? ", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé le texte a été chiffré ? ", (answer) => {
            let usedKey;
            let decodedText = "";
            usedKey = answer;
            r2.close();
            console.log("le texte est : " + textToDecode);
            console.log("la clé est : " + usedKey);
            let alphabet = config.getAlphabet(textToDecode);
            for (let i = 0; i < textToDecode.length; i++) {
                let shift = _.indexOf(alphabet, usedKey[i % usedKey.length]);
                let decodedLetter = decodeLetter(textToDecode[i], alphabet, shift);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecode[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`le texte crypté est : "${decodedText}"\n\n\n`);
            next();
        });
    });
};

const generatePermutationKey = (alphabet) => {
    // On va générer une clé au hasard en inversant les lettres de l'alphabet
    let key = "";
    let copiedAlphabet = [...alphabet];
    while (copiedAlphabet.length > 0) {
        // On choisi un nombre random entre 0 et la taille de l'alphabet
        let random = Math.floor(Math.random() * copiedAlphabet.length);
        key += copiedAlphabet[random];
        copiedAlphabet.splice(random, 1);
    }
    return key;
};


const isGoodPermuttationKey = (key, alphabet) => {
    // On vérifie si la clé donnée est bonne (2 lettres ne peuvent pas être chiffrer par la même lettre)
    if (key.length !== alphabet.length) {
        return false;
    }
    return alphabet.every(letter => {
        var reg = new RegExp("[^" + letter + "]", "g");
        return key.replace(reg, "").length === 1;
    });
};

const askKeyForPermuttationEncoding = (textToEncode, alphabet, callback, finalCallback) => {
    const r3 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    console.log(`Votre clé doit faire la taille de l'alphabet de l'algorithme.
    Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)
    L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous
    L'alphabet supporté est : ${(alphabet.join("|"))}`);
    r3.question("Donner votre clé : ", (answer) => {
        let isGoodKey = isGoodPermuttationKey(answer, alphabet);
        console.log("is good key : " + isGoodKey);
        console.log("the key is : " + answer);
        r3.close();
        if (!isGoodKey) {
            console.log("La clé que vous venez de rentrer n'est pas conforme");
            askKeyForPermuttationEncoding(textToEncode, alphabet, callback, finalCallback);
        }
        else {
            callback(answer, textToEncode, alphabet, finalCallback);
        }
    });
};

const permuttationEncodingSuite = (key, textToEncode, alphabet, next) => {
    console.log(`La clé qui va être utilisée est donc : "${key}"`);
    let encodedText = "";
    for (let i = 0; i < textToEncode.length; i++) {
        // On récupère l'index de la lettre à encoder dans notre alphabet
        let indexOfLetterToEncode = _.indexOf(alphabet, textToEncode[i]);
        // On vérifie que la lettre se trouve bien dans l'alphabet
        if (indexOfLetterToEncode < 0) {
            console.log(`Nous ne pouvons pas continuer car le caractère ${textToEncode[i]} de votre texte ne se trouve pas dans l'alphabet`);
            process.exit(1);
        }
        // Avec l'index on remplace tout simplement la lettre par la lettre correspondante présente dans la clé
        let encodedLetter = key[_.indexOf(alphabet, textToEncode[i])];
        encodedText += encodedLetter;
    }
    console.log(`le texte crypté est : "${encodedText}"\n\n\n`);
    next();
};

const permuttationEncoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous chiffrer ?", answer => {
        let textToEncode = answer;
        let alphabet = config.getAlphabet(textToEncode);
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        console.log("Vous avez le choix entre donner votre clé, ou laisse l'algorithme générer la clé !");
        console.log("1 - Laisser l'algorithme générer la clé");
        console.log("2 - Donner une clé");
        r2.question("Quel est votre choix ?", answer => {
            let choix = answer;
            r2.close();
            let key;
            switch (choix) {
                case "1":
                    key = generatePermutationKey(alphabet);
                    permuttationEncodingSuite(key, textToEncode, alphabet, next);
                    break;
                case "2":
                    askKeyForPermuttationEncoding(textToEncode, alphabet, permuttationEncodingSuite, next);
                    break;
                default:
                    console.log("Mauvais choix on recommence !!!");
                    permuttationEncoding(next);
            };
        });
    });
};

const permuttationDecoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous déchiffrer ?", answer => {
        let textToDecode = answer;
        let alphabet = config.getAlphabet(textToDecode);
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});

        r2.question(`Avec quelle clé le texte a été chiffré ?
            La clé doit faire la taille de l'alphabet de l'algorithme.
            Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)
            L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous
            L'alphabet supporté est : ${(alphabet.join("|"))} `, answer => {
            const usedKey = answer;
            r2.close();
            // On teste si la clé donnée est correcte
            if (!isGoodPermuttationKey(usedKey, alphabet)) {
                console.log("La clé que vous venez de donner n'est pas conforme, on recommence !!");
                permuttationDecoding(next);
            }
            else {
                // La clé est correcte on peut faire le déchiffrement
                let decodedText = "";
                for (let i = 0; i < textToDecode.length; i++) {
                    let indexOfLetterToDecode = usedKey.indexOf(textToDecode[i]);
                    decodedText += alphabet[indexOfLetterToDecode];
                }
                console.log(`Le texte décrypté est : "${decodedText}"\n\n\n`);
                next();
            }
        });
    });
};

// Récupérer tableau ordonnée des lettres de la plus présente dans le texte à la moins présente en partant de la map
const getTabOccurenceLetter = mapLetterOccurence => {
    let tabLetterOccurence = [];
    for (let [letter, countLetter] of mapLetterOccurence) {
        tabLetterOccurence.push(
            {
                letter,
                countLetter
            }
        );
    }
    tabLetterOccurence.sort((a, b) => {
        return b.countLetter - a.countLetter;
    });
    return tabLetterOccurence;
};

const permuttationDecrypting = next => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous décrypter ?", answer => {
        let textToDecrypt = answer;
        r1.close();
        let mapLetterOccurence = countLetterOccurence(textToDecrypt);
        let tabLetterOccurence = getTabOccurenceLetter(mapLetterOccurence);
        tabLetterOccurence.forEach((letterToReplace, index) => {
            console.log(letterToReplace);
            console.log(index);
            let replacedLetter = freqApparitionLetter[index];
            console.log(replacedLetter);
            textToDecrypt = textToDecrypt.replace(new RegExp(letterToReplace.letter, 'g'), replacedLetter);
            console.log("Etape " + (index + 1) + "texte décrypté = " + textToDecrypt);
        });
        next();
    });
};

const getNumberOfBytesDependOnAlphabet = alphabet => {
    let numberOfBytes;
    if (alphabet.length <= 31) {
        numberOfBytes = 5;
    }
    else if (alphabet.length <= 63) {
        numberOfBytes = 6
    }
    else if (alphabet.length <= 127) {
        numberOfBytes = 7
    }
    return numberOfBytes
};

const generateSuperGrowingList = listSize => {
    let superGrowingList = [];
    for (let i = 0; i < listSize; i++) {
        let randomNumber = Math.floor(Math.random() * listSize) + 1;
        if (i === 0) {
            superGrowingList.push(randomNumber);
        }
        else {
            superGrowingList.push(randomNumber + _.sum(superGrowingList));
        }
    }
    return superGrowingList;
};

const generateM = superGrowingList => {
    let randomNumber = Math.floor(Math.random() * superGrowingList.length) + 1;
    return _.sum(superGrowingList) + randomNumber;
};

const generatePWithM = m => {
    let p = Math.floor(m / 3);
    while (gcd(m, p) !== 1) {
        p++;
    }
    return p;
};

const generateNonSuperGrowingSequence = (p, m, superGrowingList) => {
    let nonSuperGrowingSequence = [];
    superGrowingList.forEach(element => {
        nonSuperGrowingSequence.push((element * p) % m);
    });
    return nonSuperGrowingSequence;
};

const transformTextToEncodeInBytes = (textToEncode, numberOfBytes, alphabet) => {
    let textToEncodeInBytes = "";
    for (let i = 0; i < textToEncode.length; i++) {
        let letterInBytes = (_.indexOf(alphabet, textToEncode[i])).toString(2);
        if (letterInBytes.length < numberOfBytes) {
            let complement = "";
            for (let j = 0; j < (numberOfBytes - letterInBytes.length); j++) {
                complement += "0";
            }
            letterInBytes = complement + letterInBytes;
        }
        textToEncodeInBytes += letterInBytes + ((i < textToEncode.length - 1) ? "|" : "");
    }
    return textToEncodeInBytes;
};

const encodeTabOfBlocks = (tabOfBlocksInBytes, nonSuperGrowingSequence) => {
    let encodedTabOfBlocks = [];
    tabOfBlocksInBytes.forEach(block => {
        let encodedBlock = 0;
        for (let i = 0; i < block.length; i++) {
            encodedBlock += +block[i] * nonSuperGrowingSequence[i];
        }
        encodedTabOfBlocks.push(encodedBlock);
    });
    return encodedTabOfBlocks;
};

const merkleHellmanEncoding = next => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        // On récupère l'alphabet en fonction du texte donné en entrée
        let alphabet = config.getAlphabet(textToEncode);
        // On récupère le nombre de bits utilisé pour la transformation en bits des lettres du texte
        let numberOfBytes = getNumberOfBytesDependOnAlphabet(alphabet);
        // On génère la suite super croissante
        let superGrowingList = generateSuperGrowingList(numberOfBytes);
        // On génère les clé m et p
        let m = generateM(superGrowingList);
        let p = generatePWithM(m);
        // On génère la clé publique (suite non super croissante à partir de p et m et de la suite super croissante)
        let nonSuperGrowingSequence = generateNonSuperGrowingSequence(p, m, superGrowingList);
        console.log(`Clé m utilisée : ${m}`);
        console.log(`Clé m utilisée : ${p}`);
        let textToEncodeInBytes = transformTextToEncodeInBytes(textToEncode, numberOfBytes, alphabet);
        let tabOfBlocksInBytes = textToEncodeInBytes.split("|");
        console.log(tabOfBlocksInBytes);
        let encodedTabOfBlocks = encodeTabOfBlocks(tabOfBlocksInBytes, nonSuperGrowingSequence);
        console.log(`Message chiffré : ${encodedTabOfBlocks}`);
    });
};

module.exports = {
    encodeLetter,
    decodeLetter,
    cesarEncoding,
    cesarDecoding,
    cesarDecrypting,
    vigenereEncoding,
    vigenereDecoding,
    permuttationEncoding,
    permuttationDecoding,
    permuttationDecrypting,
    merkleHellmanEncoding
};
