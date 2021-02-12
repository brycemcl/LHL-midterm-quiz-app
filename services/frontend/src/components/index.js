const arrayOfPromises = [];
arrayOfPromises.push(import('./app-logo.js').then(c => c.default()));
arrayOfPromises.push(import('./nav-bar').then(c => c.default()));
arrayOfPromises.push(import('./nav-button').then(c => c.default()));
arrayOfPromises.push(import('./page-home.js').then(c => c.default()));
arrayOfPromises.push(import('./inside-of-shell.js').then(c => c.default()));
arrayOfPromises.push(import('./quiz-list.js').then(c => c.default()));
arrayOfPromises.push(import('./quiz-card.js').then(c => c.default()));
arrayOfPromises.push(import('./score-page.js').then(c => c.default()));
// arrayOfPromises.push(import('./score-page.js').then(c => c.default()));
// arrayOfPromises.push(import('./submit-button.js').then(c => c.default()));
// arrayOfPromises.push(import('./quiz-question').then(c => c.default()));
// arrayOfPromises.push(import('./question-title').then(c => c.default()));

Promise.all(arrayOfPromises).then(() => { import('./app-shell.js').then(c => c.default()); });