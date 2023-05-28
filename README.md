# NUSWhere

NUS, Where? We'll take you there!

### Proposed Level of Achievement

Apollo 11

### Motivation

As freshmen at NUS, we have encountered difficulties in navigating the vast university campus. Despite using popular map applications like Google Maps, we have found that they lack comprehensive navigation information for different venues within NUS. Additionally, we often find ourselves forgetting how to get to our venues for class at the beginning of the semester. We have also noticed that there are often many visitors visiting NUS. According to NUSNews, for NUS Open House 2023 alone, "[s]ome 7.71 million visitors attended the physical and online showcase which involved 3,071 faculty and staff, students and alumni". In our own experience, we recall visitors approaching us for directions but we are often unsure of the venue location ourselves.

Another factor to consider is Singapore's warm and humid weather, where periods of rain are irregular and we observe that we do not have the habit of bringing an umbrella along. Unfortunately, it is a common experience of having to wait for the rain to stop before we can walk across the street to reach another building as we are unsure how each buildings in NUS are connected.

Therefore, we thought to ourselves, why isn’t there a NUS navigation app that specifically helps out visitors and students like ourselves to commute around places in NUS with ease?

### Aim

We aim to develop a navigation mobile application so that information on travelling around the NUS campus are easily accessible and anyone can travel around NUS campus with ease.

### User Stories

1. As a exchange student / NUS student / visitor who is unfamiliar with the NUS campus, I want to be able to find routes to venues easily and quickly.
2. As a exchange student / NUS student / visitor commuting around NUS campus, I want to find the nearest bus stop at my current location for transportation.
3. As a student with lessons at the same venue regularly, I will like to save certain routes for easy access in the future instead of repeatedly searching for directions.
4. When it rains, as someone who may have forgotten my umbrella, I will like to find sheltered walkways around campus to avoid being caught in heavy rain.

## Features

### Map Directions

#### **[Proposed]**

We propose to display routes between the current location and end destination in a detailed manner alongside with a map that indicates the path taken by the route, just like Google Maps.

When users enter the prefixes of their current location and end destination in our search bar, users can **choose the location they want from a list of suggested autocomplete locations.**

After keying in the current location and end destination, users will be **provided with a list of suggested routes and the details of the routes will be shown upon clicking.**

#### **[Current]**

Currently, we are examining how to use map API to achieve the above proposed functionality. In addition, we are brainstorming how we can utilise the database of NUS buildings and bus stops nearest to them so that the routes displayed to user will suggest them to take NUS internal shuttle bus services to commute.

### Sheltered Walkways

#### **[Proposed]**

This additional feature is an extension of the route proposed by map API based on walking. Users will be able to **spot a sheltered path between the current and end location (if it exists) among the list of suggested routes, denoted by 'sheltered'.**

Upon clicking the sheltered route, users will be **notified on the specific level that this sheltered walkway is, in particular, the level that users should head to that connects two NUS buildings.**

#### **[Additional Features]**

We will like to provide visual aid to users instead of merely pure text of where the connected pathway is between two NUS buildings. Upon clicking on the word 'level', they will be redirected to a page of images which locates where this connected pathway is.

#### **[Current]**

Currently, we are brainstorming on the design of the database to store information of the connected pathway between two NUS buildings and how we can then integrate this database to generate a sheltered route.

### Nearest Bus Stops

#### **[Proposed]**

Users are **able to observe the nearest bus stops at their current location on the map, which are marked by red pointers.** Upon clicking on the pointers, users will be **redirected to a page that contains information of that particular bus stop, just like the NUSNext-Bus application; the buses available at the bus stop, respective bus arrival timings and bus routes will be provided.**

#### **[Current]**

Currently, we are looking into how we are able to possibly leverage on the existence of NUSNext-Bus application for the implementation of our proposed feature. We are also studying how the map API allows us to notify users about the nearest bus stops near them on the map.

### Favourites

#### **[Proposed]**

