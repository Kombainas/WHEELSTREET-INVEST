# Adding a New Project

This guide shows how to add a new investor page for a different project (e.g., AI SaaS, FinTech app, etc.)

## Method 1: Using Admin Panel (Easiest) 🎯

**Coming soon!** Admin UI for creating projects will be available at `/admin` → Projects tab.

For now, use Method 2 below.

---

## Method 2: Manual Setup (Current) 📁

### Step 1: Copy Template

```bash
cd content/projects
cp -r _TEMPLATE your-project-slug
```

Example:
```bash
cp -r _TEMPLATE ai-saas
```

### Step 2: Edit `config.json`

Open `content/projects/your-project-slug/config.json` and update:

**Required fields:**
```json
{
  "id": "ai-saas",
  "name": "AI Automation Platform",
  "slug": "ai-saas",
  "industry": "Artificial Intelligence / SaaS",
  "tagline": "Automate workflows with AI"
}
```

**Investment terms:**
```json
{
  "fundraise": {
    "amount": "€500,000",
    "equity": "10%",
    "valuation": "€5M post-money",
    "structure": "Direct equity"
  }
}
```

**Targets:**
```json
{
  "target": {
    "timeframe": "24 months",
    "mrr": "€100K",
    "arr": "€1.2M",
    "breakEven": "2026 Q3"
  }
}
```

**Theme (optional - customize colors):**
```json
{
  "theme": {
    "primaryColor": "#3B82F6",
    "accentColor": "#8B5CF6",
    "gradient": "from-blue-600 to-purple-600"
  }
}
```

**Features (choose what to show):**
```json
{
  "features": {
    "showLoadingScreen": true,
    "showRevenueChart": true,
    "showSocialMediaStats": false,
    "showInvestmentCalculator": true
  }
}
```

### Step 3: Add Your Data (Optional)

Create these files if you want custom data:

**`metrics.json`** - Your KPI metrics
```json
[
  {
    "label": "Active Users",
    "value": 2500,
    "format": "number",
    "growth": "+150% MoM",
    "trend": "up"
  },
  {
    "label": "MRR",
    "value": 45000,
    "format": "currency",
    "growth": "+120% YoY",
    "trend": "up"
  }
]
```

**`team.json`** - Team members
```json
[
  {
    "name": "Jonas Celkis",
    "role": "CEO & Founder",
    "linkedin": "https://linkedin.com/in/jonascelkis",
    "bio": "15 years in AI and automation..."
  }
]
```

**`financials.json`** - Revenue data
```json
{
  "revenue": {
    "current": 45000,
    "target": 100000,
    "history": [
      {"month": "2025-01", "revenue": 30000, "label": "Sau"},
      {"month": "2025-02", "revenue": 35000, "label": "Vas"},
      {"month": "2025-03", "revenue": 45000, "label": "Kov"}
    ]
  },
  "costs": {
    "cogs": 20,
    "team": 40,
    "marketing": 15,
    "opex": 15
  }
}
```

### Step 4: Commit & Deploy

```bash
git add content/projects/your-project-slug/
git commit -m "Add new project: AI SaaS"
git push
```

Vercel will auto-deploy!

### Step 5: Access Your Page

```
https://wheelstreet-invest.vercel.app/?project=ai-saas
```

---

## Tips 💡

### Default Project

The default project (shown at `/` without `?project=` parameter) is **wheelstreet**.

### Multiple Projects

You can have as many projects as you want:
- `/?project=wheelstreet` - WheelStreet
- `/?project=ai-saas` - AI Project
- `/?project=fintech` - FinTech Project

### Reuse Content

If a data file doesn't exist, the system will use defaults or skip that section.

For example:
- No `metrics.json`? → Uses WheelStreet metrics as fallback
- No `team.json`? → Skips team section
- No `financials.json`? → Uses default financial model

### Test Locally

```bash
npm run dev
# Open http://localhost:3000/?project=your-project-slug
```

---

## Troubleshooting 🔧

**"Project not found" error**
- Check that folder name matches `slug` in config.json
- Verify config.json is valid JSON (use jsonlint.com)

**Changes not showing**
- Clear browser cache (Cmd+Shift+R)
- Restart dev server: `npm run dev`

**Styling looks wrong**
- Check `theme` colors in config.json
- Ensure colors are valid hex codes (#RRGGBB)

---

## Need Help?

- See `content/projects/_TEMPLATE/README.md` for field explanations
- Check `content/projects/wheelstreet/` for real example
- Contact: jonas@wheelstreet.lt
