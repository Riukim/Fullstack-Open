mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User insert new note
    Note over browser: The browser sends the new note as JSON data <br/> containing the content and the timestamp of the note
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note over server: The server parses the new note data, and adds it 
    server-->>browser: HTTP status code 201 Created
    Note left of server: The server does not ask for a redirect, the browser stays on the same page
    deactivate server
:::
