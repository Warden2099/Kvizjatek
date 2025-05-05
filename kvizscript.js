let jelenKviz = []; // Aktuális kérdéssor
let jelenKerdesIdnex = 0;
let valasztottKategoria = "";
let pontszam = 0;
let ido; // Időzítő tárolása
let idoHatra = 15; // Hátralévő idő tárolása

// HTML elemek
const kezdokep = document.querySelector('.kezdokep');
const kvizkep = document.querySelector('.kvizkep');
const eredmenykep = document.querySelector('.eredmenykep');

const kategoriaGombok = document.querySelectorAll('.kat_gomb');
const startGomb = document.querySelector('.start_gomb');
const kerdesElem = document.querySelector('.kerdes');
const valaszokLista = document.querySelector('.valaszok');
const kerdesSzamElem = document.querySelector('.kerdes_szam');
const kvizCimElem = document.querySelector('.kviz_cim');
const tovabbGomb = document.querySelector('.tovabb_gomb');

const eredmenyUzenet = document.querySelector('.erdemeny_uzenet');
const ujraGomb = document.querySelector('.ujra_gomb');
const visszaGomb = document.querySelector('.vissza_gomb');

const infokep = document.querySelector('.infokep');
const infoGomb = document.querySelector('.info_gomb');
const infoVisszaGomb = document.querySelector('.info_vissza_gomb');
const infoProjektSzoveg = document.querySelector('.info_projekt_szoveg');


// Kérdések és válaszok tömbjei
const kvizAdatsor = {
    "Általános tudás": altalanosTudas,
    "Történelem": tortenelem,
    "Földrajz": foldrajz,
    "Filmek": film
};

// Kategória választás kezelése
kategoriaGombok.forEach(button => {
    button.addEventListener('click', () => {
        kategoriaGombok.forEach(btn => btn.classList.remove('kivalasztva')); // Előző kiemelés eltávolítása

        // Kiválasztott kategória kiemelése
        button.classList.add('kivalasztva');
        valasztottKategoria = button.innerText;
        console.log("Kategória kiválasztva:", valasztottKategoria);
    });
});

function randomKerdesek(kvizKerdesek) {
    const masoltKerdesek = [...kvizKerdesek]; // Másolat készítése az eredeti tömbről
    const randomValasztott = [];

    while (randomValasztott.length < 10) {
        const randomIndex = Math.floor(Math.random() * masoltKerdesek.length);
        randomValasztott.push(masoltKerdesek[randomIndex]);
        masoltKerdesek.splice(randomIndex, 1); // Véletlen kiválasztott kérdés eltávolítása
    }

    return randomValasztott; // Visszaadja a véletlenszerűen kiválasztott kérdéseket
}


// Start gomb kezelése
startGomb.addEventListener('click', () => {
    if (valasztottKategoria === "") {
        alert("Válassz ki egy kategóriát először!");
        return;
    }
    jelenKviz = randomKerdesek([...kvizAdatsor[valasztottKategoria]]); // Meghívja a randomKerdesek függvényt a kiválasztott kategóriával
    jelenKerdesIdnex = 0;
    pontszam = 0;

    kezdokep.style.display = "none";
    kvizkep.style.display = "block";
    eredmenykep.style.display = "none";
    infokep.style.display = "none";

    kvizCimElem.innerText = valasztottKategoria + " kvíz";
    console.log("A játék indul...");
    console.log("Kvíz:", valasztottKategoria);
    mutatKerdes();
});

// Kérdés megjelenítése
function mutatKerdes() {
    const jelenKerdes = jelenKviz[jelenKerdesIdnex];
    kerdesElem.innerText = jelenKerdes.question;
    kerdesSzamElem.innerText = `${jelenKerdesIdnex + 1} / ${jelenKviz.length}`;

    // válaszok törlése
    valaszokLista.innerHTML = "";

    // válaszok megjelenítése
    jelenKerdes.options.forEach(option => {
        const li = document.createElement('li');
        li.className = "valasz_lehet";
        li.innerHTML = `<p>${option}</p>`;
        li.addEventListener('click', () => {
            leallitIdozito(); // Időzítő leállítása válaszadáskor
            valaszKivalasztva(option);
        });
        valaszokLista.appendChild(li);
        console.log("Válasz lehetőség:", option);
    });
    // Időzítő indítása
    inditIdozito();
    console.log(jelenKerdesIdnex+1, "Kérdés szövege:", jelenKerdes.question);
}


