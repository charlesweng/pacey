# Pacey
The Pacemaker Translator Companion!

## Table of Contents
- [Installation](#installation)
- [Description](#description)
- [Structure](#Structuret)
- [Installation-and-Running](#installation-and-running)
- [Troubleshooting](#troubleshooting)
- [Contact](#contact)

## Description
This is an app made for the MSWE Fall 2024 Hackathon! This is Pacey, our app intended to help Doctors with pacemaker medical documents.
- Pacemaker printouts are cluttered with data
- Different scanning devices produce printouts in different formats
- This makes determining whether or not a patient requires surgery an unnecessarily long process

This app aims at supplying a tool for the doctors to scan documents and supply them with relevant information such as procedure suggestions.

### Features
Our application aims to solve this issue. All the doctor needs to do is open our application, scan or take a picture of a report, and the application will extract the information, analyze it, and determine whether or not the patient needs surgery. 
- As of right now scans for pacemaker manufacturer, impedance, install date and battery info from medical documents
- Scan is intended to be from mobile devices but we built it in web app
- From the data scanned and parsed we intend display the relevant info to mobile phone users

## Structure
- Docker based app using multiple containers for front end, back end and database (db). `compose.yaml` contains all relevant info for building all containers.
- Node.js (javascript) for runtime environment 
- React for creation of frontend and UI
- Express web framework for Node.js and API calls
- Mysql for database creation and management
- Briefly used Miro for brainstorming of database design
- Python to read text from image and to convert .Pdf to .Png

## Installation-and-Running
Provide step-by-step instructions to install and run your project locally.
```bash
git clone https://github.com/charlesweng/pacey.git
cd yourproject
docker-compose up
```
Running `docker-compose up` will start running the app. This can be performed in any terminal but we preferred using Git Bash

## Troubleshooting
If you run into an error with unix formatting, 
`/usr/bin/env: ‘bash\r’: No such file or directory`
try running this in terminal:
```bash
dos2unix entrypoint.sh
```

Sometimes installs may be needed to remove caches, try running this:
```bash
docker-compose build --no-cache
```

Or for specific modules:
```bash
docker-compose build frontend
docker-compose build backend
docker-compose build db
```
Can also add keywords `frontend`, `backend` or `db` to the no-cache called above as well for specific rebuilds


## Contact
Our team and roles!
Flex roles:
- Charles Weng
Backend:
- Hank Chang
- Matthew Sah
Frontend:
- Jason Yim
Database and Data Analysis:
- Dylan Loe
- Ryan Soo
- Xin Tang

