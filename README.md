# import order:

- react
- libraries
- types
- lib
- hooks
- shadcn components
- ui components

## example task

Daten-Fetching
Nutzen Sie React Query, um aus einer (fiktiven) API Benutzerdaten zu holen.
Die API liefert ein Objekt mit
interface User {
id: number;
name: string;
email: string;
}
Endpoint (Mock): https://example.com/api/users?page={page}&search={search}
– page: Seitenzahl (1-basiert)
– search: Filter für den User-Namen

Tabelle
Verwenden Sie TanStack Table (v8+) für die Darstellung.
Spalten: Name, E-Mail, Aktionen
In „Aktionen“ ganz rechts ein Button „Details“ (ohne Funktionalität).

Suche & Pagination
Oben über der Tabelle ein Text-Input „Nutzer suchen…“, der den API-Call mit search= neu auslöst.
Unten an der Tabelle Pagination-Buttons „‹ Vorherige“ und „Nächste ›“.

TypeScript & Styling
Alles in TypeScript.
Minimales Styling mit Tailwind CSS (Tabellen­layout, Abstände, Buttons).

Bonus (falls Zeit)
Kurzer Jest-/Testing Library–Test, der sicherstellt, dass beim Tippen in das Suchfeld der Query-Key von React Query aktualisiert wird.
