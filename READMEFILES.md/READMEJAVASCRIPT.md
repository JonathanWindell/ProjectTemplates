# JavaScript Helper Utilities

En samling återanvändbara JavaScript-hjälpklasser och funktioner för både webbläsarutveckling och Node.js-applikationer. Dessa verktyg är utformade för att förenkla vanliga uppgifter och erbjuda en konsekvent API för dina projekt.

## Innehåll

- [Installation](#installation)
- [Översikt](#översikt)
- [Användning](#användning)
  - [DOMUtils](#domutils)
  - [FormUtils](#formutils)
  - [StorageUtils](#storageutils)
  - [APIClient](#apiclient)
  - [DataUtils](#datautils)
  - [Logger](#logger)
  - [NodeUtils](#nodeutils)
- [Bidra](#bidra)
- [Licens](#licens)

## Installation

Inkludera biblioteket i ditt projekt genom att ladda ner `js-helper-utilities.js`-filen:

```bash
# Med npm
npm install --save path/to/js-helper-utilities

# Med yarn
yarn add path/to/js-helper-utilities
```

Eller inkludera direkt i HTML:

```html
<script src="path/to/js-helper-utilities.js"></script>
```

## Översikt

Detta bibliotek innehåller följande moduler:

- **DOMUtils**: DOM-manipulationsfunktioner för webbläsaren
- **FormUtils**: Formulärhantering och validering
- **StorageUtils**: Förenklad åtkomst till localStorage
- **APIClient**: Konsekvent API-anropshantering för både webbläsaren och Node.js
- **DataUtils**: Allmänna datamanipuleringsfunktioner
- **Logger**: Strukturerad loggning med olika nivåer
- **NodeUtils**: Node.js-specifika hjälpfunktioner

## Användning

### DOMUtils

DOM-manipulationsfunktioner för webbläsarens frontend.

```javascript
// Hitta element
const header = DOMUtils.select('#header');
const buttons = DOMUtils.selectAll('.button');

// Skapa element med attribut och barn
const div = DOMUtils.create('div', 
  { 
    id: 'container', 
    classList: ['box', 'large'], 
    style: { backgroundColor: 'blue' } 
  },
  [
    DOMUtils.create('h2', {}, 'Rubrik'),
    DOMUtils.create('p', {}, 'Textinnehåll')
  ]
);

// Lägg till eventlyssnare med enkel borttagning
const removeEvent = DOMUtils.on(button, 'click', () => {
  console.log('Knappen klickades!');
});

// Ta senare bort eventlyssnaren
removeEvent();
```

### FormUtils

Hantera formulärdata och validering.

```javascript
// Hämta formulärdata som ett objekt
const form = document.querySelector('#registrationForm');
const formData = FormUtils.getValues(form);

// Validera data
const validationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 20
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Vänligen ange en giltig e-postadress'
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value, allValues) => {
      if (!/[A-Z]/.test(value)) {
        return 'Lösenordet måste innehålla minst en stor bokstav';
      }
      return null;
    }
  }
};

const validation = FormUtils.validate(formData, validationRules);

if (validation.isValid) {
  // Fortsätt med formulärinskickning
} else {
  // Visa valideringsfel
  console.log(validation.errors);
}
```

### StorageUtils

Förenkla interaktion med webbläsarens localStorage.

```javascript
// Spara data
StorageUtils.save('user', { id: 123, name: 'Test Testsson' });

// Hämta data
const user = StorageUtils.get('user');
console.log(user.name); // 'Test Testsson'

// Hämta med standardvärde om nyckeln inte finns
const settings = StorageUtils.get('settings', { theme: 'light' });

// Ta bort data
StorageUtils.remove('tempData');

// Rensa all lagrad data
StorageUtils.clear();
```

### APIClient

En konsekvent HTTP-klient för både webbläsare och Node.js.

```javascript
// Konfigurera basURL
APIClient.setBaseUrl('https://api.example.com/v1');

// Ange autentiseringstoken
APIClient.setAuthToken('jwt-token-here');

// GET-förfrågan med parametrar
const users = await APIClient.get('/users', { page: 1, limit: 10 });

// POST-förfrågan med data
const newUser = await APIClient.post('/users', {
  name: 'Test Testsson',
  email: 'test@example.com'
});

// PUT-förfrågan
const updatedUser = await APIClient.put('/users/123', {
  name: 'Uppdaterad Testsson'
});

// DELETE-förfrågan
await APIClient.delete('/users/123');
```

### DataUtils

Allmänna verktyg för datamanipulering.

```javascript
// Djupklona ett objekt
const original = { user: { name: 'Test', details: { age: 30 } } };
const clone = DataUtils.deepClone(original);

// Säker åtkomst till nästlade egenskaper
const userName = DataUtils.get(user, 'details.profile.name', 'Anonym');

// Debounce-funktion
const debouncedSearch = DataUtils.debounce((searchTerm) => {
  // Utför sökning
  console.log('Söker efter:', searchTerm);
}, 500);

// Anropa när användaren skriver
inputElement.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Throttle-funktion
const throttledScroll = DataUtils.throttle(() => {
  // Hantera scroll-event
  console.log('Scrolling');
}, 200);

// Anropa på scroll
window.addEventListener('scroll', throttledScroll);
```

### Logger

Strukturerad loggning med olika nivåer.

```javascript
// Ange loggnivå (DEBUG, INFO, WARN, ERROR)
Logger.setLevel('DEBUG');
// eller
Logger.setLevel(Logger.levels.DEBUG);

// Logga meddelanden
Logger.debug('Initialiserar applikation');
Logger.info('Användare inloggad', { userId: 123 });
Logger.warn('API-svarstid över tröskelvärde', { responseTime: 1500 });
Logger.error('Kunde inte hämta data', { error: 'Timeout' });
```

### NodeUtils

Node.js-specifika hjälpfunktioner.

```javascript
// Ladda miljövariabler från .env (kräver dotenv-paket)
NodeUtils.loadEnv();

// Läs en fil
try {
  const content = await NodeUtils.readFile('config.json');
  const config = JSON.parse(content);
  console.log(config);
} catch (error) {
  console.error('Kunde inte läsa filen:', error);
}

// Skriv till en fil
try {
  const data = JSON.stringify({ setting: 'value' }, null, 2);
  await NodeUtils.writeFile('config.json', data);
  console.log('Filen sparad');
} catch (error) {
  console.error('Kunde inte skriva till filen:', error);
}
```

## Bidra

Bidrag är välkomna! Skapa en issue eller skicka en pull request för att föreslå ändringar eller tillägg.

## Licens

Detta projekt är licensierat under [MIT License](LICENSE).