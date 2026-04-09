# CLAUDE.md

## Project Overview

**NUSWhere** is a React Native mobile navigation app for NUS (National University of Singapore) campus. It helps students, exchange students, and visitors navigate around campus via outdoor routes, sheltered walkways, and NUS internal shuttle buses.

Built as an NUS CP2106 Orbital project (2023, Apollo level) by Joey Lee Leyi and Lim Jun Xian.

## Tech Stack

- **Framework**: React Native + Expo (SDK 48)
- **Navigation**: Expo Router (file-based) + React Navigation (bottom tabs + stack)
- **Maps**: `react-native-maps` + `react-native-maps-directions` (Google Maps API)
- **Auth & Storage**: Firebase (Authentication, Firestore, Storage)
- **State Management**: Pullstate
- **Language**: JavaScript (ESLint configured)

## Project Structure

```
app/                        # Expo Router screens
  auth/login.js             # Login screen
  auth/register.js          # Register screen
  firebase.js               # Firebase config
  screens/
    map/mappage.js          # Main map + route search
    map/routespage.js       # Route directions display
    nearest-bus-stops/      # Nearest bus stop finder
    profile/profile.js      # User profile + saved routes
components/                 # Reusable UI components
  account/                  # Login/register form components
  profile/                  # Profile-related components
  routes/                   # Route list styles
  Autocomplete.jsx          # Venue search autocomplete
data/                       # Static JSON data
  buildings.json            # NUS buildings with coordinates, neighbours, bus stops
  bus-stops.json            # NUS bus stops with routes and neighbour graph
  venues.json               # Individual venues/rooms with coordinates
  venues.js / firestorebusstops.js / googledirections.js  # Data helpers
store.js                    # Pullstate store (auth state)
constants/                  # Theme, icons, images
```

## Key Features

1. **User Authentication** — Firebase email/password auth with login, register, and error handling
2. **Venue Autocomplete** — Search from local JSON data (buildings + venues); filtered on keypress
3. **Route Options** (origin → destination):
   - Outdoor walking (Google Maps Directions API)
   - Sheltered walking (custom BFS on building adjacency graph; images from Firebase Storage)
   - NUS bus route (custom BFS on bus-stop neighbour graph)
4. **Nearest Bus Stops** — Uses `expo-location` + `geolib` to find closest stops
5. **Favourite Routes** — Saved to Firebase Firestore per user; add/remove from route detail screen

## Algorithms

### Bus Route (BFS)
`findBestBusRoute(start, destination)` in `data/firestorebusstops.js` / map page:
- Reads `bus-stops.json`: each stop has `routes[]` and `neighbors{}` (next stop per bus line)
- BFS from start bus stop to destination bus stop
- Handles venue/building names → nearest bus stop lookup via `buildings.json` / `venues.json`

### Sheltered Route (BFS)
Similar BFS on `buildings.json` neighbour graph to find shortest sheltered path between buildings. Images for each walkway segment are stored in Firebase Storage in an adjacency-list structure.

## Running the App

```bash
npm install        # or yarn
expo start         # starts Expo dev server
expo start --ios   # iOS simulator
expo start --android
```

Requires:
- Expo Go app installed on device, or iOS/Android simulator
- Firebase project credentials configured in `app/firebase.js`
- Google Maps API key

## Data Files

- `data/buildings.json` — keyed by building code; fields: `name`, `neighbours[]`, `location{x,y}`, `busStop`
- `data/bus-stops.json` — array; fields: `name`, `location[]`, `code`, `routes[]`, `neighbors{routeCode: nextStop}`
- `data/venues.json` — keyed by venue code; fields: `location[]`, `busStop`

## Known Issues / Limitations

- Autocomplete dropdown list is not scrollable
- Sheltered route images may load out of order (async Firebase Storage fetches)
- Bus + walking combined routes not yet supported
- Map does not auto-zoom to user location
- Sheltered/bus route durations are hardcoded estimates
- Jest tests require manual patch to `node_modules/react-native/jest/setup.js` to work around Firebase `self is not defined` error

## Development Branch

Current working branch: `claude/create-claude-md-aXgsS`

Use feature branches for new work; merge to `main` via pull request.
