# Crypto Crowd

<br>

## Description

CryptoCrowd - A platform for cryptocurrency events.

<br>

## User Stories

- **ALL USERS**
- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access a list of crypto-related events, filter them by type and location, log in and sign up.
- **event details** - As a user I want to be able to access a separate page with more details about an event.
- **sign up** - As a user I want to sign up on the web page so that I can RSVP events.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **EVENT ORGANIZER**
- **create events** - As a user, I want to be able to create/add an event that I am organizing.
- **edit event** - As a user, I want to be able to edit an event I created.
- **twitter feed** - As a user, I want to be able to follow news and updates about a specific event
- **MSP** ( nice to have but not essential )
- **location** - As a user, I want to see a map with the location of the event.
- **event creation** - As a user I want to login through google or another certified account. more details of the restaurant, be able to call them and visit their website and save it as favorites.
- **edit user** - As a user I want to be able to create and edit my profile.
- **See all attendees**: As a user, I want to be able to see a list of all the people attending an event.

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
| `POST`     | `/create-event`     | Creating and adding a new event to the database.             | { email, password, [firstName], [lastName], [imageUrl] } |
| `PUT`      | `/edit/:eventId`    | Edit an existing event only if you are the event organizer   |                                                          |
| `DELETE`   | `/delete/:eventId`  | Delete an existing event (only for the event organizer)      |                                                          |



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

## Backlog

[See the Trello board.](https://trello.com/b/Ni3giVKf/ironhackproject)

<br>

## Links

### Git

The url to your repository and to your deployed project

https://github.com/SillasPoulsen/cryptocrowd

[Deploy Link]()

<br>

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1P5FIi0vHZBUcgUtmt1M4_lLCO5dwdJ4UOgtJa4ehGfk/edit?usp=sharing)

### Contributors

Sillas Poulsen - [GitHubUsername](https://github.com/username) - [LinkedinLink](https://www.linkedin.com/in/username)
Joana Faria - [GitHubUsername](https://github.com/username) - [LinkedinLink]
