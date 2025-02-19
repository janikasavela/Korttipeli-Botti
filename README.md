Monad Oyn Koodipähkinä 2025 kesäharjoitteluun

Tehtävänä oli luoda oma botti pelaamaan korttipeliä Monadin kehittämiä vastustajia vastaan.

Botti toimi pelissä API-rajapinnan kautta, jossa oli endpointit uuden pelin luomiseen ja toimintojen tekemiseen. Autentikointi tapahtui tokenin avulla.

Vaatimukset:

Tekemäni botin pisteiden keskimääräinen erotus vastustajien pisteisiin tuli olla pienempi kuin 24 pistettä, ja pelejä tuli olla pelattuna vähintään 100.Tekemäni botin keskimääräinen piste erotus muihin pelaajiin oli -7.7, 100 peliä pelattuna.

Toteutus: Node.js, Axios, dotenv, git, JavaScript

Pelin säännöt:

4 pelaajaa | 44 kolikkoa | 33 numero (pähkinä) korttia, välillä 3-35

Pelin Alku

- Jokaisella pelaajalla on 11 kolikkoa
- 9 satunnaista korttia on poistettu, jäljelle jäävä pelipakka 24 korttia

Pelin Kulku

- Vuoron aikana pelaajilla on kaksi vaihtoehtoa:

-> Panosta ja laita kolikko kortille (jos pelaajalla on 0 kolikkoa on otettava kortti)
Jos pelaaja laittaa kolikon kortille, seuraava pelaaja päättää saman kortin kohtalosta.
-> Ota kortti ja kaikki pöydällä olevat kolikot.
Jos pelaaja ottaa kortin, pakasta nostetaan uusi kortti, ja sama pelaaja jatkaa vuoroaan.

Pisteiden Laskeminen

- Kortit ovat plus-pisteitä; Kolikot miinus-pisteitä
- Korttien pisteet lasketaan siten, että peräkkäisistä numeroista koostuvista sarjoista, vain kunkin sarjan pienin kortti lasketaan pisteisiin
- Tavoitteena on kerätä mahdollisimman vähän pisteitä
