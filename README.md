# Game Server
This is a web application project intended for future online game service.

## About
This is an online game application service in progress, built with nodejs. Currrently as a course work for [Dynamic Web Development](https://github.com/itp-dwd/2020-spring).

## Setup

### Prerequisites

1. A text editor - preferably [VS Code](https://code.visualstudio.com/)
2. [npm](https://www.npmjs.com)
3. [Node.js](https://nodejs.org/en/)

### Installation

For this particular project, there are no specific installation requirements, however you might look at some open source projects for inspiration about how to write good installation notes. You can see one example in this [Installing Node.js Guide](../guides/installing-nodejs.md).

### Deployment

- [Online Simple Chatroom](http://www.jonysandyk.com:8883/chatroom/)

## Built with

* [VS Code](https://code.visualstudio.com/)
* [Github](https://github.com)
* [npm](https://www.npmjs.com)
* [Node.js](https://nodejs.org/en/)

## Authors

* [Yongkun Li](http://www.jonysandyk.com)

## Acknowledgements

* [MDN Web docs](https://developer.mozilla.org/en-US/docs/Web) for web development documentation

# Notes & Process

## Process & Documentation

### Chat Room
- Mar 2 2020
The first application is a simple online chatroom built with express. People can type their words in the box and share them to public.

- Mar 5 2020
Chat history now storing using NeDB, making it easier to insert, sort and organizing data.

- Mar 22 2020
ChatRoom with brand new interface. Backend with support of MySQL.

### Game data storage
This project also serves as the backend server of another game made by Unity. Check it out here:
https://github.com/Jonysand/CodeLab1-yl7113-HW5

## Challenges & Struggles
- JSON file read/write
Most of the JSON file reading/writing function are async, which may cause little issues with requesting timing. As in my chatroom application the script need to write a JSON file stroing chat history and read it to render the page. Currently I use delay to prevent conflict, which is not a proper solution.
