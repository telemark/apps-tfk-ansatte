#Søk etter ansatte#

Nettsiden som viser kontaktinformasjon for ansatte og avdelinger i Telemark fylkeskommune.

Sidene kan sees på [apps.t-fk.no/ansatte](http://apps.t-fk.no/ansatte)

##Slik setter du opp din egen kopi##

Nettløsningen bruker [Ember.js](http://emberjs.com/), [Bootstrap](http://getbootstrap.com/) og Telemark fylkeskommunes [åpne API](http://ws.t-fk.no/help/index.html).

Start med å klone repoet fra GitHub.

```
$ git clone git@github.com:telemark/apps-tfk-ansatte.git
```

Deretter kan du servere filene fra fritt valgt webserver.

##Test##
For å kjøre [QUnit](https://qunitjs.com/)-testene legger du til "?test" på slutten av rot-urlen.

##API##

Løsningen benytter Telemark fylkeskommunes åpne API.

Les mer om webservicene på [ws.t-fk.no/help/index.html](http://ws.t-fk.no/help/index.html) og om hva vi deler på [apps.t-fk.no/api](http://apps.t-fk.no/api/#/)

##Lisens##
MIT

##Todo##
- Byggetrinn for minimering av javascript
- Byggetrinn for minimering av CSS
- Byggetrinn for kompilering av handlebars
- Fullstendig testsuite
- Bedre responsivitet
- Porte til det nye APIet