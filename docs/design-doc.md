# TinyURL Frontend Design Doc

## What are we building?

A page that lets a user enter a long URL and get back a fake short URL. This is only a frontend prototype, so it does not save links on a real server yet.

## User flow

1. The user enters a long URL into the input box.
2. The user clicks the Shorten button.
3. The app checks if the URL is valid.
4. If the URL is valid, the app creates a fake short code.
5. The app displays the fake short URL and adds it to the history list.

## Data we need

One shortened URL record should contain:

- shortCode
- longUrl
- createdAt

## Functions we probably need

- validate URL: checks if the user entered a real URL
- generate short code: creates a random fake short code
- render result: shows the newest short URL
- render history: shows all generated URLs

## Error cases

- The user submits an empty input.
- The user types something that is not a valid URL.
- Two short codes could accidentally be the same.
- The user refreshes the page and loses the history unless localStorage is added.

## Not building yet

- No backend.
- No database.
- No real redirecting.
- No user accounts.
- No analytics.