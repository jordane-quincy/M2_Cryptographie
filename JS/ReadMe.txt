Bonjour Monsieur,
Voici le projet de cryptographie M2 de Jean-Baptiste DURIEZ et Jordane QUINCY
Le langage que nous avons utilis� est le javascript.
Afin de lancer le projet il vous faut la derni�re de Node � t�l�charger ici : 
https://nodejs.org/en/ (prendre la version 7.10.0 current version)
Une fois node install�, v�rifier que tout est bien install� en tapant la commande 
"node -v" dans l'invite de commandes. => devrait donner v7.10.0
Si jamais node n'est pas reconnu, alors il faut ajouter le dossier racine de node 
dans la variable d'environnement PATH (normalement c'est fait automatiquement)

Une fois node install�, il vous suffit simplement de lancer le fichier lancementProjet.bat 
ou de lancer manuellement en ligne de commande la commande "node crypto"

Vous retrouverez un menu avec diff�rents choix permettant de r�aliser tout ce qui a �t� demand� pour le TP
Attention le chiffrement avec que des majuscules et sans espace doit �tre utilis� pour obtenir un chiffr� � d�crypter.
Sinon pour les autres chiffrement et les d�chiffrements nous avons utilis� un alphabet complet comportant
chiffre, lettre (min et maj), caract�res sp�ciaux, ponctuations etc...

Pour d�crypter il faut un long texte afin que la fr�quence d'apparition des lettres soient totalement fonctionnelles.
Exemple de texte (ne fonctionne pas pour le d�cryptage par permuttation) :
GAVROCHECOMPLETEMENTENVOLEETRADIEUXSETAITCHARGEDELAMISEENTRAINILALLAITVENAITDESCENDAITREMONTAITBRUISSAITETINCELAITILSEMBLAITETRELAPOURLENCOURAGEMENTDETOUSAVAITILUNAIGUILLONOUICERTESSAMISEREAVAITILDESAILESOUICERTESSAJOIEGAVROCHEETAITUNTOURBILLONNEMENTONLEVOYAITSANSCESSEONLENTENDAITTOUJOURSILREMPLISSAITLAIRETANTPARTOUTALAFOISCETAITUNEESPECEDUBIQUITEPRESQUEIRRITANTEPASDARRETPOSSIBLEAVECLUILENORMEBARRICADELESENTAITSURSACROUPEILGENAITLESFLANEURSILEXCITAITLESPARESSEUXILRANIMAITLESFATIGUESILIMPATIENTAITLESPENSIFSMETTAITLESUNSENGAIETELESAUTRESENHALEINELESAUTRESENCOLERETOUSENMOUVEMENTPIQUAITUNETUDIANTMORDAITUNOUVRIERSEPOSAITSARRETAITREPARTAITVOLAITAUDESSUSDUTUMULTEETDELEFFORTSAUTAITDECEUXCIACEUXLAMURMURAITBOURDONNAITETHARCELAITTOUTLATTELAGEMOUCHEDELIMMENSECOCHEREVOLUTIONNAIRELEMOUVEMENTPERPETUELETAITDANSSESPETITSBRASETLACLAMEURPERPETUELLEDANSSESPETITSPOUMONSHARDIENCOREDESPAVESENCOREDESTONNEAUXENCOREDESMACHINSOUYENATILUNEHOTTEEDEPLATRASPOURMEBOUCHERCETROULACESTTOUTPETITVOTREBARRICADEILFAUTQUECAMONTEMETTEZYTOUTFLANQUEZYTOUTFICHEZYTOUTCASSEZLAMAISONUNEBARRICADECESTLETHEDELAMEREGIBOUTENEZVOILAUNEPORTEVITREECECIFITEXCLAMERLESTRAVAILLEURSUNEPORTEVITREEQUESTCEQUETUVEUXQUONFASSEDUNEPORTEVITREETUBERCULEHERCULESVOUSMEMESRIPOSTAGAVROCHEUNEPORTEVITREEDANSUNEBARRICADECESTEXCELLENTCANEMPECHEPASDELATTAQUERMAISCAGENEPOURLAPRENDREVOUSNAVEZDONCJAMAISCHIPEDESPOMMESPARDESSUSUNMUROUILYAVAITDESCULSDEBOUTEILLESUNEPORTEVITREECACOUPELESCORSAUXPIEDSDELAGARDENATIONALEQUANDELLEVEUTMONTERSURUNEBARRICADEPARDILEVERREESTTRAITREAHCAVOUSNAVEZPASUNEIMAGINATIONEFFRENEEMESCAMARADES
qui nous vient tout droit du livre "Les Mis�rables"
Nous n'avons malheureusement pas de r�el texte fonctionnant avec le d�cryptage de permuttation puisqu'il se base uniquement sur l'apparition
de toutes les lettres. Et nous avons donc des d�callages, nous avons quand m�me test� avec un exemple o� la fr�quence d'apparition est la m�me 
que celle que nous avons et �a fonctionne bien
Texte test� :
EEEEEEEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAIIIIIIIIIIIIIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSSSSNNNNNNNNNNNNNNNNNNNNNNRRRRRRRRRRRRRRRRRRRRRTTTTTTTTTTTTTTTTTTTTOOOOOOOOOOOOOOOOOOOLLLLLLLLLLLLLLLLLLUUUUUUUUUUUUUUUUUDDDDDDDDDDDDDDDDCCCCCCCCCCCCCCCMMMMMMMMMMMMMMPPPPPPPPPPPPPGGGGGGGGGGGGBBBBBBBBBBBVVVVVVVVVVHHHHHHHHHFFFFFFFFQQQQQQQYYYYYYXXXXXJJJJKKKWWZ
(On pourrait changer l'ordre des lettres, tout ce qui compte est le nombre de fois que la lettre apparait)
