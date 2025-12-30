# LocalFinder Frontend

A modern React application for discovering local places around you. Find restaurants, cafes, parks, and more with an interactive map interface.

## ✨ Features

- **🔍 Smart Search** - Search for places by category or name
- **🗺️ Interactive Map** - View places on an interactive Leaflet map
- **📍 Geolocation** - Automatically detect your location
- **🌙 Dark Mode** - Beautiful dark theme support
- **📱 Responsive** - Mobile-first responsive design
- **⚡ Fast** - Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Data Fetching**: SWR
- **Maps**: React Leaflet
- **Icons**: Material Symbols

## 📁 Project Structure

```
frontend/
├── public/
│   └── logo.png
├── src/
│   ├── common/           # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Chip.jsx
│   │   ├── Input.jsx
│   │   ├── SearchBar.jsx
│   │   └── Select.jsx
│   ├── components/       # Feature components
│   │   └── Map.jsx
│   ├── hooks/            # Custom React hooks
│   ├── layout/           # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   ├── PlaceDetail.jsx
│   │   └── SearchResults.jsx
│   ├── services/         # API service layer
│   ├── utils/            # Utility functions
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── package.json
```

## 🔧 Installation

```bash
# Install dependencies
pnpm install
```

## 🏃 Running Locally

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will be available at `http://localhost:5173`

## 🎨 Design System

### Colors

| Name       | Light     | Dark      |
| ---------- | --------- | --------- |
| Primary    | `#3b82f6` | `#3b82f6` |
| Background | `#f8fafc` | `#0b0f17` |
| Surface    | `#ffffff` | `#151c2b` |

### Components

The app uses a consistent set of reusable components:

- **Button** - Primary, secondary, outline, ghost variants
- **Card** - PlaceCard, FeaturedCard for displaying places
- **Chip** - Category chips with icons
- **SearchBar** - Hero and compact variants
- **Select** - Styled dropdown select

## 📱 Pages

### Home (`/`)

- Hero section with search
- Quick category chips
- Trending nearby places
- Interactive map preview

### Search Results (`/search`)

- Split view: List + Map
- Filters (Open Now, Sort, Price, Rating)
- Pagination
- Mobile view toggle

### Place Detail (`/place/:id`)

- Place images and info
- Rating and reviews
- Location map with directions
- Contact information

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

## 📄 License

Apache 2.0 - See [LICENSE](LICENSE) for details.

## 👤 Author

**adam-ctrlc**

- GitHub: [@adam-ctrlc](https://github.com/adam-ctrlc)
