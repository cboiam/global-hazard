# Global Hazards

This is an application to show the incidents happening in the world in a user-friendly interface. 

It uses the data from Nasa EONET API together with NASA GIBS service to get all the incidents and show you the possible map visualizations with the location of each event. 

You can play around with the filters and charts to update the map and find an interesting incident 

Access the app through the [link](https://global-hazard.onrender.com/).

Or get your hands dirty on the [api](https://global-hazard-api.onrender.com/).

**NOTE**: As I'm using a free host the api can be asleep, which can lead to errors.

---

### Running the app:

You can either run it on docker or using node

#### Node

The version used for development in this project was the node v22.17.0

First you need to start the backend (make sure to setup your OpenAI Api Key on the environment variables)
```sh
global-hazard/backend: $ npm install
global-hazard/backend: $ npx tsc
global-hazard/backend: $ export PORT=5000
global-hazard/backend: $ export OPENAI_API_KEY={OpenAIKey}
global-hazard/backend: $ node dist/app.js
```

Then the frontend
```sh
global-hazard/frontend: $ npm install
global-hazard/frontend: $ cat "REACT_APP_API=http://localhost:5000" > .env
global-hazard/frontend: $ npm start
```

#### Docker

Simply run the following commands (make sure to setup your OpenAI Api Key on the environment variables)
```sh
global-hazard: $ export OPENAI_API_KEY={OpenAIKey}
global-hazard: $ sudo docker compose up
```

---

You can now access http://localhost:3000 to see the app running

![](https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bm9xZzV6cWtta2Fqdnh6dmdocHh2dHQwbHF0a2Noc283M255bmp3NSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/KYElw07kzDspaBOwf9/giphy.gif)
