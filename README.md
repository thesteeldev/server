# 💪 POWERDEV - Personal Transformation Operating System

Transform into the most powerful version of yourself across all aspects of life.

## ✨ What is PowerDev?

PowerDev is a **personal transformation platform** that helps you dominate in 6 critical life dimensions:

- **❤️ Health** - Physical fitness, nutrition, sleep, energy
- **💰 Wealth** - Financial goals, income, investments
- **⚡ Power** - Personal strength, confidence, discipline
- **👑 Influence** - Leadership, networking, impact
- **🧠 Skills** - Learning, mastery, expertise
- **🤝 Relationships** - Connections, communication, impact

## ✅ Features

- 🎯 **Domination Goals** - Set and track goals across all life areas
- 🔥 **Power Habits** - Build daily habits with streak tracking
- 📊 **Power Stats** - Track progress across 6 dimensions
- 💡 **Mastermind Journal** - Capture strategies and wisdom
- 🏆 **Victory Log** - Celebrate every win
- ⚡ **Overall Power Meter** - See your total life score

## 🛠️ Tech Stack

- **Backend:** Python Flask
- **Database:** MongoDB
- **Frontend:** HTML5, CSS3, JavaScript
- **Deployment:** Render or Netlify

## 🚀 Quick Start

### Local Development
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file with MongoDB URI
echo "MONGO_URI=mongodb+srv://..." > .env

# Run the app
python app.py

# Visit http://localhost:5000
```

### Deploy on Render (Recommended)
1. Push to GitHub
2. Visit https://render.com
3. Create Web Service from repository
4. Set MONGO_URI environment variable
5. Deploy! ✅

### Deploy on Netlify
1. Push to GitHub
2. Visit https://netlify.com
3. Import your repository
4. Deploy! ✅

## 📋 Files Included

```
powerdev/
├── app.py                 # Flask backend (FIXED)
├── requirements.txt       # Python dependencies
├── runtime.txt           # Python version (3.11.8)
├── Procfile             # Deployment config
├── netlify.toml         # Netlify config
├── .env.example         # Environment template
├── .gitignore           # Git rules
├── README.md            # This file
├── templates/
│   └── index.html       # Frontend interface
└── static/
    ├── css/
    │   └── style.css    # Styling
    └── js/
        └── script.js    # JavaScript logic
```

## 🔧 What's Fixed

✅ **app.py** - Proper MongoDB URI handling with URL encoding
✅ **runtime.txt** - Updated to python-3.11.8 (Netlify/Render compatible)
✅ **netlify.toml** - Complete Netlify configuration
✅ **Procfile** - Production process configuration
✅ **requirements.txt** - All dependencies including gunicorn

## 🚀 Deployment Guide

See `NETLIFY_RENDER_FIXED.md` for detailed deployment instructions.

## 💪 Transform Your Life

Track and improve:
- Health
- Wealth
- Power
- Influence
- Skills
- Relationships

All in one powerful platform.

---

**Your transformation starts now.** 💪⚡🏆
