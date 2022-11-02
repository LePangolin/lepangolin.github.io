
function jeu(){
    const nb = Math.floor(Math.random() * 100) + 1;
    let nbEssais = 0;
    let nbEssaisRestants = 15;
    let essais = document.getElementById("essais")
    let difficulte = "facile"
    essais.innerHTML = nbEssaisRestants;


    for (let i = 0; i < 3; i++) {
        document.getElementsByName("difficulte")[i].addEventListener("click", function () {
            switch (this.value) {
                case "1":
                    nbEssaisRestants = 15;
                    essais.innerHTML = nbEssaisRestants;
                    difficulte = "facile";
                    break;
                case "2":
                    nbEssaisRestants = 10;
                    essais.innerHTML = nbEssaisRestants;
                    difficulte = "moyen";
                    break;
                case "3":
                    nbEssaisRestants = 5;
                    essais.innerHTML = nbEssaisRestants;
                    difficulte = "difficile";
                    break;
            }
        })
    }

    document.getElementById("validateDifficulty").addEventListener("click", function () {
        console.log("click");
        for (let i = 0; i < 3; i++) {
            document.getElementsByName("difficulte")[i].disabled = true;
        }
        let divDiff = document.getElementById("difficulte");
        let divJeu = document.getElementById("jeu");
        if(!divDiff.classList.contains("hidden")){
            divDiff.classList.add("hidden");
            divJeu.classList.remove("hidden");
        }
    });

    document.getElementById("buttonGame").addEventListener("click", e => {
        if (document.getElementById("nombre").value !== "") {
            guess()
        }
    });

    document.getElementById("nombre").addEventListener("keypress", e =>{
        if (document.getElementById("nombre").value !== "" && e.key === "Enter"){
            for (let i = 0; i < 3; i++) {
                document.getElementsByName("difficulte")[i].disabled = true;
            }
            guess();
        }
    });


    console.log(nb);

    function getNom(){
        let nom = document.getElementById("nom").value;
        let tabScore;
        if(localStorage.getItem("tabScore") === null){
            tabScore = [];
        }else{
            tabScore = JSON.parse(localStorage.getItem("tabScore"));
        }
        if(document.getElementById("nom").value.length < 10){
            let nL = document.getElementById("namelength")
            if(nL != undefined){
                nL.remove();
            }
            tabScore.push({nom: nom, score: nbEssais+1});
            tabScore.sort((a, b) => a.score - b.score);
            localStorage.setItem("tabScore", JSON.stringify(tabScore));
            document.getElementById("playerName").remove();
            document.getElementById("buttonName").remove();
            let highscores = document.createElement("div");
            highscores.id = "highscores";
            highscores.innerHTML = "<br><br><h2>Tableau des highscores</h2>";
            tabScore.forEach(score => {
                let p = document.createElement("p");
                p.innerHTML = score.nom + " : " + score.score;
                highscores.appendChild(p);
            });
            document.getElementById("highScores").appendChild(highscores);
            let reset = document.createElement("button");
            reset.id = "reset";
            reset.innerHTML = "Redémarrer";
            reset.addEventListener("click", function () {
                location.reload();
            });
            document.getElementById("result").appendChild(reset);
        }else{
            let namelength = document.createElement("div");
            namelength.innerHTML = '<p style="color:red">Votre nom est trop long. 10 caractères maximum.</p>';
            namelength.id = "namelength";
            document.getElementById("result").appendChild(namelength);
        }
    }

    function guess(){
        if ( nbEssais < nbEssaisRestants) {
          let guess = document.getElementById("nombre").value
          document.getElementById("nombre").value = "";
          let p =  document.createElement("p");
          if (guess > nb){
              p.innerHTML =  `${guess} : C'est moins`;
              nbEssais += 1;
          }
          else if (guess < nb){
              p.innerHTML =  `${guess} : C'est plus`;
              nbEssais += 1;
          }
          else{
              p.innerHTML =  `${guess} est la bonne réponse, vous l'avez trouvée en ${nbEssais+1} essais !`;
              playerName = document.createElement("div");
              playerName.innerHTML = 'Entrez votre nom: <input type="text" id="nom"></input>';
              playerName.id = "playerName";
              button = document.createElement("button");
              button.id = "buttonName";
              button.innerHTML = "Valider";
              playerName.addEventListener("keypress", e =>{
                  if(e.key === "Enter"){
                      getNom();
                  }
              });
              button.addEventListener("click", getNom);
              p.appendChild(playerName);
              p.appendChild(button);
              document.getElementById("buttonGame").disabled = true;
              document.getElementById("nombre").disabled = true;
              document.getElementById("dinausore").classList.remove("hidden");
              document.getElementById("disco").classList.remove("hidden");
          }
          document.getElementById("result").appendChild(p);
        } else {
            let p =  document.createElement("p");
            p.innerHTML = `Vous avez perdu, la bonne réponse était ${nb}`;
            document.getElementById("buttonGame").disabled = true
            document.getElementById("result").appendChild(p);
            document.getElementById("nombre").disabled = true;
            let reset = document.createElement("button");
            reset.id = "reset";
            reset.innerHTML = "Redémarrer";
            reset.addEventListener("click", function () {
                location.reload();
            });
            document.getElementById("result").appendChild(reset);
        }
    }
}


jeu();

function scores(){
    let tabScore;
    if(localStorage.getItem("tabScore") === null){
        tabScore = [];
    }else{
        tabScore = JSON.parse(localStorage.getItem("tabScore"));
    }
    tabScore.forEach((score) => {
        if(document.getElementById("highScores")){
            document.getElementById("highScores").innerHTML = "";
        }
        let p = document.createElement("p");
        p.innerHTML = score.nom + " : " + score.score;
        document.getElementById("highScores").appendChild(p);
    })
}

function resetScore(){
    localStorage.clear();
    if(document.getElementById("highScores")){
        document.getElementById("highScores").innerHTML = "";
    }
}

function scoreBy(name){
    let tabScore;
    if(localStorage.getItem("tabScore") === null){
        tabScore = [];
    }else{
        tabScore = JSON.parse(localStorage.getItem("tabScore"));
    }
    tabScore.forEach((score) => {
        if(score.nom === name){
            if(document.getElementById("highScores")){
                document.getElementById("highScores").innerHTML = "";
            }
            let p = document.createElement("p");
            p.innerHTML = score.nom + " : " + score.score;
            document.getElementById("highScores").appendChild(p);
        }
    })
}

document.getElementById("Empty").addEventListener("click", resetScore);

document.getElementById("show").addEventListener("click", scores);

document.getElementById("search").addEventListener("click", function(){
    let name = document.getElementById("nomHighScore").value;
    scoreBy(name);
});