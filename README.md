# CS394 Green - StayFresh

# About The Project

![PROJECT_LOGO](./src/assets/logo/logo.jpg)

github repo name: 394-w24 / GroceryHelper
The project is created by team Green in CS394 course taught by Professor Riesbeck in winter 2024, in collaboration with Northwestern Master of Product Design and Development Management MPD program. The webapp "StayFresh" aims to reduce food waste by optimizing how we track and manage our grocery items and promote sustainable practices.

## Built With:

- [![React][React.js]][React-url]

## Features:

User can manage their grocery inventory through image capture (of their grocery item) or manual input, with options to edit expiry dates when necessary.
The app sends customizable reminders with tailored recipe suggestions via email for items nearing their expiry.

# Getting Started

## Prerequisites

```
    node version >= 16
    cargo version >= 1.76.0
```

## Installation

```shell
    git clone https://github.com/394-w24/GroceryHelper.git
    cd GroceryHelper
    npm install
```

Data Source: https://www.foodsafety.gov/
Raw Json File: https://www.foodsafety.gov/sites/default/files/foodkeeper_data_url_en.json

- Also located in src/assets/category.json, src/assets/data.json
  Our expiry products data is sourced from: https://www.foodsafety.gov/https://www.foodsafety.gov/keep-food-safe/foodkeeper-app
  Technical Dependencies:
- To ensure full functionality of the StayFresh app's image recognition feature, it's important to note that access to the Clarifai API requires a unique key.
  Obtain Your Clarifai API Key by visiting: https://clarifai.com/clarifai/main/models/food-item-recognitionFirebase:

1. visit https://console.firebase.google.com/u/3/
2. Setup Firestore, Authentication, and Hosting

- https://firebase.google.com/docs/firestore
- https://firebase.google.com/docs/auth
- https://firebase.google.com/docs/hosting

3. Update your firebase config in Firebase.js (Should be able the find this in the firebase `project settings` page in `general` tab)

```javaScript
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_API_ID",
        measurementId: "YOUR_MEASUREMENT_ID",
    };
```

Backend:
To enable the email notification feature, you need a server with cargo installed. You also need to enable the SMTP of your mailbox, and enter the SMTP server address, your Email, and password into `email_sender.rs`.

```shell
    cd ./backend
    cargo build
```

# Usage

Start local server:

```
    npm start
```

Access local server:

```
    localhost:5173
```

Deploy:

```
    npm run build
    firebase deploy
```

Test:

- Coverage

```
    npm run coverage
```

- UI

```
    npm run test
```

- Cypress

```
    npm run cy:open
```

- Backend

```
    cargo run
```

# Roadmap

# Project Structure

```
.
├── App.css
├── App.jsx
├── App.test.jsx
├── Components
│   ├── ConfirmModal.jsx
│   ├── DeleteConfimationModal.jsx
│   ├── EditModal.jsx
│   ├── Food.Julia.test.jsx
│   ├── Food.jsx
│   ├── FoodList.jsx
│   ├── FoodRecognition.jsx
│   ├── Footer.jsx
│   ├── GroceryAutocomplete.jsx
│   ├── GroceryForm.jsx
│   ├── ImageDropBox.jsx
│   ├── Kitchen.jsx
│   ├── LoadingContainer.jsx
│   ├── OnboardingPopup.jsx
│   ├── OnboardingPopup.test.jsx
│   └── SwipeOptions.jsx
├── Firebase.js
├── Pages
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── LoginPage.test.jsx
│   ├── LogoutButton.test.jsx
│   ├── Product.jsx
│   └── Profile.jsx
├── Theme.jsx
├── assets
│   ├── category.json
│   ├── data.json
│   ├── imagePlaceholder.webp
│   ├── logo
│   │   └── logo.jpg
│   └── onBoard
│       ├── 1.png
│       ├── 2.png
│       ├── 3.png
│       ├── 4.png
│       ├── 5.png
│       ├── 6.png
│       └── 7.png
├── helper.js
├── index.css
├── index.jsx
└── logo.svg
```

# Contributing

## License

MT License
Copyright (c) 2022 Christopher

## Contact

Professor Christopher Riesbeck: c-riesbeck@northwestern.edu <br/>
CS394 Team Roster:

- Julia Chu
- Annabel Grace Edwards
- Neel Sinan Keswani
- Doohwan Kim
- Xukun Liu
- Chen Si
- Hunter Xia
- Wenxin Zhang

  MPD Team Roster:

- Otto Wei
- Ragni
- Karuna Parthasarathy
- Akshaya Lyengar

# Acknowledgements

W24 CS 394 Team Green

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
