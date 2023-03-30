//https://pokeapi.co/api/v2/pokemon-color/yellow/

// var obj;
// fetch("https://pokeapi.co/api/v2/pokemon-color/yellow/")
//   .then((res) => res.json())
//   .then((data) => {
//     obj = data;
//   })
//   .then(() => {
//     for (i = 0; i < 20; i++) {
//       console.log(obj.pokemon_species[i].name);
//     }
//   });

// var request = new XMLHttpRequest();

// console.log(this.response);
$(document).ready(function () {
  var request = new XMLHttpRequest();
  request.open("GET", "https://pokeapi.co/api/v2/pokemon-color/red/", true);

  // request.onload = function () {
  //   console.log(request.response);
  // };
  Handlebars.registerHelper("matematika", function (indexNr, operator, brojN) {
    let tmpPrvi = parseInt(indexNr);
    let tmpDrugi = parseInt(brojN);
    return {
      "+": tmpPrvi + tmpDrugi,
      "-": tmpPrvi - tmpDrugi,
    }[operator];
  });
  function popuniPokemone() {
    const resp = JSON.parse(request.response);
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);
    const ctxData = { pokemon: resp.pokemon_species.slice(0, 20) };
    const html = template(ctxData);
    console.log(resp.pokemon_species);

    // for (i = 0; i < 20; i++) {
    //   console.log(resp.pokemon_species[i].name);
    // }

    document.getElementById("div-pokemoni").innerHTML = html;
    $('[data-toggle="popover"]').popover();
  }

  request.onload = function () {
    popuniPokemone();
  };
  request.send();
});
