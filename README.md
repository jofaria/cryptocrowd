# Crypto Crowd

Welcome to CryptoCrowd, a platform that gathers cryptocurrency events.

Visit the website 👉 https://cryptocrowd.herokuapp.com
<br>


## Introduction

This is a pair programming project built in one week after learning backend technologies. The platform was born of our shared interest in cryptocurrencies and the desire to gather a community of cryptocurrency fans.


## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Handlebars
- Bootstrap
- CSS3

## User Stories

### ALL USERS
- **404** - As a user I want to see a 404 page when I go to a page that doesn’t exist so I know I am not to blame.
- **500** - As a user I want to see an error page when the amazing dev team made a mistake so that I know I am not to blame.
- **homepage** - As a user I want to be able to see a list of crypto-related events, search by name, coin, and location without being logged in.
- **event details** - As a user I want to be able to access a separate page with more details about an event.
- **sign up** - As a user I want to sign up on the web page so that I can interact with events.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **profile page** - As a user I want to be able to see the events I am organizing and/or attending.
- **logout** - As a user I want to be able to log out from the web page.

### EVENT ORGANIZER
- **create events** - As a user, I want to be able to create/add an event that I am organizing.
- **edit event** - As a user, I want to be able to edit an event that I created.
- **delete event** - As a user, I want to be able to delete an event that I created.
- **profile page** - As a user I want to be able to see the events I am organizing and/or attending.


<br>

## Server Routes (Back-end):

| **Method** | **Route**           | **Description**                                              | Request - Body                                           |
| ---------- | ------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                 | Main page route. Renders home `index` view. Includes filter features. |                                                          |
| `GET`      | `/login`            | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`            | Sends Login form data to the server.                         | { email, password }                                      |
| `GET`      | `/signup`           | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`           | Sends Sign Up info to the server and creates user in the DB. | { email, password }                                      |
| `GET`      | `/details/:eventId` | Sends user to a detail page of the event.                    | { eventId }                                              |
| `POST`     | `/details/:eventId` | RSVP and/or save an event.                                   | { attending: true, saved: true }                         |
| `GET`      | `/:userId-list`     | Private page. Renders a list of RSVPd and saved events       |                                                          |
| `PUT`      | `/:userId-list`     | Updates the state of saved or RSVPd                          |                                                          |
| `GET`      | `/create-event`     | Renders the form view to create an event.                    |                                                          |
| `POST`     | `/create-event`     | Creating and adding a new event to the database.             | { title, coin, location, date, description, [imageUrl] } |
| `PUT`      | `/edit/:eventId`    | Edit an existing event only if you are the event organizer   | { title, coin, location, date, description, [imageUrl] } |
| `DELETE`   | `/delete/:eventId`  | Delete an existing event only for the event organizer        |                                                          |


<br>

## Models

User model

```javascript
{
  username: String,
  email: String,
  password: String,
  saved: [eventId],
  attending: [eventId],
  event-created: [eventId]
  profile-img: { type: String, default: "url"}
}

```



Event model

```javascript
{
  title: String,
  coin: [ String ],
  date: Date,
  location: [ String ],
  description: String,
  attendees: [ mongoose.Schema.Types.ObjectId, ref: "User"],
  img: { String, default: url }  
}

```

<br>

## Future Work

- Create functionality to edit user profile
- Display a map with the location of the events
- Display a list of all event attendees
- Add a Twitter API to follow tweets for the current event

<br>

## Contributors

Joana Faria - [GitHub](https://github.com/jofaria) - [Linkedin](https://www.linkedin.com/in/joanaadaodefaria/)

Sillas Poulsen - [GitHub](https://github.com/SillasPoulsen) - [Linkedin](https://www.linkedin.com/in/sillaspoulsen/)

