# Airbnb Clone

**[airbnb-clone-4289d.web.app ](https://airbnb-clone-4289d.web.app )**

![Airbnb clone homepage](https://user-images.githubusercontent.com/24460065/216766115-55e022d1-2751-486d-9dd5-241d5059dc62.png)

*Airbnb clone*

A clone of the Airbnb site with limited features. 

The front end is built with React and the database and authentication is handled by Firebase. 


### APIs:

- RESTCountries
- Position Stack
- Mapbox

### Dependencies

- React Router
- react-map-gl
- react-firebase-hooks
- react-date-picker
- react-slick
- react-icons
- date-fns
- uuid

## Features

- Account creation, log-in & sign-up
- Room booking
- Curated stays on home page based on user location
- Search results page with the selected country's availale stays on a map. Each marker is interactive. Clicking on a marker links to the stay's room page

> Only Philippines and Spain have listings!

- Home page stay listings are based on user's location using geolocation
- Disabled dates in date picker based on selected room's current bookings
- Number of guests is limited to selected room's maximum gusest capacity
- Booking is limited to logged-in users

## Todo list

1. Implement stay filtering:
    + In homepage with stay scroller
	+ In the search bar and search result page with the Filter button based on stay's availability and max guest capacity
2. User page where they can view and edit their bookings
3. Implement 'Become a host' functionality where they can create a listing
3. Email and password validation when signing-up
4. Enable Google account and social media sign-up 
5. Send booking confirmation email
6. Error handling when RESTCountries goes down

## Screenshots

![Airbnb clone homepage](https://user-images.githubusercontent.com/24460065/216766115-55e022d1-2751-486d-9dd5-241d5059dc62.png)

*Home page*

![Airbnb clone search results page](https://user-images.githubusercontent.com/24460065/216766442-bd846cb8-d589-4089-98a6-6da776aee4fe.png)

*Search results page*

![Airbnb clone room page](https://user-images.githubusercontent.com/24460065/216766454-e2e6b63d-9cda-4265-908d-25a4f9304cc6.png)

*Room page*

![Airbnb clone room images pop-up gallery](https://user-images.githubusercontent.com/24460065/216766484-51cd4ac1-1da2-49ba-9759-790198759918.png)

*Room images pop-up gallery*

![Airbnb clone currency selector pop-up](https://user-images.githubusercontent.com/24460065/216766499-f37c4e69-e622-4396-88dc-28a5212328f0.png)

*Currency selector pop-up*

![Airbnb clone language selector pop-up](https://user-images.githubusercontent.com/24460065/216766511-9c5534c4-8308-4ec9-8b3e-837e73f6c638.png)

*Language selector pop-up*

![Airbnb clone log-in & sign-up page](https://user-images.githubusercontent.com/24460065/216818105-52d58f80-d652-4ab0-8e6a-814e14fb8fc3.png)

*Log-in & sign-up page*

![Airbnb clone mobile view](https://user-images.githubusercontent.com/24460065/216811829-b797d221-3a7b-46ee-b7be-825161673cdb.png)

*Mobile view*

![Continent and country selector in search bar](https://user-images.githubusercontent.com/24460065/216816245-d76e2eb7-5849-4782-9e11-421063672b9c.png)

*Continent and country selector in search bar*

![Date picker](https://user-images.githubusercontent.com/24460065/216816271-015a212c-f0ae-4a8f-a5e0-2644e47f11f0.png)

*Date picker*

![Guest picker](https://user-images.githubusercontent.com/24460065/216816332-a79f71ed-e14e-4a2c-9de3-eda0f8a70cfa.png)

*Guest picker*

![Detailed view of search result map with a pop-up showing details of cliked marker](https://user-images.githubusercontent.com/24460065/216816657-954226ab-124f-4c8c-8199-121bf6e07bf9.png)

*Detailed view of search result map with a pop-up showing details of cliked marker*


![Booking confirmation pop-up showing booking details](https://user-images.githubusercontent.com/24460065/216818508-96929c02-2426-4c89-ac0d-4f804645dc25.png)

*Booking confirmation pop-up showing booking details*

![Dates in date picker are diasbled when it conflicts with a room's booked dates. Adding guests is disabled in guest picker when it exceeds max guest capacity](https://user-images.githubusercontent.com/24460065/216823449-999e72c7-ca30-4c31-bb03-99357b3998fa.png)