// Válasz kiválasztása
function valaszKivalasztva(valasztott) {
    leallitIdozito(); // Időzítő leállítása
    const helyesValasz = jelenKviz[jelenKerdesIdnex].correctAnswer;

    // Az összes válasz elem lekérése
    const valaszElemek = document.querySelectorAll('.valasz_lehet');

    // Visszajelzés a válaszokra
    valaszElemek.forEach(li => {
        if (li.innerText === helyesValasz) {
            li.classList.add('helyes'); // Helyes válasz zöld
        } else if (li.innerText === valasztott) {
            li.classList.add('helytelen'); // Helytelen válasz piros
        }
        // Kattintás letiltása a válaszoknál
        li.style.pointerEvents = "none";
    });

    // Helyes válasz esetén pont növelése
    if (valasztott === helyesValasz) {
        pontszam++;
    }

    // Tovább gomb engedélyezése
    tovabbGomb.disabled = false;
    console.log("Válasz leadva:", valasztott);
}

// Tovább gomb kezelése
tovabbGomb.addEventListener('click', () => {
    jelenKerdesIdnex++;

    if (jelenKerdesIdnex >= jelenKviz.length) {
        tovabbGomb.innerHTML = "Bejejezés";
        jatekVege();
    } else {
        mutatKerdes();
    }

    tovabbGomb.disabled = true;
    console.log("Tovább!");
});

// Játék vége
function jatekVege() {
    kezdokep.style.display = "none";
    kvizkep.style.display = "none";
    eredmenykep.style.display = "block";
    infokep.style.display = "none";

    eredmenyUzenet.innerText = `Az elért eredményed: ${pontszam} / ${jelenKviz.length}`;
    console.log("Játék vége!");
}

// Újra gomb
ujraGomb.addEventListener('click', () => {
    // Ugyan az mint a start gomb, csak a kategória újra választása nélkül
    jelenKviz = randomKerdesek(...kvizAdatsor[valasztottKategoria]);
    jelenKerdesIdnex = 0;
    pontszam = 0;

    kezdokep.style.display = "none";
    kvizkep.style.display = "block";
    eredmenykep.style.display = "none";

    kvizCimElem.innerText = valasztottKategoria + " kvíz";
    console.log("Újra!");
    mutatKerdes();

});

// Vissza gomb
visszaGomb.addEventListener('click', () => {
    kezdokep.style.display = "block";
    kvizkep.style.display = "none";
    eredmenykep.style.display = "none";
    infokep.style.display = "none";
    console.log("Vissza a kezdőképre!");
});


// Időzítő indítása
function inditIdozito() {
    const idozitoElem = document.querySelector('.idozito');
    idoHatra = 15; // Idő visszaállítása
    idozitoElem.innerText = `${idoHatra} mp`;

    ido = setInterval(() => {
        idoHatra--;
        idozitoElem.innerText = `${idoHatra} mp`;
        if (idoHatra <= 5) {
            idozitoElem.classList.add('warning');
        }
    
        if (idoHatra <= 0) {
            clearInterval(ido); // Időzítő leállítása
            automatikusLeallas(); // Válaszadás leállítása
            idozitoElem.classList.remove('warning');
        }

    }, 1000); // 1 másodpercenként frissítés
}

// Időzítő leállítása
function leallitIdozito() {
    clearInterval(ido);
}

// Valaszadás automatikus leállítása
function automatikusLeallas() {
    const helyesValasz = jelenKviz[jelenKerdesIdnex].correctAnswer;

    // Helyes válasz kiemelése
    const valaszElemek = document.querySelectorAll('.valasz_lehet');
    valaszElemek.forEach(li => {
        if (li.innerText === helyesValasz) {
            li.classList.add('helyes');
        }
        li.style.pointerEvents = "none"; // Válaszlehetőségek letiltása
    });

    // Tovább gomb automatikus kattintása
    tovabbGomb.disabled = false;
    console.log("Idő lejárt!");
}

// Információs gomb
infoGomb.addEventListener('click', () => {
    kezdokep.style.display = "none";
    kvizkep.style.display = "none";
    eredmenykep.style.display = "none";
    infokep.style.display = "block";
    console.log("Információs ablak megnyitva!");
});

// Információs vissza gomb
infoVisszaGomb.addEventListener('click', () => {
    kezdokep.style.display = "block";
    kvizkep.style.display = "none";
    eredmenykep.style.display = "none";
    infokep.style.display = "none";
    console.log("Vissza a kezdőképre!");
});