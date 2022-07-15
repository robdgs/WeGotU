import { URLsArray } from "./api.js";

const SelectEl = document.querySelector(".locations");
const resultsEl = document.getElementById("card_plus_image");
const loaderEl = document.querySelector(".loader");

const URLs = {
  image: {
    prefix: "https://api.openweathermap.org/img/w/",
    suffix: ".png",
  },
  api: {
    prefix: "https://api.openweathermap.org/data/2.5/weather?q=",
    suffix: "&appid=022e5b8fec789e7be6b497c43973b47b",
  },
};

fetchingAllCards();

SelectEl.addEventListener("change", function () {
  resultsEl.innerHTML = ``;
  loaderEl.style.display = "block";

  if (SelectEl.value === "") {
    fetchingAllCards();
  } else {
    fetchCity(URLs.api.prefix.concat(SelectEl.value, URLs.api.suffix));
  }
});

function fetchingAllCards() {
  for (let i = 0; i < URLsArray.length; i++) {
    fetchCity(URLsArray[i]);
  }
}

function fetchCity(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let completeImgURL = URLs.image.prefix.concat(
        data.weather[0].icon,
        URLs.image.suffix
      );

      resultsEl.innerHTML += `
        <div class="weather_cards">
       <h3 class="weather_location">${data.name}</h3>
        <img src="${completeImgURL}" alt="weather icon">
     <h4 class="weather_main">${data.weather[0].main}</h4>
            <p class="weather_description">${data.weather[0].description}</p>
        </div>`;
    })
    .catch((error) => {
      console.log(error);
      //alert(error.message);
    })
    .finally(() => {
      loaderEl.style.display = "none";
    });
}

//TO-DO LIST:

//devo ottenere url diverse -DONE
// le mie urls sono simili: l'inizio e l'id si ripetono, cambia solo il nome della città
// la parte non in comune delle urls coincide con il value della select
// dunque mi basta concatenare parte iniziale+value select+parte finale sottoforma di strighe

// stessa cosa di sopra faccio con le url delle immagini che cambiano, però concateno con il valore
//attribuito ad icon dentro l'api -DONE

//ho due casi nella select : selezionare la value di una città la value  stringa vuota
// come me ne accorgo? se la lunghezza della stringa di value è > di 1 allora si tratta di una città
//altrimenti caso di default
//caso città: faccio partire la fetch  per il singolo caso e si crea una sola card -DONE
//caso default: fare una fetch per ogni url appartente ad una città e mostrare le nove card corrispondenti
// mi servirebbe un array di url (o di città) -DONE

// mettere la fetch in una funzione che ha l'ulr come parametro
