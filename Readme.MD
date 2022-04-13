# Authentication and Authorization Service

<!-- ![Project Image](project-image-url) -->

> This is backend service to authenticate and authorize users.

---

### Table of Contents

-   [Authentication and Authorization Service](#authentication-and-authorization-service)
    -   [Table of Contents](#table-of-contents)
    -   [Description](#description)
        -   [Available Features](#available-features)
        -   [Technologies](#technologies)
        -   [Message from the author](#message-from-the-author)
        -   [Leftouts](#leftouts)
        -   [Something I have learned](#something-i-have-learned)
    -   [Getting Started](#getting-started)
        -   [Setting Keys](#setting-keys)
        -   [Installation](#installation)
            -   [API Reference](#api-reference)
    -   [Author Info](#author-info)

## Description

#### Available Features

-   Authenticate and Login users.
-   Validating whether a logged in user has permission to do a specific action.
-   Log users out of the system.

#### Technologies

-   Node.js
-   Express

[Back To The Top](#read-me-template)

---

### Message from the author

> I really enjoyed myself when I was creating this project. It did reinforce a lot fo the concepts I had and made me think about deeply about several security issues and attempt to solve them.

### Leftouts

I did my best to include everything you asked for. But due to the time constraint I did not have enough time to write tests.

### Something I have learned

This part right here. Writing a good Read.me file as well as documentation.

## Getting Started

### Setting Keys

-   You need to set the following keys in a `.env` file
    | Key | Value |
    | -------------------- | --------------------------------------------------------------------------------------- |
    | PORT | 5000 |
    | ACCESS_TOKEN_SECRET | Can be set to any string of your choice |
    | REFRESH_TOKEN_SECRET | Can be set to any string of your choice |
    | MONGO_URL | I will send to you by email (please send to alysadekk@gmail.com if you can not find it) |

### Installation

Download this [repo](https://github.com/alisadek/auth-service.git) or clone it to your local machine

Run the following commands:

`npm install`

`npm start`

###

#### API Reference

Kindly view the [Postman documentation](https://documenter.getpostman.com/view/11243400/UVz1Pson) for more details about the APIs and how to use them.

[Back To The Top](#read-me-template)

---

## Author Info

-   Linkedin - [Ali Sadek](https://linkedin.com/in/alisadekk)

[Back To The Top](#read-me-template)
