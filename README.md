# Gen AI Analytics Dashboard

A modern, interactive analytics dashboard built with React that provides real-time business insights and data visualization. The application uses free APIs to generate suggestions and fetch real financial data.

## Features

- 📊 Real-time data visualization with interactive charts
- 🔍 Smart query suggestions using Datamuse API
- 📈 Financial data integration via Financial Modeling Prep API
- 📱 Fully responsive design
- 📝 Query history tracking
- 📊 Automatic insight generation
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Redux state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gen-ai-analytics-dashboard.git
cd gen-ai-analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Enter a Query**: Type your business question in the search bar
2. **Select Suggestions**: Choose from smart query suggestions
3. **View Results**: See visualized data and generated insights
4. **Track History**: Review previous queries in the sidebar

### Example Queries

- "Show monthly revenue trends"
- "Analyze stock price performance"
- "Track monthly active users"
- "Compare quarterly sales data"

## Tech Stack

- **Frontend Framework**: React
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **APIs**:
  - Datamuse API (query suggestions)
  - Financial Modeling Prep API (financial data)

## Project Structure

```
src/
├── components/
│   ├── QueryInput.jsx     # Search input with suggestions
│   ├── QueryHistory.jsx   # Sidebar with query history
│   └── ResultsDisplay.jsx # Chart and insights display
├── store/
│   ├── querySlice.js      # Redux slice for query state
│   └── store.js           # Redux store configuration
├── App.jsx                # Main application component
└── main.jsx              # Application entry point
```

## Features in Detail

### Smart Query Processing
- Intelligent parsing of user queries
- Context-aware data generation
- Real financial data integration for stock-related queries

### Data Visualization
- Interactive line charts
- Trend indicators
- Key metrics display
- Responsive design

### Query History
- Track previous searches
- Quick requery capability
- Persistent history

### Insights Generation
- Automatic trend analysis
- Key metrics calculation
- Performance comparisons
- Data point analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Recharts](https://recharts.org/) for the charting library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Datamuse API](https://www.datamuse.com/api/) for query suggestions
- [Financial Modeling Prep](https://financialmodelingprep.com/developer/docs/) for financial data
