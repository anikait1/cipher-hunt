# Cipher Hunt
Begin the hunt of cracking the ciphers. Post text and let others guess it. Characters(only english alphabets are supported as of now) of the text are randomly interchanged, users are provided with hints(character mapping for top 3 frequent characters) and they can make their guess based on it.

## Getting Started
It is assumed you have node and npm installed on your machine. For instructions on installing node, visit [here](https://nodejs.org/en/download/).
```bash
cd cipher-hunt
npm install
npm run dev
```

## Project Structure
Traditional web apps are organized in MVC pattern, while the project is based on the same pattern, the directory structure is little different.
```
  ├── resources                                     # Each entity is modeled as a resource
  │   ├── <resource name>                           # Resources have following files associated with them
  │       ├── <resource name>.model.js              # Model
  │       ├── <resource name>.controller.js         # Controller (CRUD operations and middleware)
  |       ├── <resource name>.route.js              # Routes and middleware configuration
  ├── utils                                         # Handful utils such as auth and textEncryption
  |   ├── auth.js                                   # Authentication related middleware and operations
  |   ├── textEncryption.js                         # Character shuffling and hints mapping
  ├── index.js                                      # Starting point of the app
```

## API Endpoints
```
  GET, POST     /ciphers
  GET           /ciphers/:id
  
  GET, POST     /ciphers/:id/guess
  PATCH         /ciphers/:id/guess/:guessId
  
  POST          /user/sign-up
  POST          /user/sign-in
  GET           /user/:id/ciphers
  GET           /user/me
```
