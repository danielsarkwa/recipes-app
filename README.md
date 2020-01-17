# recipes-app
This app is focused on the architecture of angular using ng-rx and the user flow and not the ui design.

# Current scope of the appllication
 - Component interaction
 - Template manipulation
 - Custom Directives
 - Service and Dependency injection
 - Routing
 - Observable
 - Forms maniputation
    - Template Driven forms
    - Reactive forms
 - Http Request Handling
 - Saving recipes to database (firebase)
 - User authentication
 - Protecting routes with Guards
 - Dynamic component
 - Modulization of features
 - Building dynamic components
 - Deploying the app to a server
 - Using NgRx (check "using-ngrx")
 - Using Angular-Universal

# Ongoing upgrades
 - Saving data to the firebase(shopping list)

## Run app
 - clone the app
 - cd into "app dir"
 - run "npm install"
 - run "npm start" and wait for the cli to open your default browser on localhost:5000
 - to use authentication (if new to firebase, else continue below)
    #### Sign up firebase
     - [sign up to firebase](https://firebase.google.com/)
     - after sign up, go to console
     - add a new project

    #### Set up runtime datebase
     - in the console, click on runtime database as the database
     - on the navbar, click on rules and add "auth != null" property to the read and write keys of the rule object and publish the changes.

    #### Set up authentication the project
     - on the sidebar, click on on "authentication"
     - enable method for authentication.(recommend using email and pasword)
     - make using it is set to on user on email and pasword.(can ignore since it is default)
    
    #### copy your [API KEY]
     - On the sidebar, click on "settings icon"
     - On the popup, select "prpject settings", will see the web API kEY below the first card

  - Adding API KEY to connect to datbase
     - In the "src/environments/environtment.ts" and "src/environments/environtment.prod.ts", replace "[API_KEY]" with your API KEY from firebase.

  - Adding database user to connect to datbase and save
     - In the "src/recipes/store.recipes.effect.ts", replace "PROJECT URL" with your database url from firebase.(remember to keep the /reciepes.json, this is the file firebase writes to)
