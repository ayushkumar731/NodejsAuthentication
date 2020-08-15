# NODE JS AUTHENTICATION

Node js authentication is an website where user can sign up and sign and after the authenticate he/she can show you name and email id and user can also singin/signup using google.

---

## Table of contents

- [Features](#Features)
- [Technology](#Technology-Used)
- [Demo](#Demo)
- [Folder Structure](#Folder-Structure)
- [Quick Start](#Quick-Start)

---

# Features

- Sing Up with email
- Sign Up with Google
- Update Password
- Encrypt Password In Database

---

## Technology Used

| Technology            | Version |
| --------------------- | ------- |
| express               | 4.17.1  |
| express-ejs-layouts   | 2.5.0   |
| express-session       | 1.17.1  |
| ejs                   | 3.1.3   |
| bcrypt                | 5.0.0   |
| connect-flash         | 0.1.1   |
| connect-mongo         | 3.2.0   |
| cookie-parser         | 1.4.5   |
| crypto                | 1.0.1   |
| mongoose              | 5.9.28  |
| node-sass-middleware  | 0.11.0  |
| passport              | 0.4.1   |
| passport-google-oauth | 2.0.0   |
| passport-local        | 1.0.0   |
| validator             | 13.1.1  |

---

## Demo

![demo](./assets/gif/demo.gif)

---

## Folder Structure

```
├── assets
│   ├── css
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── layout.css
│   │   ├── profile.css
│   │   └── sign.css
│   ├── gif
│   │   └── demo.gif
│   ├── images
│   │   ├── back.jpg
│   │   ├── logo1.png
│   │   └── logo.png
│   └── scss
│       ├── header.scss
│       ├── home.scss
│       ├── layout.scss
│       ├── profile.scss
│       └── sign.scss
├── config
│   ├── middleware.js
│   ├── mongoose.js
│   ├── passport-google-oauth2-strategy.js
│   └── passport-local-strategy.js
├── controllers
│   ├── home_controller.js
│   └── users_controllers.js
├── index.js
├── models
│   └── user.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   ├── index.js
│   └── user.js
└── views
    ├── _header.ejs
    ├── home.ejs
    ├── layout.ejs
    ├── profile.ejs
    ├── signIn.ejs
    └── signUp.ejs
```

---

# Quick Start

## How to download the file if you are new in git ?

> If you're new to GitHub and just want to download the complete package, hit the green button saying "Clone or download", choose the "Download ZIP" option, and you're good to go.

## If you know the git.

> Clone git with the below command

```bash
git clone https://github.com/ayushkumar731/Habbit_tracker_app.git
```

> Install dependencies to start the project.

```
npm install
```

> Run MongoDb Server Locally by using connection string

```
mongodb://localhost/nodeJsAuth
```

> Start project by using command below

```
npm start
```

> To run in the browser

```
localhost
```

