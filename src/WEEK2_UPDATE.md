# Week 2 Update

## What I built

This week I started building the TinyURL frontend prototype. I replaced the old TinyURL coming soon section with a real frontend section where a user can type in a long URL and get a fake shortened URL back.

The page now has a URL input, Shorten button, error message area, result box, copy button, clear history button, and a history list.

## Tools I used

I used HTML for the page structure, CSS for styling, TypeScript for the frontend logic, Git for commits, GitHub for storing the project, and Vercel for deployment.

## TypeScript features

I created a custom `ShortenedUrl` type, used an array to store shortened URL records, wrote an `isValidUrl` function, wrote a `generateShortCode` function, used `.find`, and added event listeners for the buttons.

## What I learned

I learned how TypeScript can make a page respond when a user submits a form or clicks a button. I also learned how to store data in an array, validate user input, generate a fake short code, and render history on the page.

## What I struggled with

The hardest part was understanding how the form connects to TypeScript. I had to learn how to prevent the page from refreshing, read the input value, check if it is valid, and then update the page with the result.

## What I am proud of

I am proud that the TinyURL section actually works now. A user can enter a valid URL, get a fake short URL, copy it, and clear the history.

## Next steps

Next week I want to start adding a backend so the app can work more like a real URL shortener. Right now the data only exists in the browser, so the next step is learning how to connect the frontend to a backend API.