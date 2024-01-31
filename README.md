# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Emils gitarr butik

## Beskrivning

Detta projekt är en e-handels hemsida som Emil Gyllensvärd Salmi har byggt som sitt examensarbete till sin utbildning Webbutveckling inom E-handel. I detta projekt har jag (Emil) byggt en hemsidan där jag ska "sälja" min gitarrer och pedaler. Hemsidan är byggt med React, Node.js och Typescript. Databasen till hemsidan använder jag mig av Firebase Firestore och Storage av Google. Firestore är för data och Storage är för bilder samt ljudfiler. Det har tagit ca "si och så" många timmar att bygga. 
Hemsidan är väldigt basic, du går in på en produkt som du vill köpa och lägger den i varukorgen där du sedan skriver in dina uppgifter för att slutföra köpet. Ordern kommer att komma in i en databas så säljaren kan se vem och vart produkten ska. Sidan har samt en basic Om Oss sida där lite "information" om företaget finns samt en google maps geocodeing API för att visa adressen.



## Installation

För att installera och köra projektet, följ dessa steg:

1. Klona detta repository: `git clone https://github.com/emilgsalmi/examensProject.git`
2. Navigera till projektmappen: `cd projectEGB`
3. Installera beroenden: `npm install`
4. Starta applikationen: `npm start`

## Beroenden

Projektet har följande beroenden kan man se i package.json!

För att installera beroenden, använd: `npm install`

## Krav

För att köra detta projekt behöver du:

- Node.js (version >= 12.0.0)
- npm (Node Package Manager)

## Begränsningar

Projektet har några begränsningar och kända problem:

- Endast testat på webbläsare X och Y. Andra webbläsare kan uppleva kompatibilitetsproblem.
- Inkompatibilitet med versioner av bibliotek Z.

## Målplattformar

Projektet är utformat för att köras på:

- Webbplatser med stöd för ECMAScript 2015 (ES6) och senare.
- Webbläsare som Chrome (version >= 80), Firefox (version >= 75), Safari (version >= 13), Edge (version >= 80).
- Operativsystem: Windows 10, MacOS, Linux.
- Fungerar även på tabletter och mobila enheter.

## Licens

Detta projekt är licensierat under [MIT-licensen](LICENSE).
