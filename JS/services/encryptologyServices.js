'use strict'
const config = require('config/config');
const gcd = require('gcd');
const freqApparitionLetter = config.freqApparitionLetter;
const readline = require('readline');
const _ = require('lodash');
const menu = require('crypto');

/**
 * Fonction cryptant la lettre en fonction du décallage voulez-vous
 * @param  {char} letter lettre à crypter
 * @param  {String} l'alphabet a utiliser
 * @param  {int}  shift  Décallage voulu
 * @return {char}        lettre crypté
 */
const encodeLetter = (letter, alphabet, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);
    // //FIXME: to remove
    // console.log('letter', letter, 'shift', shift, 'letterIndex', letterIndex, 'alphabet', `${alphabet.join('')}`,
    // '\n (letterIndex + shift)', (letterIndex + shift), 'alphabet.length', alphabet.length ,'(letterIndex + shift) % alphabet.length]', ((letterIndex + shift) % alphabet.length), 'alphabet[(letterIndex + shift) % alphabet.length] ', alphabet[(letterIndex + shift) % alphabet.length] );

    if (letterIndex === -1) {
        // La lettre n'est pas dans l'alphabet
        return null;
    }
    return alphabet[(letterIndex + shift) % alphabet.length];
};

const decodeLetter = (letter, alphabet, shift) => {
    let letterIndex = _.indexOf(alphabet, letter);

    // //FIXME: to remove
    // console.log('letter', letter, 'shift', shift, 'letterIndex', letterIndex, ' ==> ', alphabet[
    //     (
    //         (letterIndex - shift) % alphabet.length >= 0 ?
    //             (letterIndex - shift) % alphabet.length
    //             :
    //             ((letterIndex - shift) % alphabet.length) + alphabet.length
    //     )
    // ]);

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
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            // console.log("le texte est : " + textToEncode);
            // console.log("la clé est : " + usedKey);
            let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
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
            console.log(`Le texte chiffré est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};

const cesarEncodingMAJAlphabet = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous chiffrer (que en majuscule) ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer (que en majuscule) ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            var regText = new RegExp("[A-Z]{" + textToEncode.length + "}");
            var regKey = /[A-Z]{1}/
            // verify if text and key is uppercase
            if (!regText.test(textToEncode) || !regKey.test(usedKey)) {
                console.log("Le texte donnée ou la clé n'est pas en majuscule !!! Recommencez !!!");
                cesarEncodingMAJAlphabet(next);
            }
            else {
                let alphabet = config.getAlphabetMAJ();
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
                console.log(`Le texte chiffré est : "${encodedText}"\n\n\n`);
                next();
            }
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
            // console.log("le texte est : " + textToDecode);
            // console.log("la clé est : " + usedKey);
            let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
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
            console.log(`Le texte déchiffré est : "${decodedText}"\n\n\n`);
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

    countLetter++;
    // console.log(`countLetter "${letterCurrent}" : "${countLetter}"`);
    mapLetterOccurence.set(letterCurrent, countLetter);
  }

  // console.log('mapLetterOccurence ', mapLetterOccurence);
  return mapLetterOccurence;
};

const getLetterWithMaxOccurence = (textToDecrypt) => {
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

  // console.log('letterMaxOccurence : ', letterMaxOccurence);
  return letterMaxOccurence;
};

const cesarDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Warning : Les caractères du texte clair et la clé doivent être compris dans l'interval [A-Z].\nQuel texte voulez-vous décrypter ? ", answer => {
        let textToDecrypt = answer;
        rl.close();
        var regText = new RegExp("[A-Z]{" + textToDecrypt.length + "}");
        // verify if text and key is uppercase
        if (!regText.test(textToDecrypt)) {
            console.log("Le texte donnée n'est pas en majuscule !!! Recommencez !!!");
            cesarDecrypting(next);
        }
        else {
            let alphabet = config.getAlphabetMAJ(); //config.getAlphabet(textToDecrypt);

            //On est en français donc la letter qui apparait le plus dans le texte chiffré est un 'e' dans le texte en clair
            let letterMaxOccurence = getLetterWithMaxOccurence(textToDecrypt);

            let shiftLetterMaxOccurence = _.indexOf(alphabet, letterMaxOccurence);

            let shiftLetterE = 4; // le 'E' est à la cinquième place dans l'alphabet (alphabet[4])

            let shift = ((shiftLetterMaxOccurence - shiftLetterE) % alphabet.length);
            // console.log(`shift : "${shift}"\n`);

            var decodedText = '';
            for (let i = 0; i < textToDecrypt.length; i++) {
                let decodedLetter = decodeLetter(textToDecrypt[i], alphabet, shift);
                // console.log(`textToDecrypt[i] : "${textToDecrypt[i]}" = "${decodedLetter}"\n`);
                if (!decodedLetter) {
                    // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
                    console.log(`Nous ne pouvons pas continuer car le caractère ${textToDecrypt[i]} de votre texte ne se trouve pas dans l'alphabet`);
                    process.exit(1);
                }
                decodedText += decodedLetter;
            }
            console.log(`Le texte déchiffré est : "${decodedText}"\n\n\n`);
            next();
        }
    });
};

const vigenereEncoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
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
            console.log(`Le texte chiffré est : "${encodedText}"\n\n\n`);
            next();
        });
    });
};

const vigenereEncodingMAJAlphabet = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous chiffrer (que en majuscule) ? ", answer => {
        let textToEncode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé voulez-vous chiffrer (que en majuscule) ? ", answer => {
            let usedKey;
            let encodedText = "";
            usedKey = answer;
            r2.close();
            var regText = new RegExp("[A-Z]{" + textToEncode.length + "}");
            var regKey = /[A-Z]{1}/
            // verify if text and key is uppercase
            if (!regText.test(textToEncode) || !regKey.test(usedKey)) {
                console.log("Le texte donnée ou la clé n'est pas en majuscule !!! Recommencez !!!");
                vigenereEncodingMAJAlphabet(next);
            }
            else {
                let alphabet = config.getAlphabetMAJ(); //config.getAlphabet(textToEncode);
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
                console.log(`Le texte chiffré est : "${encodedText}"\n\n\n`);
                next();
            }
        });
    });
};

const vigenereDecode = (textToDecode, usedKey, next) => {
  let decodedText = "";
  // console.log("le texte est : " + textToDecode);
  // console.log("la clé est : " + usedKey);
  let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
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
  console.log(`Le texte déchiffré est : "${decodedText}"\n\n\n`);
};

const vigenereDecodeMAJAlphabet = (textToDecode, usedKey, next) => {
  let decodedText = "";
  // console.log("le texte est : " + textToDecode);
  // console.log("la clé est : " + usedKey);
  let alphabet = config.getAlphabetMAJ(); //config.getAlphabet(textToEncode);
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
  console.log(`Le texte déchiffré est : "${decodedText}"\n\n\n`);
};

const vigenereDecoding = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous déchiffrer ? ", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Avec quelle clé le texte a été chiffré ? ", (answer) => {
            let usedKey = answer;
            r2.close();
            vigenereDecode(textToDecode, usedKey);
            next();
        });
    });
};

const getICPartText = (partTextToDecrypt) => {
  let sumIc = 0;

  let mapLetterOccurence = countLetterOccurence(partTextToDecrypt);
  for (let [letter, countLetter] of mapLetterOccurence) {
    let icCurrentLetter = (countLetter * (countLetter -1) ) / (partTextToDecrypt.length * (partTextToDecrypt.length -1));
    // console.log('icCurrentLetter', letter, ':', icCurrentLetter);
    sumIc += icCurrentLetter;
  }

  return sumIc;
};

const vigenereDecryptKey = (textToDecrypt, alphabet, longueurCle, next) => {
  let cle = '';

  let tab = getPartText(textToDecrypt, longueurCle);

  //on calcule l'ic pour chaque partie du texte
  for (let i = 0; i < longueurCle; i++) {
    // console.log('tab['+ i +']', tab[i]);
    let partTextToDecrypt = tab[i].join('');

    //On trouve la lettre avec le + d'occurence
    let letterMaxOccurence = getLetterWithMaxOccurence(partTextToDecrypt);

    let shiftLetterE = 4; // le 'E' ou 'e' est toujours à la cinquième place (alphabet[4]) que l'on soit en majuscule ou minuscule

    let decodedLetter = decodeLetter(letterMaxOccurence, alphabet, shiftLetterE);
    console.log(`La lettre avec le plus d'occurence en chiffré est "${letterMaxOccurence}", elle devient donc "${decodedLetter}" en clair.`);

    if (!decodedLetter) {
        // La lettre n'est pas dans l'alphabet il faut le dire à l'utilisateur et sortir du programme
        console.log(`Nous ne pouvons pas continuer car le caractère ${letterMaxOccurence} de votre texte ne se trouve pas dans l'alphabet`);
        process.exit(1);
    }

    cle += decodedLetter.toUpperCase();

  }

  console.log(`Nous proposons la clé "${cle}"\n`);

  vigenereDecodeMAJAlphabet(textToDecrypt, cle, next);

  next();
};

