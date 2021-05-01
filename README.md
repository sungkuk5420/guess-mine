# guess-mine
Realtime Drawing Game built with SocketIO, Gulp and NodeJS

## How to run
### 1. Install node modules
```
  yarn 
  or
  npm ci
  or
  npm install
```
### 2. Install ejs
```
npm install ejs
```

### 3. Install gulp
```
  npm install --save gulp
  npm install --save gulp-sass
  npm install --save node-sass
  npm install --save gulp-autoprefixer
  npm install --save gulp-csso
  npm install --save gulp-browserify
```
### 4. Install babel node
```
  npm install --save @babel/node
  npm install --save @babel/core
  npm install --save @babel/preset-env
  npm install --save @babel/preset-es2015 -D
```
### 5. Run gulp and node server
```
  yarn dev:assets
  yarn dev:server

  or

  npm run dev:assets
  npm run dev:server
```

## ejs
```
npm install ejs
```

## nodemon
```
npm install nodemon
```

##express
```
npm install express
```

##socket.io
```
npm install socket.io
```

##babel
```
npm install @babel/node
npm install @babel/core
npm install @babel/preset-env
npm install @babel/preset-es2015 -D
```

##pug
```
npm install pug
```

##eslint
```
npm install eslint
```

##eslint
```
npm install eslint-config-prettier -D
npm install eslint-plugin-prettier -D
npm install prettier -D
```

##Install vscode extenstion ESLint

##How to kill nodeJS server
```
netstat -ano | find "LISTENING" | find "Port Number"
taskkill /pid *****
```

##morgan
```
npm install morgan
```

##gulp
```
npm install gulp
npm install gulp-sass
npm install node-sass
npm install gulp-autoprefixer
npm install gulp-csso
npm install gulp-browserify
```

##del
```
npm install del
```

##babelify
```
npm install babelify
```

### heroku
```
heroku login
heroku config:set NPM_CONFIG_PRODUCTION=false -a guess-mine
heroku features:enable http-session-affinity -a guess-mine
```