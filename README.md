# ChifChef 👋 🍳

ChifChef is an intelligent, pantry-first kitchen companion and meal planning application designed to reduce food waste, simplify home cooking, and provide highly personalized culinary workflows. 

Adapting a culturally aware model—with initial support for African (specifically Kenyan and Nigerian) cuisines alongside global favorites—ChifChef connects the user's real-time pantry inventory with a recipe matchmaking engine, an interactive step-by-step cooking interface, and a personal culinary journal.

---

## 🌟 Core Features & Workflows

### 1. Pantry Intelligence & Tracking
* **Inventory Management:** Organize and track pantry items across different storage zones: **Fridge**, **Freezer**, and **Dry Pantry**.
* **Freshness & Expiry Alerts:** Dynamic calculations flag items as fresh, expiring soon, or urgent based on entry and expiration dates, helping prevent food waste.
* **Smart Pairing Suggestions:** When viewing a pantry item, get recommendations on what best to pair it with (e.g., matching cabbage with beef or onions) to kickstart your cooking.

### 2. Smart Recipe Matchmaking
* **Pantry Overlap Score:** Every recipe card displays an ingredient match fraction (e.g., `4/6 ingredients match`) comparing the recipe's requirements to your current pantry inventory.
* **Category Hub:** Browse recipes by meal type (Breakfast, Lunch, Dinner, Dessert, Snacks, Drinks).
* **Advanced Recipe Filters:** Filter recipes instantly by ready-to-cook availability (all ingredients on hand), preparation time (quick meals under 30 mins), calories (healthy choices under 400 kcal), and difficulty.
* **Sorting Capabilities:** Sort recipe feeds by default order, rating, or preparation time.

### 3. Immersive "Cook Mode"
* **Step-by-Step Guidance:** A dedicated, distraction-free interface focusing on one instruction at a time.
* **Dynamic Ingredients List:** View exact ingredient measurements and steps in tabbed selections.
* **Hands-Free Focus:** Designed to streamline culinary workflows while keeping your hands free in the kitchen.

### 4. Personal Culinary Journal (My CookBook)
* **Cooking History:** Track the recipes you've prepared over time.
* **Personal Notes:** Save ratings, preparation dates, and custom notes/reviews on how the meal turned out.
* **Quick Stats:** Displays a count of your total cooked items to encourage kitchen engagement.

### 5. Profile & Favorites Management
* **Favorite Recipes:** Quick favoriting via heart toggles on any recipe card, grouped in a dedicated searchable favorites tab.
* **Account Settings:** Edit full name, email, phone number, location, and update your profile avatar picture with form validation.

---

## 🛠️ Technology Stack

* **Framework:** [Expo v54](https://docs.expo.dev/versions/v54.0.0/) & [React Native](https://reactnative.dev/) (TypeScript)
* **Routing:** File-based navigation using [Expo Router](https://docs.expo.dev/router/introduction/) (custom tab bar implementation with cutout designs)
* **Styling & Theme:** Curated palette (warm orange accent, modern dark overlays) with robust styling variables
* **Animations:** Smooth micro-interactions utilizing React Native Reanimated
* **Icons:** `@expo/vector-icons` (Feather, Octicons, and custom tab bar iconography)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the Expo development server:
```bash
npm run start
```

In the interactive terminal, choose your target platform:
* Press `i` to open in the **iOS Simulator** (requires macOS and Xcode)
* Press `a` to open in the **Android Emulator** (requires Android Studio)
* Press `w` to open in a **Web Browser**
* Scan the QR code with the **Expo Go** app on your physical device

---

## 📂 Project Structure

```text
├── app/                  # File-based routing entries (Expo Router)
│   ├── (tabs)/           # Tab navigation layout (Kitchen, Search, Pantry, Profile)
│   ├── categories/       # Category details and filtered recipe feeds
│   ├── pantry/           # Pantry item detail screens
│   ├── recipes/          # Recipe detail & Cook Mode screens
│   └── _layout.tsx       # Root layout provider
├── assets/               # Local media assets (icons, recipe & ingredient images)
├── features/             # Feature-based modular code
│   ├── pantry/           # Pantry logic, components, hooks, and types
│   ├── profile/          # Profile, Cookbook journal, and account components
│   └── recipes/          # Recipe feed, detail tabs, and ingredient matching logic
├── lib/                  # Shared configurations (theme, tabs configuration)
└── shared/               # Shared reusable components (buttons, search bars, inputs)
```