const getPartText = (textToDecrypt, longueurCle) => {
  let tab = [];
  for (let i = 0; i < longueurCle; i++) {
    //init
    tab.push([]);
  }

  //on place chaque lettre dans le tableau correspondant
  for (let i = 0; i < textToDecrypt.length; i++) {
    let letterCurrent = textToDecrypt[i];
    //console.log('letterCurrent', letterCurrent, (i % longueurCleMax) );

    tab[i % longueurCle].push(letterCurrent);
  }

  return tab;
};

const askKeyLengthForVigenereDecrypting = (textToDecrypt, alphabet, next) => {
    const r3 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r3.question("Quelle est la longueur de clé à essayer ?", (answer) => {
        let longueurCle = answer;
        let isGoodKeyLength = ( !isNaN(longueurCle) && (longueurCle >= 1) && (longueurCle <= textToDecrypt.length) ) ;
        r3.close();
        if (!isGoodKeyLength) {
            console.log(`La longueur que vous venez de rentrer n'est pas conforme, elle doit être comprise entre 1 et ${textToDecrypt.length}`);
            askKeyLengthForVigenereDecrypting(textToDecrypt, alphabet, next);
        }
        else {
          //maintenant qu'on a la longueur de cle, on l'utilise pour la déchiffrer
          vigenereDecryptKey(textToDecrypt, alphabet, longueurCle, next);
        }
    });
};

const vigenereDecrypting = (next) => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Warning : Les caractères du texte clair et la clé doivent être compris dans l'interval [A-Z].\nQuel texte voulez-vous décrypter ?", answer => {
        let textToDecrypt = answer;
        rl.close();
        var regText = new RegExp("[A-Z]{" + textToDecrypt.length + "}");
        // verify if text and key is uppercase
        if (!regText.test(textToDecrypt)) {
            console.log("Le texte donnée n'est pas en majuscule !!! Recommencez !!!");
            vigenereDecrypting(next);
        }
        else {
            let alphabet = config.getAlphabetMAJ(); //config.getAlphabet(textToDecrypt);

            const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
            console.log("Vous avez le choix entre donner votre longueur de clé ou laisser l'algorithme chercher la longueur de la clé.");
            console.log("1 - Laisser l'algorithme chercher la longueur de la clé");
            console.log("2 - Donner une longueur de clé");
            r2.question("Quel est votre choix ?", (answer) => {
              let choix = answer;
              r2.close();
              let longueurCle;
              switch (choix) {
                      case "1":
                          //il va falloir calculer plusieurs IC pour utiliser la longueur de clé la plus probable

                          //L'indice de coïncidence différe selon les sources
                          let ICRefFR = 0.0778;

                          let longueurCleLaPlusProbable = 0;
                          let bestIC = 999; //pour être sûr d'être plus loin que les autres

                          let longueurMaxToTest = Math.min(textToDecrypt.length, 15); // longeur arbitraire
                          console.log(`Nous allons tester des longueurs de clé de 1 à ${longueurMaxToTest}`);
                          for (let i = 1; i <= longueurMaxToTest; i++) {
                            let tab = getPartText(textToDecrypt, i);

                            let sumPartIC = 0;
                            for (let j = 0; j < i; j++) {
                              let partTextToDecrypt = tab[j].join('');
                              let partTextIC = getICPartText(partTextToDecrypt);

                              // console.log('['+ j +'] partTextToDecrypt:', partTextToDecrypt, '\t', partTextIC);
                              sumPartIC += partTextIC;
                            }
                            // console.log('sumPartIC / i :', sumPartIC, i, (sumPartIC / i));
                            let ic = sumPartIC / i;

                            let partTextDiff = Math.abs(ICRefFR - ic);
                            let curBestDiff = Math.abs(ICRefFR - bestIC);
                            // console.log(`partTextDiff : ${partTextDiff}, curBestDiff : ${curBestDiff}`);

                            console.log(`Moyenne des indices de coïncidence pour la longueur de clé ${i} : ${partTextDiff}`);

                            // l'IC de cette partie est elle plus proche que les autres de l'IC de référence
                            if( partTextDiff < curBestDiff ){
                              bestIC = ic;
                              longueurCleLaPlusProbable = i;
                              // console.log(`La moyenne des indices de coïncidence pour la longueur de clé ${longueurCleLaPlusProbable} devient le plus proche de l'indice de référence avec ${bestIC} .`);
                            }

                            // console.log('---');
                          }

                          console.log(`La longueur de la clé la plus probable [IC=${bestIC}] est ${longueurCleLaPlusProbable}.`);

                          //maintenant qu'on a la longueur de cle, on l'utilise pour la déchiffrer
                          vigenereDecryptKey(textToDecrypt, alphabet, longueurCleLaPlusProbable, next);

                          break;
                      case "2":
                          askKeyLengthForVigenereDecrypting(textToDecrypt, alphabet, next);
                          break;
                      default:
                          console.log("Mauvais choix on recommence !!!");
                          vigenereDecrypting(next);
                  };
            });
        }
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

