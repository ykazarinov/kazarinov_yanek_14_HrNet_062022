# Wealth Health

Cette société utilise une application web interne, appelée HRnet, qui gère les dossiers des employés.

## Prerequisites

-   NodeJS Version 10.19
-   npm Version 8.14
-   Visual Studio Code or another IDE

## Dependencies

-   React Version 17.0.2
-   React-router-dom Version 6.3.0
-   redux Version 4.2.0
-   @reduxjs/toolkit Version1.8.2

## Installation

### Backend API

-   Clone the Backend API on your computer: git clone https://github.com/ykazarinov/hrnetserver.git
-   Install the dependencies: npm install


### Frontend APP

-   Clone the FrontEnd App on your computer: git clone https://github.com/ykazarinov/kazarinov_yanek_14_HrNet_062022.git
-   Install the dependencies with: npm install

## Usage (in ascending order)

### 1 Backend API

-   Run the Backend Api, which will then listen on port 4000 by default : npm run start:dev
-   In the terminal window, you will see the message: Server OK DB ok

### 2 Frontend APP

-   Go to folder "HRNETNEW" by command cd HRNETNEW

You can run the development version:
-   Run the application locally, which will then listen on port 3000 by default: npm run start

You can also run the production version:
-   Create production version: npm run build
-   Install launch add-on: npm install -g serve
-   Run production version: serve -s build
-   If the terminal window, you will see the message : ? something is already running on port 3000. Would you like to run the app on another port instead >> (Y/n)
-   Choice and type Y
-   The App runs on http://localhost:XXXXXX/ (XXXXXXX - port number chosen at random)

## Author information

Kazarinov Yanek aka Artfish (https://artfish.pro)

-   Study at OpenClassrooms)
