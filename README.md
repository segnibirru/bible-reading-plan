# Bible Reading Plan

A cross-platform mobile and web app for the 52-Week Bible Reading Plan by Michael Coley. Built with Expo (React Native).

## Features

- **Daily reading view** — shows today's reading across 7 categories
- **52-week plan overview** — browse and track all weeks
- **Bible text** — tap any reading to open the full passage (via bible-api.com)
- **Progress tracking** — check off completed readings, stored locally on device
- **Daily notifications** — set a custom reminder time
- **Dark theme** — clean, professional design

## Reading Categories

| Day | Category |
|-----|----------|
| Sunday | Epistles |
| Monday | The Law |
| Tuesday | History |
| Wednesday | Psalms |
| Thursday | Poetry |
| Friday | Prophecy |
| Saturday | Gospels |

## Tech Stack

- [Expo](https://expo.dev/) / React Native
- [Expo Router](https://expo.github.io/router/) — file-based navigation
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) — push notifications
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — local progress storage
- [bible-api.com](https://bible-api.com/) — free Bible text API (World English Bible)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Expo Go](https://expo.dev/go) app on your phone (for testing)

### Install

```bash
git clone https://github.com/YOUR_USERNAME/bible-reading-plan.git
cd bible-reading-plan
npm install
```

### Run

```bash
# Start development server
npx expo start

# Web only
npx expo start --web

# Android
npx expo start --android

# iOS
npx expo start --ios
```

Scan the QR code with the **Expo Go** app on your phone to preview on Android or iOS.

## Project Structure

```
app/
  (tabs)/
    index.tsx       # Today's reading screen
    plan.tsx        # Full 52-week plan screen
    settings.tsx    # Notifications & progress settings
  reading/
    [ref].tsx       # Bible text viewer
constants/
  readingPlan.ts    # All 52 weeks of reading data
hooks/
  useProgress.ts    # Reading progress (AsyncStorage)
  useNotifications.ts  # Push notification scheduling
```

## Bible Reading Plan

Based on the *52 Week Bible Reading Plan* by Michael Coley.
© 1995–2009 Michael Coley — used with permission. [bible-reading.com](http://www.bible-reading.com)

## License

MIT
