# Codebuddy React Interview Assignment

This repository contains the assignment for the Codebuddy React Interview. The assignment consists of two projects: Deployed in the [main](<https://github.com/RitikJ22/codebuddy-multistep-form/>).  and [Seat_Booking](<https://github.com/RitikJ22/codebuddy-multistep-form/tree/Seat_Booking/>). branch .

## Project 1: Multi-Step Form

The `main` branch hosts the first project which is a Multi-step Form. [live link](<https://codebuddy-multistep-form.vercel.app/>).

### Project Overview

# The Problem Statement

## Part 1

---

### Create multi-step form in React which will contain 3 forms

**Form 1** will take 2 inputs, with the below validations:

- `emailId` - Required. Must be a valid email ID
- `password` - Required. Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.

**Form 2** will take 3 inputs, with the below validations:

- `firstName` - Required. Allow only alphabets. Minimum of 2 character and maximum 50.
- `lastName` - Optional. If not empty, will only allow alphabets
- `address` - Required. Minimum length 10.

**Form 3** will take 3 inputs, with the below validations:

- `countryCode` - Required. Allow only 2 country code, India (+91) and America (+1). Must be a dropdown input
- `phoneNumber` - Required. Allow only 10 digit numeric phone number
- `acceptTermsAndCondition` - Required. Will be a checkbox input and must be selected.

Each form will have 3 button, named below:

- `Back`: Will be disabled for **Form 1**
- `Save`: Will be enabled for all forms`
- `Save and Next`: Will be disabled for **Form 3**

#### Features:

- User can `Save and Next` only if the form valid for each step.
- User can go back to previous screen to change it's values
- User will have the ability to jump back to any form if previously filled using a tabbed navigation
- Show error message to user for failed input validation

At the end of **Form 3**, when the user will click on save all the details needs to submitted through a HTTP POST request to `https://codebuddy.review/submit`

Example request body:

```json
{
  "emailId": "john.doe@gmail.com",
  "password": "QWerty##11",
  "firstName": "John",
  "lastName": "Doe",
  "address": "22/B, Baker Street, London - 10089",
  "countryCode": "+91",
  "phoneNumber": "2225550909"
}
```

> Note: `acceptTermsAndCondition` must not be submitted to API

Upon doing a valid HTTP POST request you will get a response like below.

Sample API response:

```json
{
  "message": "Success",
  "data": {
    "emailId": "john.doe@gmail.com",
    "password": "QWerty##11",
    "firstName": "John",
    "lastName": "Doe",
    "address": "22/B, Baker Street, London - 10089",
    "countryCode": "+91",
    "phoneNumber": "2225550909"
  }
}
```

### Part 2

Upon submitting the form at the end, redirect the user to `/posts` (i.e., http://localhost:3000/posts)

Here you have to display the list of post which we get from the API using HTTP GET request at `https://codebuddy.review/posts`

This API will return a list of posts having the below details

- `id`: Unique id for each post
- `firstName`: First name of the author
- `lastName`: Last name of the author
- `writeup`: Post description / writeup
- `image`: Post image
- `avatar`: Post author image

Display the list of posts which will show the above details.

For Large Screens, show 3 post in an single row

For Medium Screens, show 2 post in an single row

For Small Screens, show 1 post in an single row

