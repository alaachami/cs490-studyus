# StudyUs

Visit the website [Here](https://studyus.herokuapp.com)

StudyUs is an app designed for students and instructors. It allows its users to create or join groups with specified information, such as school, course, book, and other descriptions. Users can start video calls and chat once they are in a group.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User authentication: Users can use their email address to register and to login. Users would need a school email to register on StudyUs.
- Group creation: Users can create new groups by entering information about the group they want to create and others to find, such as the school, subject, ISBN of the book, course, and other characteristics.
- Group joining: Users can join groups by looking for them by school, topic, or ISBN or any other specification.
- Group chat: Using the group chat feature, users can have real-time conversations with other group members.
- Group video call: Using the video call feature, users can initiate a video call for other group members to join. Video call features include screen sharing functionalities.

## Installation

To run the StudyUs development enviroment, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using 
`cd studyus-api` then
`npm install`
4. Create Database: `cd studyus-api` then run the command `psql -U postgres -p 5432 -f studyus.sql`
3. Start the app using
`cd studyus-api` then
`npm start`

## Usage

To use StudyUs, follow these steps:

1. Log in or create an account using your school email address.
2. Create a new group or search for existing groups to join.
3. Use the chat or video call features to communicate with your group members.

## Testing

Refer to readme file in test directory for more information on how to run tests. 
Note: run command `npm install -g jest` before running any tests.

## Contributing

Contributions to StudyUs are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch with your changes.
3. Submit a pull request with your changes.
