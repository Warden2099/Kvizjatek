Kvíz játék projekt
Nagy Szabolcs

A projekt munkám célja egy webes kvízjáték-alkalmazás készítése. A játék során a játékos kiválaszt egy kategóriát és ahhoz kapcsolódó kérdéseket kap. A kérdések több válaszlehetőségesek, tehát 4 válasz közül kell választani. A kérdés megválaszolására időkorlát van szabva, ha a játékos kifut az időből a kérés automatikusan helytelen. A játék a helyes válaszokat pontozza és a játék végén megjeleníti az elért eredményt. A kérdések egy külön JavaScript objektumban vannaktárolva kategóriánként.
A projekt HTML, CSS és vanilla JavaScript használatával készül 

Főbb funkciók:
Kérdések és válaszlehetőségek: Minden kérdéshez négy válaszlehetőség tartozik, amelyek közül csak egy a helyes. A válaszok sorrendje véletlenszerű lehet.
Kategóriaválasztás: A játék indításkor a játékos kategóriát választhat (általános tudás, történelem, földrajz, filmek). A kérdéseket ennek megfelelően kapja.
Időkorlátos válaszadás: Minden kérdés megválaszolására egy előre meghatározott idő (15 - 15 másodperc) van. Ha a játékos nem választ időben, a kérdés lezárul és játékos nem kap pontot.
Pontszám számítása: Helyes válasz esetén a játékos pontot kap. A pontszám a válasz után és a kvíz végén jelenik meg
Eredmény megjelenítése: A kvíz végén a felhasználó visszajelzést kap az elért eredményről

Felhasználói felület részei:
Kategória választó képernyő
Kérdések megjelenítése válasz gombokkal
Időmérő
Kérdés száma (pl. 2/15)
Továbblépés a következő kérdésre
Ahelyes válasz kijelzése a  válasz után
Eredményoldal a kvíz végén az elért pontszámmal
Info ablak ami leírja a játék szabályait
