# NUSWhere
NUS, Where? We'll take you there!

### Proposed Level of Achievement
Apollo 11

### Motivation
Being freshmen in NUS, we find it difficult to navigate ourselves around the huge university campus; navigation between different venues in NUS is not readily available on popular map applications we seek directions for such as Google Maps. Also, we always find ourselves in a situation forgetting how to get to our venues for class at the start of the semester. Moreover, there are often many visitors visiting NUS; we recalled visitors asking us for directions to their destination but more often than not do we find ourselves loss for words as we are unsure where the exact location is. In addition, as Singapore is known to be warm and humid, rainy days are rare and we do not have the habit of bringing an umbrella along. Sometimes, we unfortunately face a situation of having to wait for the rain to stop before we can walk across the street to reach another building as we are unsure how each buildings in NUS are connected.

So, we though to ourselves, why isn’t there a NUS navigation app that specifically helps out visitors and students like ourselves to commute around places in NUS with ease?

### Aim
We aim to develop a navigation mobile application so that information on travelling around the NUS campus are easily accessible and anyone can travel around NUS campus with ease.

### User Stories
1. As a exchange student / NUS student / visitor who is unfamiliar with the NUS campus, I want to be able to find routes to venues easily and quickly.
2. As a exchange student / NUS student / visitor commuting around NUS campus, I want to find the nearest bus stop at my current location for transportation.
3. As a student with lessons at the same venue regularly, I will like to save certain routes for easy access in the future instead of repeatedly searching for directions.
4. When it rains, as someone who may have forgotten my umbrella, I will like to find sheltered walkways around campus to avoid being caught in heavy rain.

## Features
### Map Directions
**[Proposed]**
We propose to display routes between the current location and end destination in a detailed manner alongside with a map that indicates the path taken by the route, just like Google Maps.

When users enter the prefixes of their current location and end destination in our search bar, users can **choose the location they want from a list of suggested autocomplete locations.**

After keying in the current location and end destination, users will be **provided with a list of suggested routes and the details of the routes will be shown upon clicking.**

**[Current]**
Currently, we are examining how to use map API to achieve the above proposed functionality. In addition, we are brainstorming how we can utilise the database of NUS buildings and bus stops nearest to them so that the routes displayed to user will suggest them to take NUS internal shuttle bus services to commute.

### Sheltered Walkways
**[Proposed]**
This additional feature is an extension of the route proposed by map API based on walking. Users will be able to **spot a sheltered path between the current and end location (if it exists) among the list of suggested routes, denoted by 'sheltered'.**

Upon clicking the sheltered route, users will be **notified on the specific level that this sheltered walkway is, in particular, the level that users should head to that connects two NUS buildings.**

**[Additional Features]**
We will like to provide visual aid to users instead of merely pure text of where the connected pathway is between two NUS buildings. Upon clicking on the word 'level', they will be redirected to a page of images which locates where this connected pathway is.

**[Current]**
Currently, we are brainstorming on the design of the database to store information of the connected pathway between two NUS buildings and how we can then integrate this database to generate a sheltered route.

### Nearest Bus Stops
**[Proposed]**
Users are **able to observe the nearest bus stops at their current location on the map, which are marked by red pointers.** Upon clicking on the pointers, users will be **redirected to a page that contains information of that particular bus stop, just like the NUSNext-Bus application; the buses available at the bus stop, respective bus arrival timings and bus routes will be provided.**

**[Current]**
Currently, we are looking into how we are able to possibly leverage on the existence of NUSNext-Bus application for the implementation of our proposed feature. We are also studying how the map API allows us to notify users about the nearest bus stops near them on the map.

### Favourites
**[Proposed]**
In order to access this feature, users will be **required / prompted to register an account for our application.** For each of the suggested route displayed to the user upon search, users are **given the choice of saving the routes** as shown in the figure below.
![Screenshot_20230522_231617_SG BusLeh 4869](https://github.com/applepiofmyeye/NUSWhere/assets/122253543/da02b8ad-dc5c-4b4f-b974-9cebc4100bfc)

Under the favourites tab, users can easily access to their saved routes. Similarly to the map directions feature, the details of the routes will be shown upon clicking. In addition, users will be given the choice to remove the saved routes from favorites.

**[Additional Features]**
Users are able to provide a name for their saved route so that they can refer to their desired saved route for reference easily.

**[Current]**
Currently, we have done up the need for user authentication to utilise our application.

## Tech Stack
### React Native
We propose to do up a mobile based application for our application.
### Firebase
Choosing between supabase and firebase, we decided to use firebase as we forsee that our database is not relational. In addition, as one of our application main feature requires providing users with real time information about buses, firebase is able to fulfill this requirement with their firebase realtime database. Moreover, our additional feature proposed for the sheltered walkways requires images to be stored and firebase is best known for its storage functions.
### Map API

## Development Plan

