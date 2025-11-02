This diagram shows what happens when a user create a new note on the page

```mermaid
Send note data (HTTP POST)
sequenceDiagram
    actor User
    participant Browser
    participant Server

    User->>Browser: Type a new note and click "Save"
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server-->>Browser: HTML document

    Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: the css file

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: the JavaScript file

    note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: JSON data (list of notes)

    note left of Browser: The browser execute the callback function that render the notes 
