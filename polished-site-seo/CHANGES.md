# Änderungen und Start-Checkliste

## Aufbau und Pflege

- Die deutsche Startseite liegt als `index.html` im Projektstamm. Englische, statische und indexierbare Seiten liegen unter `en/`.
- Die bearbeitbaren deutschen Vorlagen liegen unter `source/de/`. `build.js` erzeugt daraus alle Seiten und setzt den gemeinsamen Header und Footer als wiederverwendbare HTML-Vorlage ein. Es wird kein Framework benötigt.
- Der Header zeigt den Kontakt nur einmal als hervorgehobenen CTA. Das TMT-Logo verlinkt zur Startseite und weist beim Darüberfahren oder Fokussieren sichtbar darauf hin.
- Der Footer enthält die bisherigen Social-Media-Links (Facebook, Instagram, XING, LinkedIn und WhatsApp) sowie Adresse, Kontaktwege, Helpdesk, Impressum, Datenschutz und AGB in einem konsistenten Layout.
- Gemeinsame Typografie, Farben, Navigation, Footer, Barrierefreiheit, Formular- und Kartenstile liegen in `styles.css`. Die Dateien unter `assets/css/` enthalten nur seitenbezogene Layouts.
- `i18n.json` hält die Übersetzungen. Beim Build werden ausschließlich statische englische HTML-Seiten erstellt; zur Laufzeit werden keine Textknoten übersetzt.
- Nach Änderungen an Vorlagen oder Übersetzungen im Projektordner `node build.js` ausführen.

## Umgesetzte Inhalte und Technik