In order to access this feature, users will be **required / prompted to register an account for our application.** For each of the suggested route displayed to the user upon search, users are **given the choice of saving the routes** as shown in the figure below.
![Screenshot_20230522_231617_SG BusLeh 4869](https://github.com/applepiofmyeye/NUSWhere/assets/122253543/da02b8ad-dc5c-4b4f-b974-9cebc4100bfc)

Under the favourites tab, users can easily access to their saved routes. Similarly to the map directions feature, the details of the routes will be shown upon clicking. In addition, users will be given the choice to remove the saved routes from favorites.

#### **[Additional Features]**

Users are able to provide a name for their saved route so that they can refer to their desired saved route for reference easily.

#### **[Current]**

Currently, we have done up the need for user authentication to utilise our application.

## Tech Stack

### React Native

As we have decided to develop this as a mobile application, React Native would be suitable as it provides cross-platform development, meaning that the application **only requires a single codebase** to run on both iOS and Android, as compared to using two separate codebases in Swift/Objective-C and Java/Kotlin.

React Native's hot-reloading feature also allows us to **instantly see code changes** during the development process without the need to rebuild the entire app. This facilitates rapid development and iteration, improving productivity and efficiency.

Furthermore, React Native is based upon JavaScript, HTML and CSS, which are more familiar to us and would thus have a less steep learning curve for us to **pick up and implement quickly**.

### Firebase

Choosing between Supabase and Firebase, we decided to use Firebase as we foresee that **our database is not relational**. In addition, as one of our application's main feature requires providing users with **real time information on bus arrivals**, Firebase is able to fulfill this requirement with their Firebase Realtime Database.

Furthermore, Firebase's Realtime Database is designed for structured data storage and provides **real-time synchronization across clients**, making it suitable for applications that require real-time collaboration and messaging features, which would allow for **future extensibility** of our app to allow for collaborative features -- such as realtime sharing location and intended route, or realtime info of traffic flow or accidents on campus.

Moreover, our additional feature proposed for the sheltered walkways requires images for each link to a building to be stored and Firebase's Cloud Storage is suitable to **store images** at each linkway. It would also be suitable to store and retrieve images in Firebase's Cloud Storage. Firebase's Cloud Storage also offers secure and scalable storage with features such as access controls, metadata management, and **integration with other Firebase services**, such as Authentication which we are using for User Authentication.

### Map API

We have chosen the Routes API provided by Google Maps. Routes API provides the ideal route and alternate routes from one point to another, estimated times of arrival (ETAs) and the distances from origin to destination, as well as waypoints. The basic features of **ideal routes, alternate routes, travel time and distance estimates** are required for our app, which would provide these to users. As our navigation app would require more customised routes (sheltered walkways) the **waypoints feature** (where waypoints that need to be part of the route can be considered) would be suited to our needs. We intend to have different linkways and bridges be waypoints that student have to pass through. This feature could also allow for extensibility of more features in the far future, such as route planning.

Another consideration was Mapbox's Directions API. Mapbox's Directions API is suited for its customisable map styles, and powerful SDKs. It was seen as a possible choice for our map API for this reason as our sheltered walkways option would require a customisable view of the linkways. However, the coverage for Singapore directions for MapBox's Directions API are less reliable than Google Maps's Routes API coverage.

Thus, Google Maps's Routes API was chosen over MapBox's Directions API.

## Development Plan

| Tasks                                                         | Description                                                                                                    | Date              |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------- |
| Preliminary Research to navigation application implementation | Familiarise with all the Tech Stack we are using and reference to examples of existing navigation applications | 13 - 28 May       |
| User Authentication                                           | Design and implementation of login page, setting up of firebase to store users registered to our application   | 21 - 28 May       |
| Map Direction Feature                                         | Implementation of Map API, acquiring data related to NUS shuttle bus services                                  | 29 - 31 May       |
| Map Direction Feature                                         | Integration of data related to NUS shuttle bus services                                                        | 1 - 4 June        |
| Sheltered Walkways Feature                                    | Gather information of sheltered paths, in particular, the specific levels connecting between 2 NUS buildings   | 5 - 6 June        |
| Sheltered Walkways Feature                                    | Integration of data related to sheltered paths                                                                 | 7 - 10 June       |
| Nearest Bus Stops Feature                                     | Gather information about all bus stops within NUS campus, both public bus stops and internal bus stops         | 11 - 12 June      |
| Nearest Bus Stops Feature                                     | Implementing and integration of NUS NextBus API                                                                | 13 - 14 June      |
| Nearest Bus Stops Feature                                     | Implementation of markers of nearest bus stops from current location                                           | 15 - 18 June      |
| Favourites Feature                                            | Implementation of save and delete functions                                                                    | 19 - 25 June      |
| Gather feedback                                               | Asking our peers their personal opinion of our application                                                     | 26 June - 30 June |
| All Features                                                  | Improving user interface and asthetics of application                                                          | 1 - 9 July        |
| Overall                                                       | Improving on feedback provided by peers                                                                        | 10 - 12 July      |
| Sheltered Walkways Feature                                    | Going to school and taking photos of connected pathways between 2 NUS buildings                                | 13 - 14 July      |
| Sheltered Walkways Feature                                    | Integrating the photos taken into database and implementation of visual aids for users                         | 15 - 19 July      |
| Favourites Feature                                            | Implementation of allowing users to name their saved routes                                                    | 20 - 22 July      |
| Overall                                                       | Documentation and tidying up code                                                                              | 23 - 24 July      |
