# Codebuddy React Interview Assignment

This repository contains the assignment for the Codebuddy React Interview. The assignment consists of two projects: Deployed in the [main](<https://github.com/RitikJ22/codebuddy-multistep-form/>).  and [Seat_Booking](<https://github.com/RitikJ22/codebuddy-multistep-form/tree/Seat_Booking/>). branch .

## Project 2: Movie-seat Booking

The `Seat_Booking` branch hosts the Second project which is a  Movie-seat Booking. [live link](<https://codebuddy-multistep-form-git-seatbooking-ritikj22s-projects.vercel.app//>).

### Project Overview


# Problem Statement

## Part 1

---

Create an UI to show the seats available for booking in a movie theater. The movie theater can have N number of rows and each row can seats matching it's row number.

For example, if the movie theater has 3 rows, the first row or row 1 has 1 seat, the second row or row 2 has 2 seats and the third row or row 3 has 3 seats.

Similary Nth row will have N number of seats.

All the prime numbered seats are reserved for the movie theater.

You can fetch the seats using the api GET `https://codebuddy.review/seats?count=3`, which will return the list of seats available for booking. You can pass the number of rows as url query params using the key `count`.

Create a HTML Input element to accept the number of rows and submit button to fetch the seats.

The maximum number of rows will be 10 and mimimum number of rows will be 3.

On change of number of rows, render the seats row wise. The reserved seats should be marked as disabled. Upon selection of seats by the user, the selected seats should be marked as selected.

Submit the selected seats to the server, using the api POST `https://codebuddy.review/submit`. You should submit the array of seat id's selected by the user.

User should select a minimum of 1 seat and maximum of 5 seats.

Render the rows and seats in an inverted pyramid shape.

Each seat should show the following details:

- Seat number
- Seat reservation status
- Seat Row number

## Part 2

---

Calculate the total cost of the seats selected by the user.The cost of the movie ticket is $20. The cost of a single seat is calculated based on the seat row number.

Cost of a seat is $10 multiplied by the seat row number.

So if the user selects the seat row number 3, the cost of the seat is $30. (3 \* 10). So the total cost of the seats selected by the user is $30 + $20 = $50.

Display the total cost of the seats selected by the user.