- Die Startseite führt jetzt mit einem dunklen, markanten Business-Central-Hero samt lokaler Produktansicht, einer klaren Dreiteilung von Beratung/Umsetzung/Begleitung, Referenzen, FAQ und einem fokussierten Kontaktabschluss. Doppelte Produkt- und Navigationsblöcke wurden entfernt. Das dunkle Grün mit hellgrünen Akzenten zieht sich als wiedererkennbares Muster auch durch die Unterseiten-Heros.
- Der Ladeindikator ist jetzt die animierte grüne Unterstreichung direkt unter dem TMT-Schriftzug; die separate Ladeleiste wurde entfernt.
- Dezente Bewegungsdetails nach dem microtech-Referenzgefühl: gestaffeltes Einblenden im Startseiten-Hero, fünf sanft animierte Hintergrundringe, ein kurzer Produktkarten-Einstieg sowie Hover-Bewegungen für Leistungs-, Referenz- und Wissenskarten. Alle neuen Effekte respektieren `prefers-reduced-motion`.
- Startseite mit Kurzvorstellung, lokalen Kundenlogos, Business-Central-FAQ und Kontakt-Teaser.
- Leistungen, Unternehmensseite mit zwei Fallstudien, einer Ansprechpartner-Karte und Kundenstimmen-Platzhaltern, Karriere, Wissen, Kontakt, Impressum, Datenschutz und 404-Seite.
- Die Karriereseite verwendet die drei vorhandenen Stellenprofile als lokale PDFs mit eindeutig beschrifteten PDF-Aktionen. Aufgaben und Angaben zum Arbeitsumfeld wurden aus den PDFs übernommen und als scanbare Bereiche gestaltet.
- Kontaktformular mit Client- und Servervalidierung, Honeypot, Lade-, Erfolgs- und Fehlerzustand sowie bis zu drei geprüften Anhängen mit insgesamt maximal 5 MB. Zulässig sind PDF, Word-, Excel- und PowerPoint-Dateien, CSV sowie PNG/JPG; Archive und ausführbare Dateien werden abgelehnt. Themen sind auf Business-Central-/ERP-Anfragen, Support und Bewerbungen beschränkt. Der Endpoint ist in `script.js` als `FORM_ENDPOINT` konfiguriert; die Implementierung liegt in `kontakt.php`.
- Ausgewählte Anhänge werden vor dem Versand mit Dateiname und Größe angezeigt und können einzeln entfernt werden; die Auswahlliste ist per Tastatur bedienbar und wird nach dem Zurücksetzen des Formulars geleert.
- Präsentations- und Karriere-CTAs führen zum Kontaktformular und wählen das Thema über `?thema=` vor. Auf der Kontaktseite ist zusätzlich ein klar markierter Platz für den noch freizugebenden Terminbuchungs-Link.
- Die Karte wird nicht automatisch eingebettet; OpenStreetMap öffnet sich erst nach Auswahl des Links. Das Business-Central-Video wird erst nach Klick über `youtube-nocookie.com` geladen.
- SEO-Metadaten, Canonical- und hreflang-Links, Open-Graph/Twitter-Tags, Organization-/LocalBusiness- und FAQPage-JSON-LD, `sitemap.xml` und `robots.txt` werden generiert.
- Inter wird lokal aus `fonts/inter-latin.woff2` geladen. Es wurden keine Tracking- oder Analytics-Skripte gefunden. Skip-Link, Tastaturfokus, reduzierte Bewegung und responsive Navigation sind enthalten.
- Die Microsoft-Partnergrafik wird lokal als PNG unter `assets/logos/microsoft.png` geladen.
- Ein kurzer Ladebildschirm erscheint während des Seitenstarts und wird nach `window.load` ausgeblendet; ein zeitlicher Fallback verhindert, dass er dauerhaft sichtbar bleibt.
- Der Hinweis am TMT-Logo erscheint nur bei Hover oder Tastaturfokus und macht die Startseiten-Verlinkung erkennbar, ohne dauerhaft unter dem Logo zu stehen.
- Die Karriereseite verwendet jetzt den gewünschten Einleitungstext: „Interesse geweckt? Wir sind jederzeit auf der Suche nach qualifizierten und motivierten Mitarbeitern. Sie möchten arbeiten, wo andere Urlaub machen? Gerne bieten wir auch Quereinsteigern eine Chance.“
- Die Bohner- und RSBT-Logos auf der „Warum TMT?“-Seite verwenden transparente PNG-Dateien ohne dunkle Hintergrundflächen.
- Impressum und Datenschutz wurden anhand der offiziellen TMT-Seiten inhaltlich erweitert. Die englischen statischen Fassungen enthalten entsprechende Übersetzungen. Angaben, die für den aktuellen Websitebetrieb noch bestätigt werden müssen, sind weiterhin sichtbar als Platzhalter markiert.
- Die Wissen-Seite verlinkt jetzt auf drei eigenständige, zweisprachige Praxisartikel zu Business-Central-Einführungen, NAV-Migrationen und AL-Erweiterungen/Schnittstellen. Jeder Beitrag enthält konkrete Prüfpunkte, Querverweise, einen Kontakt-CTA sowie Article-JSON-LD-Metadaten.
- Die Leistungsseite gruppiert die sechs Angebote in drei thematische Einstiege mit Sprungnavigation und trennt diese klar von einer kompakten Projekt-Timeline. Die Business-Central-Seite ergänzt einen Ablauf von Anfrage bis Auswertung.
- Die Insights-Karten nutzen eigene, thematische Diagramme, Kategorien und Lesezeiten. Die Praxisartikel bieten ein Inhaltsverzeichnis und Querverweise; Artikel- und Rechtstexte sind auf schmalere Lesespalten begrenzt, und rechtliche Entwurfswarnungen bleiben sichtbar.
- Das Browser-Favicon verwendet jetzt dieselben Originaldateien wie das TMT-Supportportal: das 16-Pixel- und 32-Pixel-TMT-Logo als PNG sowie beide Größen im ICO; die SVG-Fassung bindet das originale 32-Pixel-Logo ein.
- Die Business-Central-Ansicht im Startseiten-Hero wird nicht mehr im Bildausschnitt vergrößert und weniger stark perspektivisch geneigt. So bleibt die hochauflösende Produktansicht besser lesbar.

## Vor Veröffentlichung ersetzen oder prüfen

