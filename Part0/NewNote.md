```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User insert new note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server ask the browser to do a new HTTP GET to the address /exampleapp/notes
    server-->>browser: HTTP status code 302
    deactivate server

    Note right of browser: The browser reload the notes page
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{content: "gino", date: "2024-01-11T09:13:14.451Z"}]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
:::
