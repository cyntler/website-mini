# Instrukcje dla agentów

## Zmiany na stronie i commity

- Po wykonaniu zmian na stronie, takich jak poprawki treści, nazw, odnośników lub tłumaczeń, sprawdź wynik i od razu utwórz commit. Nie czekaj na osobne polecenie użytkownika ani dodatkowe potwierdzenie commita.
- Zmiany dotyczące obu języków wprowadzaj w wersjach PL i EN. Wspólny szablon znajduje się w `src/index.html`, a treści i odnośniki zależne od języka w `src/translations/pl.json` i `src/translations/en.json`.
- Po zmianach wpływających na stronę uruchom `npm run build` i sprawdź odpowiednie wyniki w `dist/index.html` (EN) oraz `dist/pl/index.html` (PL). Przed commitem uruchom `git diff --check`.
- Commituj pliki należące do zadania, z krótkim opisem zmiany. Zachowaj niezwiązane zmiany użytkownika. Zwykły commit nie jest poleceniem wydania.

## Wydanie i publikacja

- Gdy użytkownik zleci wydanie, np. napisze „gotowe, release”, uruchom `npm run release` bez ponownego pytania o zgodę. To polecenie jest autoryzacją utworzenia i wypchnięcia wydania na GitHub oraz publikacji strony przez GitHub Actions.
- Przed wydaniem upewnij się, że zmiany zadania są sprawdzone i zacommitowane. Jeśli użytkownik nie poda numeru wersji, dla drobnych zmian wybierz podbicie `patch` w procedurze `release-it`.
- Doprowadź wydanie do końca: aktualizacja wersji, commit wydania, tag `v${version}`, push na GitHub i utworzenie GitHub Release, zgodnie z `.release-it.json`.
- Push nowego tagu uruchamia `.github/workflows/release.yml`. Workflow buduje stronę, synchronizuje ją do S3 i unieważnia cache CloudFront.
- Sprawdź, czy nowy tag trafił na GitHub i czy uruchomiony workflow zakończył się sukcesem. Podaj użytkownikowi numer wydania i link do jego uruchomienia. Jeśli wystąpi błąd, wskaż etap i przyczynę; nie zgłaszaj udanej publikacji bez potwierdzenia.
