import { Ls } from "./Variable.mjs";

export function guess(tabGuess, nb){
    let LOG = "";
    let nbEssais = 0;
    let trouver = false;
    tabGuess.forEach(guess => {
        if (guess > nb){
            LOG =  `LOG[${guess}] : ${guess} : C'est moins`;
            nbEssais += 1;
        }
        else if (guess < nb){
            LOG =  `LOG[${guess}] : ${guess} : C'est plus`;
            nbEssais += 1;
        }
        else{
            LOG =  `LOG[${guess}] : ${guess} est la bonne réponse, vous l'avez trouvée en ${nbEssais} essais !`;
            trouver = true;
        }
        // console.log(LOG);
    });
    return trouver;
}

export function scores(){
    let tabScore;
    if(Ls.get("tabScore") === null){
        tabScore = [];
    }else{
        tabScore = JSON.parse(Ls.get("tabScore"));
    }
    // tabScore.forEach((score) => {
    //     console.log(score);
    // })
    return tabScore;
}

export function resetScore(){
    Ls.clear();
}

export function scoreBy(name){
    let tabScore;
    if(Ls.get("tabScore") === null){
        tabScore = [];
    }else{
        tabScore = JSON.parse(Ls.get("tabScore"));
    }
    // tabScore.forEach((score) => {
    //     if(score.nom === name){
    //         console.log(score);
    //     }
    // })
    return tabScore;
}
