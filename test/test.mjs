import {assertTrue, assertFalse, assertEquals, assertNotEquals, assertJson, assertArray, assertArrayJson, assertInArray, assertNotInArray, assertEmptyArray,assertNotEmptyArray, assertNull, assertNotNull, launchTest} from "./TestLibrairie.mjs";

import { guess, scores, resetScore, scoreBy } from "./TestPlusOuMoins.mjs";

import { Ls } from "./Variable.mjs";

function guessNonTrouver() {
  assertFalse(guess([25, 50, 85, 26, 78, 95, 15], 101), "Le nombre est trouver");
}

function guessTrouver() {
  assertTrue(guess([25, 50, 85, 26, 78, 95, 15], 26), "Le nombre n'est pas trouver");
}

function scoresVide() {
  assertEmptyArray(scores(), "Le tableau n'est pas vide");
}

function scoresNonVide() {
  Ls.set(
    "tabScore",
    JSON.stringify([
      {
        nom: "test",
        score: 10,
      },
      {
        nom: "test2",
        score: 5,
      },
    ])
  );
  assertArrayJson(scores(), [
    {
      nom: "test",
      score: 10,
    },
    {
      nom: "test2",
      score: 5,
    },
  ]);
}


function resetScoreVide() {
  resetScore();
  assertNull(Ls.get("tabScore"), "Le tableau n'est pas vide");
}

function scoreByNameVide() {
  Ls.set(
    "tabScore",
    JSON.stringify([
      {
        nom: "test",
        score: 10,
      },
      {
        nom: "test2",
        score: 5,
      },
    ])
  );
  assertNotInArray(scoreBy("test3"), {
    nom: "test3",
    score: 0,
  });
}

function scoreByNameNonVide() {
  Ls.set(
    "tabScore",
    JSON.stringify([
      {
        nom: "test",
        score: 10,
      },
      {
        nom: "test2",
        score: 5,
      },
    ])
  );
  assertInArray(scoreBy("test"), {
    nom: "test",
    score: 10,
  });
}

// LANCEMENT DES TESTS
let tabFunction = [
  guessNonTrouver,
  guessTrouver,
  scoresVide,
  scoresNonVide,
  resetScoreVide,
  scoreByNameVide,
  scoreByNameNonVide,
];


launchTest(tabFunction);