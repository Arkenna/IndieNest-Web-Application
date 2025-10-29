# IndieNest Web Application -- Frontend Technical Stories

## Overview
This document contains Frontend technical stories
intended for frontend developers integrating
with the IndieNest Frontend's API (TypeScript, Angular).

---

### US001 -- User registration
As a visitor, I would like to register on the platform to become a user of the application.

Acceptance criteria:
- Scenario: Successful registration
  - Given that the visitor accesses to the path `/sign-up`
  - When he enters his information, and it is valid, and click the sign-up button
  - Then a new User will be created with fields: `id` `name` `phoneNumber`and a new Account will be created with fields: `userId` `email` `password` `isActive` `role` and both will be added to `IamStore`.

---

### US002 -- User Login
As a user, I would like to log in on the platform to access the marketplace.

Acceptance criteria:
- Scenario: Successful login
  - Given that the user accesses to the path `/log-in`.
  - When he enters his `email` and `password`, and both are valid, and click the login button
  - Then the `IamStore`'s `currentAccount` will be uploaded with user's `account` and he will be redirected to the path `/profile`.

---

### US003 -- Show Marketplace View
As a user, I would like to see all projects when I access to the marketplace of the app to explore the different options.

Acceptance criteria: 
- Scenario: Successful load
  - Given that the user clicks the Home button in the top toolbar.
  - When he is redirected to the path: `/home`
  - Then the Marketplace Context's view: `home-view` will show all projects through the `ProjectStore`.

---

### US004 -- Show Audios View in Marketplace
As a user, I would like to see all audio projects when I access to the audio's section of the marketplace to explore the different options.

Acceptance criteria:
- Scenario: Successful load
  - Given that the user is in the path: `/home`.
  - When he clicks the Audio button. 
  - Then he will be redirected to the path: `/audios` and the Marketplace's Context `audios-view` will load all audios from `ProjectStore`.

---

### US005 -- Show Arts View in Marketplace
As a user, I would like to see all art projects when I access to the art's section of the marketplace to explore the different options.

Acceptance criteria:
- Scenario: Successful load
  - Given that the user is in the path: `/home`.
  - When he clicks the Art button.
  - Then he will be redirected to the path: `/arts` and the Marketplace's Context `arts-view` will load all arts from `ProjectStore`.

---

### US006 -- Show Games View in Marketplace
As a user, I would like to see all game projects when I access to the game's section of the marketplace to explore the different options.

Acceptance criteria:
- Scenario: Successful load
  - Given that the user is in the path: `/home`.
  - When he clicks the Games button.
  - Then he will be redirected to the path: `/games` and the Marketplace's Context `games-view` will load all games from `ProjectStore`.

---

### US007 -- Show Developers View in Marketplace
As a user, I would like to see all developers when I access to the developer's section of the marketplace to explore the different developers.

Acceptance criteria:
- Scenario: Successful load
  - Given that the user is in the path: `/home`.
  - When he clicks the Developers button.
  - Then he will be redirected to the path: `/developers` and the Marketplace's Context `developers-view` will load all developers from `ProfileStore`.

---

### US007 -- Show profile 
As a user, I would like to access to the profile view to see information about my profile.

Acceptance criteria:
- Scenario: Successful profile view load
  - Given that the IAM Context's store `currentAccount` isn't undefined.
  - When the user clicks the Profile button in the top toolbar.
  - Then he will be redirected to the path: `/profile` and the Profile Context's view `profile-view` will show his profile information through the `ProfileStore`.

---

### US008 -- Show Audio Information 
As a user, I would like to access to the audio information by selecting it from the Marketplace to see all it's information.

Acceptance criteria:
- Scenario: Successful audio view load
  - Given that the user is in the path: `/home` or in the path: `/audios`.
  - When the user clicks in an audio
  - Then he will be redirected to the path: `/audio/{id}` with the audio id information and the Project Context `audio-item` will show by the id's info.

---

### US009 -- Show Art Information
As a user, I would like to access to the art information by selecting it from the Marketplace to see all it's information.

Acceptance criteria:
- Scenario: Successful art view load
  - Given that the user is in the path: `/home` or in the path: `/arts`.
  - When the user clicks in an art
  - Then he will be redirected to the path: `/art/{id}` with the art id information and the Project Context `art-item` will show by the id's info.

---

### US010 -- Show Game Information
As a user, I would like to access to the game information by selecting it from the Marketplace to see all it's information.

Acceptance criteria:
- Scenario: Successful game view load
  - Given that the user is in the path: `/home` or in the path: `/games`.
  - When the user clicks in a game
  - Then he will be redirected to the path: `/game/{id}` with the game id information and the Project Context `game-item` will show by the id's info.

---

### US010 -- Show Developer Information
As a user, I would like to access to the developer information by selecting it from the Marketplace to see all it's information.

Acceptance criteria:
- Scenario: Successful developer's profile view load
  - Given that the user is in the path: `/home` or in the path: `/developers`.
  - When the user clicks in a developer
  - Then he will be redirected to the path: `/profile/{id}` with the developer's profile id information and the Profile Context `profile-view` will show by the id's info.

---