/** Notre alphabet complet contient des caractères spéciaux qui
*   s'ils sont appelés dans une regex ont un sens (ex : . ? * [] () etc.)
*   donc le but est qu'ils ne soient plus interprétés en les échappant.
*/
const regexEscape = (text) => {
  return text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

const isGoodPermuttationKey = (key, alphabet) => {
    // On vérifie si la clé donnée est bonne (2 lettres ne peuvent pas être chiffrer par la même lettre)
    if (key.length !== alphabet.length) {
        return false;
    }
    return alphabet.every(letter => {
        var reg = new RegExp("[^" + regexEscape(letter) + "]", "g");
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
        // console.log("is good key : " + isGoodKey);
        // console.log("the key is : " + answer);
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
    console.log(`Le texte chiffré est : "${encodedText}"\n\n\n`);
    next();
};

const permuttationEncoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous chiffrer ?", answer => {
        let textToEncode = answer;
        let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        console.log("Vous avez le choix entre donner votre clé ou laisser l'algorithme générer la clé.");
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

const permuttationEncodingMAJAlphabet = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous chiffrer ?", answer => {
        let textToEncode = answer;
        let alphabet = config.getAlphabetMAJ();
        r1.close();
        var regText = new RegExp("[A-Z]{" + textToEncode.length + "}");
        // verify if text and key is uppercase
        if (!regText.test(textToEncode)) {
            console.log("Le texte donnée n'est pas en majuscule !!! Recommencez !!!");
            permuttationEncodingMAJAlphabet(next);
        }
        else {
            const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
            console.log("Vous avez le choix entre donner votre clé ou laisser l'algorithme générer la clé.");
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
        }
    });
};

