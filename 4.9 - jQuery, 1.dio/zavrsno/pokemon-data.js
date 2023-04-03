$(document).ready(function () {
  Handlebars.registerHelper("matematika", function (indexNr, operator, brojN) {
    let tmpPrviBr = parseInt(indexNr);
    let tmpDrugiBr = parseInt(brojN);

    return {
      "+": tmpPrviBr + tmpDrugiBr,
      "-": tmpPrviBr - tmpDrugiBr,
      "*": tmpPrviBr * tmpDrugiBr,
      "/": tmpPrviBr / tmpDrugiBr,
      "%": tmpPrviBr % tmpDrugiBr,
    }[operator];
  });

  // https://pokeapi.co/api/v2/pokemon-color/yellow/
  let request = new XMLHttpRequest();
  // priprema poziva na (pokemon) API
  request.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow/", true);

  function popuniPokemone() {
    const resp = JSON.parse(request.response);
    //console.log(resp);
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML);
    const ctxData = {
      pokemon: resp.pokemon_species.slice(0, 20),
      tableClass: "table",
    };
    const html = template(ctxData);

    document.getElementById("div-pokemoni").innerHTML = html;
    $('[data-bs-toggle="popover"]').popover();
  }
  //   function dodajPruge() {
  //     $("tr:even").css("background-color", "#B8F4F8");
  //     $("th").css("background-color", "darkBlue");
  //     $("th").css("color", "white");
  //   }

  function dodajPruge2() {
    $("table tr").removeClass("pruge");
    $("table tr:even").addClass("pruge");
  }

  function dodajHeader() {
    $("th").css("background-color", "darkBlue");
    $("th").css("color", "whitesmoke");
  }

  function nakon2Sekunde() {
    setTimeout(() => {
      let myPokemon = $("table td a:contains('p')").filter(function () {
        return this.innerHTML.indexOf("p") == 0;
      });

      myPokemon.closest("tr").remove();

      $('<div id="skriveni"></div>')
        .insertAfter($("#div-pokemoni"))
        .text("Skrivenih: " + myPokemon.length);

      dodajPruge2();
    }, 2000);
  }

  function registrirajMouseEvent() {
    $("table tr").on("mouseenter", (event) => {
      $(event.currentTarget).css("background-color", "lightblue");
    });
    $("table tr").on("mouseleave", (event) => {
      $(event.currentTarget).removeAttr("style");
    });
  }

  function odradiOstalo() {
    // dodajPruge();
    dodajPruge2();
    dodajHeader();
    registrirajMouseEvent();
    nakon2Sekunde();
  }

  // funkcija koja ce se pozvati na loadanju stranice
  request.onload = function () {
    popuniPokemone();
    odradiOstalo();
  };
  // posalji request na (pokemon) API
  request.send();

  $(window).resize(() => {
    console.log(window.innerWidth + " x " + window.innerHeight);
  });
});