- `source/de/impressum.html`: die verantwortliche Person und Anschrift nach § 18 Abs. 2 MStV von TMT bestätigen lassen. Die übrigen Unternehmensangaben entsprechen dem zuletzt abgerufenen offiziellen Impressum; vor Veröffentlichung trotzdem auf Aktualität prüfen.
- `source/de/datenschutz.html`: Entwurf, nicht veröffentlichungsfertig. Die Beschreibung des Formulars wurde an die aktuelle lokale Implementierung angepasst (Felder, Anhänge, Versand an info@tmtsolutions.de; kein Ticket aus diesem Formular). Hosting-/Mailanbieter, konkrete Serverprotokolle, Rechtsgrundlagen, Speicherfristen, Datenschutzbeauftragter und zuständige Aufsichtsbehörde müssen für das tatsächliche Deployment bestätigt und datenschutzrechtlich geprüft werden. Die öffentlich erreichbare WordPress-Seite ist nicht durch dieses Paket ersetzt und lädt aktuell Google Analytics; Tracking-Entscheidung und Datenschutzhinweise für die Produktivversion abstimmen.
- `source/de/Karriere.html`: Bewerbungskontakt, Bewerbungsablauf, Benefits und freigegebene Informationen zu Ausbildung und Standort ergänzen.
- `source/de/Kontakt.html`: den Platzhalter zum Terminbuchungssystem durch den freigegebenen Buchungslink ersetzen. Bis dahin funktioniert der Kontaktformular-Link als Alternative.
- `source/de/Warum-TMT.html`: zwei deutlich als fiktiv gekennzeichnete Illustrationsszenarien zeigen, keine realen Kundenreferenzen oder Ergebniszusagen. Thomas Lehle steht als einzelner Ansprechpartner mit Porträt und Kontakt-E-Mail auf der Seite. Das Porträt wurde aus seinem LinkedIn-Profil übernommen, nachdem der Nutzer die Wiederverwendungsrechte bestätigt hat. Kundenstimmen nur mit ausdrücklicher Freigabe ergänzen.
- `source/de/Wissen.html` und `source/en/Wissen.html`: Artikeltitel, Zusammenfassungen und Beitragsziele vor Veröffentlichung redaktionell prüfen.
- Vor Veröffentlichung die Zustimmung zur Logo-Nutzung aller genannten Kunden prüfen. Der Hinweis steht auch im HTML bei den Referenzen.
- `build.js`: `SITE_URL` kontrollieren und auf die endgültige Produktionsdomain setzen. Kontakt- und Supportdaten sowie externe Stellenanzeigen ebenfalls auf Aktualität prüfen.
- Die Leistungen-Seite enthält bereits eine visuelle Vier-Schritte-Prozessübersicht; die Business-Central-Seite nutzt vorhandene Produktabbildungen. Bei weiteren Visuals ausschließlich freigegebene Screenshots und Projektdaten verwenden.

## Formularbetrieb

`kontakt.php` benötigt einen PHP-fähigen Hoster mit aktivierter und korrekt konfigurierter `mail()`-Zustellung, PHP-Fileinfo, für OOXML-Dateien (DOCX/XLSX/PPTX) zusätzlich ZipArchive und Upload-Konfigurationen, die mindestens 6 MB POST-Anfragen erlauben. Die tatsächliche E-Mail-Zustellung konnte hier nicht getestet werden. Vor dem Start das Formular inklusive Anhang auf dem Zielhost testen.

Bei rein statischem Hosting kann der Endpoint in `script.js` auf einen Formulardienst wie Formspree umgestellt werden. Dafür dessen Endpoint und Datenschutzbedingungen konfigurieren und die Angaben in der Datenschutzerklärung anpassen. Den aktuellen PHP-Endpoint nicht unverändert auf rein statischem Hosting deployen.

## Qualitätssicherung

- 28 generierte HTML-Seiten (14 je Sprache) nach der Aktualisierung mit `html-validate` geprüft: keine Fehler. Interne HTML-Verweise, Artikel-Metadaten und Karriere-PDF-Ziele geprüft.
- Interne Pfade, Fragmente, Bilddimensionen, Alt-Texte und CSS-Dateien lokal geprüft: keine fehlenden Verweise.
- Alle 22 Seiten bei 320, 768 und 1280 px in Chromium geprüft: kein horizontaler Überlauf.
- Sprachwahl, Kontakt-Themenauswahl und verzögertes Laden des YouTube-iFrames im Browser geprüft.
- PHP-Syntax und tatsächlicher Mailversand bleiben bis zum Test auf einem PHP-Zielhost offen. Serverseitig werden Dateityp (MIME), Anzahl, Gesamtgröße und der Anfragezweck geprüft; die inhaltliche Relevanz der Nachricht kann kein Upload-Filter zuverlässig semantisch garantieren.
