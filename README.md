## Admin Page for Busking Website

## Introduction
This is a webpage for myself to manage my busking sessions as efficiently as possible, mostly to handle song requests and collect data on songs.

A straightforward user interface is needed for myself to spend less time fiddling with the application, and more time singing and engaging with the audience.
However, some intuition of the UI may be sacrificed for my personal preferences and tastes as this website is made purely for myself, and the main aim is to be as efficient and functional as possible.

The application is designed to be fast in order to read requests in real time, and be able to perform required operations with as little interaction with my phone as possible.

There are existing apps on App Marketplaces that perform similar functions to a songbook. However, they pose significant problems:

1. None of them act as a song request management platform, and I do not want to mess around with multiple apps when an audience is waiting for me to perform the next song.
2. Most apps do not have my desired functionality, and those that do have an undesirable user interface.
3. The small number of apps that seem to meet my requirement are paid or contain advertisements.
4. Many apps are meant for use on tablets, but as a student I cannot afford a tablet solely for busking. My application is intended to be used on my phone.

## Project Description

- Frontend: NextJS with Typescript

- Database: Google Firebase

- CSS: Material-Tailwind

Deployed on Vercel.

## Existing Features

1. A simple authentication with Firebase Authentication which only allows valid emails to enter the page.
2. Read song requests in real time sent in through the audience-facing web application, and delete them once I have finished performing the request.
3. Toggle my busking status to prevent spamming of requests when I am not busking.
4. Create and edit entries in my songbook to know which capo position and key I should be singing in, and whether or not I have learned the song.
5. View my songbook.
