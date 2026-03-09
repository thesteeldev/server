# 🚀 POWERDEV - QUICK START (10 MINUTES)

## Step 1: Local Testing (5 minutes)

```bash
# Extract project
cd powerdev

# Create virtual environment
python -m venv venv

# Activate
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install
pip install -r requirements.txt

# Create .env file
# Add: MONGO_URI=mongodb+srv://admin:ms2007@msj.ooyv80e.mongodb.net/powerdev?retryWrites=true&w=majority

# Run
python app.py

# Test
# Visit http://localhost:5000
# Click Register and create an account
```

## Step 2: Push to GitHub (2 minutes)

```bash
git add .
git commit -m "PowerDev: Ready for deployment"
git push origin main
```

## Step 3: Deploy on Render (3 minutes)

1. Go to https://render.com
2. Click "New" → "Web Service"
3. Select your powerdev repository
4. Configure:
   - Name: `powerdev`
   - Environment: Python 3
   - Build: `pip install -r requirements.txt`
   - Start: `gunicorn app:app`
5. Set Environment Variable:
   - MONGO_URI = Your MongoDB connection string
6. Click "Create"

**Done!** Your app is live in 2-3 minutes! 🎉

## Testing Your Live App

```
https://powerdev-xxxxx.onrender.com
```

Register and start tracking your transformation!

---

**That's it! Your PowerDev is LIVE.** 💪⚡🏆
