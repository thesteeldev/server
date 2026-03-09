# 🚀 POWERDEV - QUICK START (5 MINUTES)

## Step 1: Download & Extract
```bash
# Extract the project
unzip powerdev.zip
cd powerdev
```

## Step 2: Set Up Python Environment
```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

## Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

## Step 4: Configure Database

### Option A: Use MongoDB Atlas (Free Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGO_URI` in `app.py`

### Option B: Use Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use local connection string in `app.py`

## Step 5: Run the Application
```bash
python app.py
```

You should see:
```
✅ Database Connected (All Systems Go)!
 * Running on http://127.0.0.1:5000
```

## Step 6: Access the Application
Open in browser: `http://localhost:5000`

## Step 7: Create Your Account
1. Click "Register"
2. Enter your details
3. Define your vision
4. Click "Start Your Journey"

## Step 8: Start Building Your Power

### Add a Goal
1. Click "Goals"
2. Create your first goal
3. Set category, timeline, importance

### Add a Habit
1. Click "Habits"
2. Create daily habit
3. Complete it daily for streaks

### Update Power Stats
1. Go to Dashboard
2. Adjust sliders for 6 dimensions
3. Watch your overall power grow

### Record Wins
1. Click "Victories"
2. Log every achievement
3. Celebrate progress

### Capture Insights
1. Click "Mastermind"
2. Save strategies and insights
3. Build your personal playbook

## 📊 Dashboard Features

**Overall Power Level** - Your combined score (0-100)

**6 Dimensions:**
- ❤️ Health (fitness, nutrition, sleep)
- 💰 Wealth (financial progress)
- ⚡ Power (personal strength)
- 👑 Influence (leadership, impact)
- 🧠 Skills (learning, mastery)
- 🤝 Relationships (connections)

## 💡 Daily Routine

**Morning:**
- Review your goals
- Check habit streaks
- Plan your day

**Throughout the Day:**
- Complete daily habits (+10 power points each)
- Work towards goals
- Track progress

**Evening:**
- Record wins/victories
- Update power stats
- Capture insights
- Reflect on progress

## 🎯 30-Day Challenge

**Week 1:** Set goals, establish habits
**Week 2:** Focus on streaks, build momentum
**Week 3:** Record wins, track progress
**Week 4:** Update stats, plan next month

Watch your transformation unfold.

## ✨ Pro Tips

1. **Be Specific** - Clear goals = better results
2. **Be Daily** - Consistency beats intensity
3. **Be Honest** - Real data = real progress
4. **Be Strategic** - Review and adjust monthly
5. **Be Bold** - Big goals create big results

## 🔧 Customization

### Change Colors
Edit `static/css/style.css`:
```css
--accent: #ff6b35;  /* Change to your color */
```

### Add More Dimensions
Modify `app.py` and add to power stats tracking.

### Create Custom Categories
Update goal/habit category options in HTML.

## 🐛 Common Issues

### "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### "MongoDB connection error"
- Check connection string
- Verify IP whitelisting
- Test connection online

### "Page not loading"
- Stop Flask app (Ctrl+C)
- Clear browser cache
- Restart with `python app.py`

## 📱 Access on Mobile

Use your computer's IP address:
```
http://YOUR_IP:5000
```

Or set up localhost tunneling with ngrok.

## 🚀 Next Level Features

Plan to add:
- [ ] AI-powered insights
- [ ] Social challenges
- [ ] Progress charts
- [ ] Mobile app
- [ ] Email reminders
- [ ] Community features

## 🎓 Success Framework

```
Vision → Goals → Habits → Daily Action → Tracking → Adjustment → Success
```

## 💪 Mindset Checklist

- [ ] I am committed to my vision
- [ ] I track daily
- [ ] I celebrate wins
- [ ] I adjust strategies
- [ ] I believe in myself
- [ ] I am becoming powerful

## 📞 Need Help?

1. Read README.md
2. Check the API documentation
3. Review database schema
4. Check browser console for errors
5. Verify database connection

## 🎉 You're Ready!

You now have a complete personal transformation system.

**Your journey to dominance starts now.**

```
PowerDev: Transform Into Your Best Self
❤️ Health • 💰 Wealth • ⚡ Power • 👑 Influence • 🧠 Skills • 🤝 Relationships
```

**Track it. Build it. Dominate it.** 💪

---

*Remember: The most successful people in the world track their progress. You're now one of them.*
