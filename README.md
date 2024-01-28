# Flashcards
I have developed Flashcards website using mysql,nodejs,reactjs and expressjs.
i have provided all the packages in package.json
{ these dependencies provides information what to install for front end;
"dependencies": {
        "@testing-library/jest-dom": "^5.16.5",
        "@testing-library/react": "^13.4.0",
        "@testing-library/user-event": "^13.5.0",
        "axios": "^1.3.6",
        "bootstrap": "^5.2.3",
        "json-server": "^0.17.3",
        "react": "^18.2.0",
        "react-bootstrap": "^2.7.4",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.43.9",
        "react-icons": "^4.8.0",
        "react-router-dom": "^6.10.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4"
      }
 } 
 
 similarly for backend
 {
 these packages were  required to run backend;
 "dependencies": {
    "axios": "^1.3.6",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "multer": "^1.4.5-lts.1",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.22",
    "path": "^0.12.7"
  }
 }
 set up backend mysql with schema and tables as in code then,
 
 1.Use 'npm start' command to run front end and nodemon server.js for backend;
 2.After running these commands you were directed to Home page (only image in Home);
 3.Use navbar to see flash cards by clicking 'Widgets' ;
 4.If you want to add card use 'addcard' button -> it will direct you to form to enter the input ;
 5.The input data that you provided will be pushed into mysql and once you entered Add button You again navigated to flashcards page and you can see inputed card rendered their;
 6.If you typed cancel button you redirected to 'Home'
 &.In my sql i have provided table with name falshcardstable under the schema of flashcardschema and its columns were questions and answers;
 NOTE:NO images will be fetched from backend ,eventhough i provide 'choose file' option and pushing into backend i am not completed to fetch it and render it ;