const permuttationDecoding = (next) => {
    const r1 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    r1.question("Quel texte voulez-vous déchiffrer ?", answer => {
        let textToDecode = answer;
        let alphabet = config.getTrulyAlphabetFull(); //config.getAlphabet(textToEncode);
        r1.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});

        r2.question("Avec quelle clé le texte a été chiffré ? \n" +
            "La clé doit faire la taille de l'alphabet de l'algorithme." +
            "Une lettre correspond à une autre (2 lettres ne peuvent pas être chiffrées avec la même lettre)" +
            "L'ordre de la clé suivra l'ordre des lettres de l'alphabet donnée juste en dessous" +
            "L'alphabet supporté est : " + alphabet.join("|") + "\n", answer => {
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
                console.log(`Le texte déchiffré est : "${decodedText}"\n\n\n`);
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
        var regText = new RegExp("[A-Z]{" + textToDecrypt.length + "}");
        // verify if text and key is uppercase
        if (!regText.test(textToDecrypt)) {
            console.log("Le texte donnée n'est pas en majuscule !!! Recommencez !!!");
            permuttationDecrypting(next);
        }
        else {
            let mapLetterOccurence = countLetterOccurence(textToDecrypt);
            let tabLetterOccurence = getTabOccurenceLetter(mapLetterOccurence);
            let tabDecrypted = textToDecrypt.split(''); //meme longeur
            let decryptedText = '';
            tabLetterOccurence.forEach((letterToReplace, index) => {
                let replacedLetter = freqApparitionLetter[index];
                // console.log(index, letterToReplace, replacedLetter);

                //recherche de l'ensemble des indices où la lettre apparait dans le chiffré
                var tabIndicesDeLaLettreDansLeTexteChiffre = [];
                for(var i = 0; i < textToDecrypt.length; i++) {
                    if (textToDecrypt[i] === letterToReplace.letter){
                      tabIndicesDeLaLettreDansLeTexteChiffre.push(i);
                    }
                }
                //pour chaque indices, remplace le chiffré par le clair
                tabIndicesDeLaLettreDansLeTexteChiffre.forEach((i) => {
                  tabDecrypted[i] = replacedLetter;
                });

            });

            console.log(`Le texte décrypté est : "${tabDecrypted.join('')}"\n\n\n`);

            next();
        }
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
    else {
        numberOfBytes = 8
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
    let m = _.sum(superGrowingList) + randomNumber;
    if (m % 2 === 0) {
        m++;
    }
    return m;
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
        textToEncodeInBytes += letterInBytes;
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
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quel texte voulez-vous chiffrer ? ", answer => {
        let textToEncode = answer;
        rl.close();
        // On récupère l'alphabet en fonction du texte donné en entrée
        let alphabet = config.getTrulyAlphabetFull();
        // On récupère le nombre de bits utilisé pour la transformation en bits des lettres du texte
        let numberOfBytes = getNumberOfBytesDependOnAlphabet(alphabet);
        console.log(`nombre de bits pour les lettres : ${numberOfBytes}`);
        // On génère la suite super croissante
        let superGrowingList = generateSuperGrowingList(numberOfBytes);
        // On génère les clé m et p
        let m = generateM(superGrowingList);
        let p = generatePWithM(m);
        // On génère la clé publique (suite non super croissante à partir de p et m et de la suite super croissante)
        let nonSuperGrowingSequence = generateNonSuperGrowingSequence(p, m, superGrowingList);
        console.log(`Clé m utilisée : ${m}`);
        console.log(`Clé p utilisée : ${p}`);
        //console.log(`Clé privé utilisée : ${superGrowingList}`);
        console.log(`Clé publique utilisée : ${nonSuperGrowingSequence}`);
        let textToEncodeInBytes = transformTextToEncodeInBytes(textToEncode, numberOfBytes, alphabet);
        // Tranfrom textToEncodeInBytes in tabOfBlocksInBytes
        let cpt = 1;
        let tabOfBlocksInBytes = [];
        let cptTable = 0;
        for (let i = 0; i < textToEncodeInBytes.length; i++) {
            if (cpt <= superGrowingList.length) {
                tabOfBlocksInBytes[cptTable] = (tabOfBlocksInBytes[cptTable] ? tabOfBlocksInBytes[cptTable] : "") + textToEncodeInBytes[i];
                cpt++;
            }
            else {
                cpt = 1;
                cptTable++;
                tabOfBlocksInBytes[cptTable] = (tabOfBlocksInBytes[cptTable] ? tabOfBlocksInBytes[cptTable] : "") + textToEncodeInBytes[i];
                cpt++;
            }
        }
        // Ajout de 0 à la fin si nécessaire
        if (tabOfBlocksInBytes[tabOfBlocksInBytes.length - 1].length !== superGrowingList.length) {
            let diff = "";
            for (let j = 0; j < superGrowingList.length - tabOfBlocksInBytes[tabOfBlocksInBytes.length - 1].length; j++) {
                diff += "0";
            }
            tabOfBlocksInBytes[tabOfBlocksInBytes.length - 1] += diff;
        }
        let encodedTabOfBlocks = encodeTabOfBlocks(tabOfBlocksInBytes, nonSuperGrowingSequence);
        console.log(`Message chiffré : ${encodedTabOfBlocks}`);
        next();
    });
};


const calculateMultiplicativeInverse = (m, p) => {
    let u = [1, 0];
    let v = [0, 1];
    let r = [m, p];
    let q = [];
    let cpt = 0;
    while(r[r.length - 1] !== 0) {
        // On calcule le reste
        r.push(r[cpt] % r[cpt + 1]);
        // On calcule le quotient
        q.push(Math.trunc(r[cpt] / r[cpt + 1]));
        // On calcule u et v
        if (r[r.length - 1] !== 0) {
            u.push(u[cpt] - (q[cpt] * u[cpt + 1]));
            v.push(v[cpt] - (q[cpt] * v[cpt + 1]));
        }
        cpt++;
    }
    return v[v.length - 1] > 0 ? v[v.length -1] : (v[v.length -1] + m);
};

const sumDecodedBlock = (decodedBlock) => {
    let sum = 0;
    decodedBlock.forEach(block => {
        if (block.isToTake) {
            sum += block.number;
        }
    });
    return sum;
};

const merkleHellmanDecoding = next => {
    const rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
    rl.question("Quelle séquence voulez-vous déchiffrer ? Séparez la séquence par des virgules sans espace (ex : 12,154,23,65)\n", answer => {
        let textToDecode = answer;
        rl.close();
        const r2 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
        r2.question("Quelle est la clé m avec laquelle le texte a été chiffré ?\n", answer => {
            let m = +answer;
            r2.close();
            const r3 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
            r3.question("Quelle est la clé p avec laquelle le texte a été chiffré ?\n", answer => {
                let p = +answer;
                r3.close();
                const r4 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
                r4.question("Quelle est la clé publique ? (la suite non super croissante, à séparer par des virgules (ex : 1,3,8))", answer => {
                    let nonSuperGrowingSequence = answer.split(",");
                    r4.close();
                    const r5 = readline.createInterface({input: process.stdin, output: process.stdout, terminal: true});
                    r5.question("Enfin sur combien de bits ont été codés les lettres lors du chiffrage de ce message ?", answer => {
                        let numberOfByteForLetter = +answer;
                        r5.close();
                        // Trick alphabet
                        let alphabet = config.getTrulyAlphabetFull();
                        let multiplicativeInverse = calculateMultiplicativeInverse(m, p);
                        let encodedTabOfBlocks = textToDecode.split(",");
                        console.log(`Inverse multiplicatif = ${multiplicativeInverse}`);
                        let baseDecodedBlock = [];
                        // Calculate superGrowingList with nonSuperGrowingSequence
                        var superGrowingList = [];
                        nonSuperGrowingSequence.forEach(number => {
                            superGrowingList.push((number * multiplicativeInverse) % m);
                        });
                        // On calcule la liste super croissante grace à l'inverse multiplicatif et la liste publique non super croissante
                        superGrowingList.forEach((number) => {
                            baseDecodedBlock.push({
                                number: +number,
                                isToTake: false
                            });
                        });
                        console.log(superGrowingList);
                        let decodedTextInBytes = "";
                        encodedTabOfBlocks.forEach((encodedBlock) => {
                            let decodedBlock = _.cloneDeep(baseDecodedBlock);
                            let tmpNumber = (+encodedBlock * multiplicativeInverse) % m;
                            let cpt = 0;
                            while (sumDecodedBlock(decodedBlock) !== tmpNumber) {
                                if (sumDecodedBlock(decodedBlock) + (+superGrowingList[(superGrowingList.length - 1) - cpt]) <= tmpNumber) {
                                    decodedBlock[(superGrowingList.length - 1) - cpt].isToTake = true;
                                }
                                cpt++;
                            }
                            let decodedBlockInByte = "";
                            for (let i = decodedBlock.length - 1; i >= 0; i--) {
                                if (decodedBlock[i].isToTake) {
                                    decodedBlockInByte = "1" + decodedBlockInByte;
                                }
                                else {
                                    decodedBlockInByte = "0" + decodedBlockInByte;
                                }
                            }
                            decodedTextInBytes += decodedBlockInByte;
                        });
                        // Tranfrom decodedTextInBytes in decodedText
                        let cpt = 1;
                        let decodedTextInTable = [];
                        let cptTable = 0;
                        for (let i = 0; i < decodedTextInBytes.length; i++) {
                            if (cpt <= numberOfByteForLetter) {
                                decodedTextInTable[cptTable] = (decodedTextInTable[cptTable] ? decodedTextInTable[cptTable] : "") + decodedTextInBytes[i];
                                cpt++;
                            }
                            else {
                                cpt = 1;
                                cptTable++;
                                decodedTextInTable[cptTable] = (decodedTextInTable[cptTable] ? decodedTextInTable[cptTable] : "") + decodedTextInBytes[i];
                                cpt++;
                            }
                        }
                        let decodedText = "";
                        decodedTextInTable.forEach(letterInBytes => {
                            if (letterInBytes.length === numberOfByteForLetter) {
                                decodedText += alphabet[parseInt(letterInBytes, 2)];
                            }
                        });
                        console.log(`Le texte déchiffré est : ${decodedText}`);
                        next();
                    });
                });
            });
        });
    });
};

module.exports = {
    encodeLetter,
    decodeLetter,
    cesarEncoding,
    cesarEncodingMAJAlphabet,
    cesarDecoding,
    cesarDecrypting,
    vigenereEncoding,
    vigenereEncodingMAJAlphabet,
    vigenereDecoding,
    vigenereDecrypting,
    permuttationEncoding,
    permuttationEncodingMAJAlphabet,
    permuttationDecoding,
    permuttationDecrypting,
    merkleHellmanEncoding,
    merkleHellmanDecoding
};
