const alphabetMAJ = [
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
    "Z"
];

const alphabetMin = [
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
  "z"
];

const ponctuation = [
    '_', '´', '`', 'ˆ', '˜', '¨',
    '-', '—', ',', ';', ':', '!', '?', '.',
    '…', '’', '‘', '"', '«', '»',
    '(', ')', '[', ']', '{', '}', '§', '¶',
    '@','*','/','\\','&','#','%','°','+','±','÷','×','<','=','>','|','$','£','€',

    "'",
    ' ',

    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const caracteresAccentues = [
    'À', 'à', 'Â', 'â', 'Æ', 'æ', 'Ç', 'ç', 'É', 'é', 'È', 'è', 'Ê', 'ê', 'Ë', 'ë',
    'Î', 'î', 'Ï', 'ï', 'Ñ', 'ñ', 'Ô', 'ô', 'Œ', 'œ',
    'Ù', 'ù', 'Û', 'û', 'Ü', 'ü', 'Ÿ', 'ÿ'
];

const freqApparitionLetter = [
    "E",
    "A",
    "I",
    "S",
    "N",
    "R",
    "T",
    "O",
    "L",
    "U",
    "D",
    "C",
    "M",
    "P",
    "G",
    "B",
    "V",
    "H",
    "F",
    "Q",
    "Y",
    "X",
    "J",
    "K",
    "W",
    "Z"
];

const getTrulyAlphabetFull = () => {
    return alphabetMAJ.concat(alphabetMin).concat(ponctuation).concat(caracteresAccentues);
}

const getAlphabetFull = (textUncrypted, key) => {
  //if text and key are both in UPPERCASE
  var regexSpace = new RegExp("[\\s+]", "g");
  if (textUncrypted === textUncrypted.toUpperCase() && key === key.toUpperCase()
      && // and there is NO space in text nor key
      textUncrypted.match(regexSpace) == null && key.match(regexSpace) == null) {
    // console.log('getAlphabet : UPPERCASE'); //FIXME: to remove
    return alphabetMAJ; // --> to be able to decrypt
  // }else if (textUncrypted === textUncrypted.toLowerCase() && key === key.toLowerCase()) {
  //   console.log('getAlphabet : lowercase');
  //   return alphabetMin;
  } else {
    // console.log('getAlphabet : Full .'); //FIXME: to remove
    return alphabetMAJ.concat(alphabetMin).concat(ponctuation).concat(caracteresAccentues);
  }
};

const getAlphabetMAJ = () => {
  return alphabetMAJ;
};

// const getAlphabet = (textToAnalyse) => {
//   //  if (textToAnalyse === textToAnalyse.toUpperCase()) {
//   //    console.log('getAlphabet : UPPERCASE');
//   //    return alphabetMAJ;
//   //  }else if (textToAnalyse === textToAnalyse.toLowerCase()) {
//   //    console.log('getAlphabet : lowercase');
//   //    return alphabetMin;
//   //  }else {
//   //    console.log('getAlphabet : Case Mixed');
//   //    let alphabetUpperCase = alphabetMAJ;
//    //
//   //    let alphabetLowerCase = alphabetMin;
//    //
//   //    return alphabetUpperCase.concat(alphabetLowerCase);
//   //  }
//
//   return alphabetMAJ.concat(alphabetMin);
// };

const textForDecryptingPermuttation = "SOUFFREZQUUNCAVALIERCOMBATLESHAINESQUELQUECHOSEQUILNETENAITPASACEREGARDETUNESEDUCTIONIRRESISTIBLEDANSLAMOUSTACHEMOURONSJEUNESTOUSDEUXDELAVANCEFAITESLUIENTENDREQUESIELLESETAIENTMOINSLARGESMOINSDETROISOUDECINQHEURESCONNAISSANTLATENDANCEDESMONOMANIAQUESASEGROUPERAUTOURDECERTAINSPOINTSAUMONDEQUIECRIVEASAFEMMELENTEMENTPAREILLEALAMIENNE";
const key = "BCITHMVUGORQZSDWFXKPJALEYN";
const textEncoding = "KDJMMXHNFJJSIBABQGHXIDZCBPQHKUBGSHKFJHQFJHIUDKHFJGQSHPHSBGPWBKBIHXHVBXTHPJSHKHTJIPGDSGXXHKGKPGCQHTBSKQBZDJKPBIUHZDJXDSKOHJSHKPDJKTHJETHQBABSIHMBGPHKQJGHSPHSTXHFJHKGHQQHKHPBGHSPZDGSKQBXVHKZDGSKTHPXDGKDJTHIGSFUHJXHKIDSSBGKKBSPQBPHSTBSIHTHKZDSDZBSGBFJHKBKHVXDJWHXBJPDJXTHIHXPBGSKWDGSPKBJZDSTHFJGHIXGAHBKBMHZZHQHSPHZHSPWBXHGQQHBQBZGHSSH";


const permutation_encode_MAJ_text_uncrypted = 'VENIVIDIVICI';
const permutation_encode_MAJ_alphabet = 'RGECVJUASPOIMBWDTZXFHYKLNQ';
const permutation_encode_MAJ_text_crypted = 'YVBSYSCSYSES';

const permutation_encode_min_text_uncrypted = 'venividivici';
const permutation_encode_min_alphabet = 'rgecvjuaspoimbwdtzxfhyklnq';
const permutation_encode_min_text_crypted = 'yvbsyscsyses';

const permutation_encode_mix_text_uncrypted = 'VeniVidiVici';
const permutation_encode_mix_alphabet = 'RGECVJUASPOIMBWDTZXFHYKLNQrgecvjuaspoimbwdtzxfhyklnq';
const permutation_encode_mix_text_crypted = 'YvbsYscsYses';


const vigenere_encode_MAJ_text_uncrypted  = 'CEPREMIEREXERCICEPRATIQUEVISEAVERIFIERQUELESBASESSONTACQUISES';
const vigenere_encode_MAJ_cle = 'OK';
const vigenere_encode_MAJ_text_crypted = 'QODBSWWOFOLOFMWMSZFKHSEESFWCSKJOFSTSSBEESVSCPKGOGCCXHKQAISGOG';

const vigenere_encode_MAJ_text_uncrypted_3  = 'JEPENSESQUECEDECRYPTAGEDEVIENTVRAIMENTCHRONOPHAGEETFASTIDIEUXCARMONIMPLEMENTATIONDOITAVOIRQUELQUESPROBLEMESALORSQUEMONRAISONNEMENTSSEMBLEETREHORSDECAUSEMAISILFAUTTOUJOURSVERIFIERCESRESULTATSETPERSEVERERDANSLASOUFFRANCE';
const vigenere_encode_MAJ_cle_3 = 'JOR';
const vigenere_encode_MAJ_text_crypted_3 = 'SSGNBJNGHDSTNRVLFPYHRPSUNJZNBKEFRRAVWHTQFFWCGQOXNSKOOJCWURSLGQRAAFWWDYZVVSECOKRCEMCZCOMXWIZIVUELNGGACSUSDNGRUCIBELNAFWFRRGFWBVVSECGJNASUSVCFVQCIBRVLOLBSDJWJRZWJIKCCLSCLAGMNFZOWVAQVBFVBICCOKBSKYSIBSMNFVARRWGCJGFDTWAOELS';


const vigenere_encode_MAJ_text_uncrypted_4  = 'GAVROCHECOMPLETEMENTENVOLEETRADIEUXSETAITCHARGEDELAMISEENTRAINILALLAITVENAITDESCENDAITREMONTAITBRUISSAITETINCELAITILSEMBLAITETRELAPOURLENCOURAGEMENTDETOUSAVAITILUNAIGUILLONOUICERTESSAMISEREAVAITILDESAILESOUICERTESSAJOIEGAVROCHEETAITUNTOURBILLONNEMENTONLEVOYAITSANSCESSEONLENTENDAITTOUJOURSILREMPLISSAITLAIRETANTPARTOUTALAFOISCETAITUNEESPECEDUBIQUITEPRESQUEIRRITANTEPASDARRETPOSSIBLEAVECLUILENORMEBARRICADELESENTAITSURSACROUPEILGENAITLESFLANEURSILEXCITAITLESPARESSEUXILRANIMAITLESFATIGUESILIMPATIENTAITLESPENSIFSMETTAITLESUNSENGAIETELESAUTRESENHALEINELESAUTRESENCOLERETOUSENMOUVEMENTPIQUAITUNETUDIANTMORDAITUNOUVRIERSEPOSAITSARRETAITREPARTAITVOLAITAUDESSUSDUTUMULTEETDELEFFORTSAUTAITDECEUXCIACEUXLAMURMURAITBOURDONNAITETHARCELAITTOUTLATTELAGEMOUCHEDELIMMENSECOCHEREVOLUTIONNAIRELEMOUVEMENTPERPETUELETAITDANSSESPETITSBRASETLACLAMEURPERPETUELLEDANSSESPETITSPOUMONSHARDIENCOREDESPAVESENCOREDESTONNEAUXENCOREDESMACHINSOUYENATILUNEHOTTEEDEPLATRASPOURMEBOUCHERCETROULACESTTOUTPETITVOTREBARRICADEILFAUTQUECAMONTEMETTEZYTOUTFLANQUEZYTOUTFICHEZYTOUTCASSEZLAMAISONUNEBARRICADECESTLETHEDELAMEREGIBOUTENEZVOILAUNEPORTEVITREECECIFITEXCLAMERLESTRAVAILLEURSUNEPORTEVITREEQUESTCEQUETUVEUXQUONFASSEDUNEPORTEVITREETUBERCULEHERCULESVOUSMEMESRIPOSTAGAVROCHEUNEPORTEVITREEDANSUNEBARRICADECESTEXCELLENTCANEMPECHEPASDELATTAQUERMAISCAGENEPOURLAPRENDREVOUSNAVEZDONCJAMAISCHIPEDESPOMMESPARDESSUSUNMUROUILYAVAITDESCULSDEBOUTEILLESUNEPORTEVITREECACOUPELESCORSAUXPIEDSDELAGARDENATIONALEQUANDELLEVEUTMONTERSURUNEBARRICADEPARDILEVERREESTTRAITREAHCAVOUSNAVEZPASUNEIMAGINATIONEFFRENEEMESCAMARADES';
const vigenere_encode_MAJ_cle_4 = 'CRYP';
const vigenere_encode_MAJ_text_crypted_4 = 'IRTGQTFTEFKENVRTOVLIGETDNVCITRBXGLVHGKYXVTFPTXCSGCYBKJCTPKPPKEGACCJPKKTTPRGIFVQRGEBPKKPTOFLICZRQTLGHURGIGKGCEVJPKKGAUVKQNRGIGKPTNRNDWIJTPTMJTRETOVLIFVRDWJYKCZRXNLLPKXSXNCMCQLGRGIRTUJYBKJCGGRTPKKGAFVQPKCCHQLGRGIRTUJYYQZCVCMPDEYCTVRGIWERDWIZXNCMCPVKTPKMCNVTDARGIURLHEVQHGFLAGERTPUYXVKMJLFSGUZJGGDNAKJQPKKJPKICICERECIRDWKYACWMXUTCICZRJPVCHRVATFLZXSLGIGGPTUHSTKIPXVRLIGGYHFRPGGKNDUJGQNVYKGTJJKCCCQIKTDRPGKTYSGCCHGERPKKQJTJYRTFSEGZJVGEYXVCCHHCYCGLPHKCCMEZRPKKJTUGYGGJQTWOGATRLXORGINVQUCKGVWVQXNZKECKGTPKYXVCCHRVLHKWQBGKRPKKJTULLHGEEPKVRTNVQPWKPTUVLWCCCXPVJTURSITVQTPTMAGICIQLQTPDMJXVKTPKNXSLYXVLLTVLBXCERBQIBPKKSCQLTGKVPHGGMHCZRHCIPTVRGITVNPTKYXVMMACZRPWUCHULQSWKSBWCRTGKBTNVDUQIRHCLRPKKBTEVSMEZYRGLVACDSGOLPPKKZDWIBDPEYXVVRWCIATNRGIVFSINRRIGCYVGDMJEYCSGCGBOVLHGTMRJVPTXFJJVZMCPRGGGCCBQLTTOVLIRVPEGKSTNVRPKKBPPJQTUGCIKKQQTRQTVCYRNRKTWINTTGCIWVJAGUYCUJCHRVRXVJNDWDMCUYYGFZCCEFPTFVQECMCHGEADTVBTUKMCPVYJZVLRQICSGJKPEYGCUFSNGEYIKCSCGYMIVVCSGGJPVIYHRFSGOVZDWTFTTTCITFSACTCHVKMJVGCIKKTDVICQCIPXERBTKCDPWKOJGTYBQERTOVRIGQWIQLRUNRLFWVXNVFSIHZAWGQWIQLRRCJQTBCYBCZQDPLLTDRPGKTYSGTCHVCCIJVBTNRKTTVEXDFSIGECOXFGACLLTRFPIGMGITVCRGTGUKKCMECYBGIJTUKPPXRGANVSGULLTRFPIGMGITVCFWVQIEVOJGKSKGLVFWFLUCJQTFLLTRFPIGMGITVCIWSCGELJTJVPRWCCHXFSHOVKTUIGEQJRPIRTGQTFTWECEQIRTXZRGGVBPPJSCGSYGTZAPFVATUKCMEVJAGERRCECBRVAWGGYHFVJPVKYFWVPBCZQRCXCCGGMJTCYETVLSTVTDWJLPXVXSQEAYCDYXUTFXRVBTUGMBOVQECIBTUJSHWEKJTFSXNPYKCZRSGJAJNJBTDFSIGZJAGJSCGGMGVVTXVICTERADWGCAGJADTJYJZGGTFJBTNREPTUCCCKGDPRJTSLYCFVJAGMCJVDMCVVPHWISCGSYGTZAPFVNPTUGAGMCGTVCHVKPPKKPTCYAPXFSHPRTTBGYHWECXOREXPRRXQECUHICCGVKTUTYBCIYSGJ';


module.exports = {
    freqApparitionLetter,
    // getAlphabet,
    getAlphabetFull,
    getAlphabetMAJ,
    getTrulyAlphabetFull
};
