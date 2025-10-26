# Project Template

This template provides the structure for creating a new investor page.

## Quick Start

1. **Copy this folder:**
   ```bash
   cp -r content/projects/_TEMPLATE content/projects/your-project-slug
   ```

2. **Edit `config.json`:**
   - Update all fields with your project data
   - Choose which features to show/hide

3. **Add your data files:**
   - `metrics.json` - Your KPI metrics
   - `team.json` - Team members
   - `financials.json` - Revenue and projections

4. **Access your page:**
   ```
   https://yoursite.com/?project=your-project-slug
   ```

## Config Fields Explained

### Basic Info
- `id`: Unique identifier (lowercase, no spaces)
- `name`: Display name of your project
- `slug`: URL-friendly version (used in ?project=slug)
- `industry`: Your industry category
- `tagline`: Short description
- `logo`: Path to logo image
- `status`: "draft" or "active"

### Fundraise
- `amount`: How much you're raising (e.g., "€500K")
- `equity`: Equity offered (e.g., "10%")
- `valuation`: Post-money valuation
- `structure`: Investment structure (e.g., "Direct equity", "SAFE note")

### Target
- `timeframe`: Timeline for targets (e.g., "24 months")
- `mrr`: Target monthly recurring revenue
- `arr`: Target annual recurring revenue
- `breakEven`: When you'll reach break-even

### Theme
- `primaryColor`: Main brand color (hex code)
- `accentColor`: Accent/highlight color
- `gradient`: Tailwind gradient classes

### Features (true/false)
- `showLoadingScreen`: Show premium loading animation
- `showRevenueChart`: Show revenue growth chart
- `showSocialMediaStats`: Show social media metrics
- `showPartnerSection`: Show partners/ecosystem
- `showCompetitiveTable`: Show competitive analysis
- `showFinancialModel`: Show P&L breakdown
- `showInvestmentCalculator`: Show ROI calculator
- `showExitStrategy`: Show exit scenarios

## Data Files

### metrics.json
```json
[
  {
    "label": "Monthly Revenue",
    "value": 45000,
    "format": "currency",
    "growth": "+120% YoY",
    "trend": "up"
  }
]
```

### team.json
```json
[
  {
    "name": "John Doe",
    "role": "CEO & Co-Founder",
    "linkedin": "https://linkedin.com/in/johndoe",
    "image": "/team/john.jpg",
    "bio": "15 years in tech..."
  }
]
```

### financials.json
```json
{
  "revenue": {
    "current": 45000,
    "target": 100000,
    "history": [
      {"month": "2025-01", "revenue": 30000},
      {"month": "2025-02", "revenue": 35000}
    ]
  },
  "costs": {
    "cogs": 0,
    "team": 40,
    "marketing": 15,
    "opex": 20
  }
}
```

## Need Help?

- See `/docs/ADD_NEW_PROJECT.md` for detailed guide
- Check existing projects in `content/projects/wheelstreet/` for examples
- Use admin panel: Go to `/admin` → Projects tab
