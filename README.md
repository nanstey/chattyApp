Chatty App
=====================

A websocket-based realtime chatroom. The front-end uses React and is served by Webpack. The back-end uses Express and WS to make connections with clients.

The app features realtime text communication between connected clients, a display of connected clients and their individually defined usernames, and image URL to <img> tag conversion.

### Usage

Clone the project and create your own git repo.

```
git clone git@github.com:nanstey/chattyapp.git
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server in root, and in a separate terminal start the server in chatty_server directory.

```
npm install
npm start
open http://localhost:4000

// new terminal
cd chatty_server
npm start
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:4000/build/my_image.png`.

### Linting

This project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
