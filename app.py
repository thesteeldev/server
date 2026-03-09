import os
import json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import certifi
from bson.objectid import ObjectId
import uuid
from urllib.parse import quote_plus

app = Flask(__name__)
CORS(app)

# ==========================================
# 💪 POWERDEV - PERSONAL TRANSFORMATION OS
# ==========================================

# --- CONFIGURATION WITH PROPER ERROR HANDLING ---
def get_mongo_uri():
    """Get MongoDB URI from environment or construct it"""
    # Check if full URI is in environment (for Render/deployment)
    if 'MONGO_URI' in os.environ:
        return os.environ['MONGO_URI']
    
    # If not, construct from components (for local development)
    mongo_user = os.environ.get('MONGO_USER', 'admin')
    mongo_password = os.environ.get('MONGO_PASSWORD', 'password')
    mongo_cluster = os.environ.get('MONGO_CLUSTER', 'mongodb+srv')
    mongo_host = os.environ.get('MONGO_HOST', 'localhost:27017')
    mongo_db = os.environ.get('MONGO_DB', 'powerdev')
    
    # URL encode username and password (handles special characters)
    encoded_user = quote_plus(mongo_user)
    encoded_password = quote_plus(mongo_password)
    
    if mongo_cluster == 'mongodb+srv':
        # MongoDB Atlas format
        return f"mongodb+srv://{encoded_user}:{encoded_password}@{mongo_host.split(':')[0]}/{mongo_db}?retryWrites=true&w=majority"
    else:
        # Local MongoDB format
        return f"mongodb://{encoded_user}:{encoded_password}@{mongo_host}/{mongo_db}"

MONGO_URI = get_mongo_uri()

# Setup DB
try:
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where(), serverSelectionTimeoutMS=5000)
    # Test connection
    client.admin.command('ping')
    db = client.get_database("powerdev")
    
    # Collections
    users_collection = db["users"]
    goals_collection = db["goals"]
    daily_habits_collection = db["daily_habits"]
    power_stats_collection = db["power_stats"]
    mastermind_collection = db["mastermind"]
    wins_collection = db["wins"]
    
    print("✅ PowerDev Database Connected (All Systems Go)!")
except Exception as e:
    print(f"❌ Database Error: {e}")
    print("⚠️ App will run but database operations may fail")
    print("📝 Make sure MONGO_URI is set correctly in environment variables")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for deployment platforms"""
    return jsonify({"status": "🚀 PowerDev Server Running!", "message": "All Systems Go"}), 200


# ===========================
# 👤 USER MANAGEMENT
# ===========================

@app.route('/api/create_user', methods=['POST'])
def create_user():
    try:
        data = request.json
        user = {
            "name": data.get("name"),
            "email": data.get("email"),
            "vision": data.get("vision", ""),
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "power_level": 0,
            "streak": 0
        }
        result = users_collection.insert_one(user)
        return jsonify({"message": "User Created!", "user_id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get_user/<email>', methods=['GET'])
def get_user(email):
    try:
        user = users_collection.find_one({"email": email})
        if user:
            user['_id'] = str(user['_id'])
            return jsonify(user), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/update_user', methods=['POST'])
def update_user():
    try:
        data = request.json
        email = data.get("email")
        users_collection.update_one(
            {"email": email},
            {"$set": {
                "vision": data.get("vision"),
                "power_level": data.get("power_level", 0),
                "streak": data.get("streak", 0)
            }}
        )
        return jsonify({"message": "User Updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 🎯 DOMINATION GOALS
# ===========================

@app.route('/api/create_goal', methods=['POST'])
def create_goal():
    try:
        data = request.json
        goal = {
            "email": data.get("email"),
            "title": data.get("title"),
            "category": data.get("category"),
            "timeline": data.get("timeline"),
            "importance": data.get("importance"),
            "status": "ACTIVE",
            "progress": 0,
            "created_at": datetime.now().strftime("%Y-%m-%d"),
            "milestones": data.get("milestones", []),
            "timestamp": datetime.now()
        }
        result = goals_collection.insert_one(goal)
        return jsonify({"message": "Goal Created!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get_goals/<email>', methods=['GET'])
def get_goals(email):
    try:
        goals = []
        cursor = goals_collection.find({"email": email}).sort("timestamp", -1)
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            doc['timestamp'] = str(doc['timestamp'])
            goals.append(doc)
        return jsonify(goals), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/update_goal_progress', methods=['POST'])
def update_goal_progress():
    try:
        data = request.json
        goal_id = data.get("goal_id")
        progress = data.get("progress")
        goals_collection.update_one(
            {"_id": ObjectId(goal_id)},
            {"$set": {"progress": progress}}
        )
        return jsonify({"message": "Goal Updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 🔥 DAILY POWER HABITS
# ===========================

@app.route('/api/create_habit', methods=['POST'])
def create_habit():
    try:
        data = request.json
        habit = {
            "email": data.get("email"),
            "name": data.get("name"),
            "category": data.get("category"),
            "power_points": data.get("power_points", 10),
            "completed_dates": [],
            "streak": 0,
            "created_at": datetime.now().strftime("%Y-%m-%d")
        }
        result = daily_habits_collection.insert_one(habit)
        return jsonify({"message": "Habit Created!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get_habits/<email>', methods=['GET'])
def get_habits(email):
    try:
        habits = []
        cursor = daily_habits_collection.find({"email": email})
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            habits.append(doc)
        return jsonify(habits), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/complete_habit', methods=['POST'])
def complete_habit():
    try:
        data = request.json
        habit_id = data.get("habit_id")
        today = datetime.now().strftime("%Y-%m-%d")
        
        habit = daily_habits_collection.find_one({"_id": ObjectId(habit_id)})
        if habit:
            completed = habit.get("completed_dates", [])
            if today not in completed:
                completed.append(today)
                streak = len(completed)
                daily_habits_collection.update_one(
                    {"_id": ObjectId(habit_id)},
                    {"$set": {"completed_dates": completed, "streak": streak}}
                )
                return jsonify({"message": "Habit Completed! Power +10", "streak": streak}), 200
            return jsonify({"message": "Already completed today"}), 200
        return jsonify({"error": "Habit not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 💪 POWER STATS TRACKER
# ===========================

@app.route('/api/get_power_stats/<email>', methods=['GET'])
def get_power_stats(email):
    try:
        stats = power_stats_collection.find_one({"email": email})
        if not stats:
            stats = {
                "email": email,
                "health": 0,
                "wealth": 0,
                "power": 0,
                "influence": 0,
                "skills": 0,
                "relationships": 0,
                "overall": 0
            }
            power_stats_collection.insert_one(stats)
        stats['_id'] = str(stats['_id'])
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/update_power_stats', methods=['POST'])
def update_power_stats():
    try:
        data = request.json
        email = data.get("email")
        
        h = data.get("health", 0)
        w = data.get("wealth", 0)
        p = data.get("power", 0)
        i = data.get("influence", 0)
        s = data.get("skills", 0)
        r = data.get("relationships", 0)
        overall = int((h + w + p + i + s + r) / 6)
        
        power_stats_collection.update_one(
            {"email": email},
            {"$set": {
                "health": h,
                "wealth": w,
                "power": p,
                "influence": i,
                "skills": s,
                "relationships": r,
                "overall": overall,
                "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }},
            upsert=True
        )
        return jsonify({"message": "Power Stats Updated", "overall": overall}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 🧠 MASTERMIND NOTES
# ===========================

@app.route('/api/add_mastermind', methods=['POST'])
def add_mastermind():
    try:
        data = request.json
        note = {
            "email": data.get("email"),
            "title": data.get("title"),
            "content": data.get("content"),
            "category": data.get("category"),
            "date": datetime.now().strftime("%Y-%m-%d"),
            "timestamp": datetime.now()
        }
        result = mastermind_collection.insert_one(note)
        return jsonify({"message": "Mastermind Note Saved!", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get_mastermind/<email>', methods=['GET'])
def get_mastermind(email):
    try:
        notes = []
        cursor = mastermind_collection.find({"email": email}).sort("timestamp", -1)
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            doc['timestamp'] = str(doc['timestamp'])
            notes.append(doc)
        return jsonify(notes), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 🏆 WINS & VICTORIES
# ===========================

@app.route('/api/record_win', methods=['POST'])
def record_win():
    try:
        data = request.json
        win = {
            "email": data.get("email"),
            "title": data.get("title"),
            "description": data.get("description"),
            "category": data.get("category"),
            "date": datetime.now().strftime("%Y-%m-%d"),
            "timestamp": datetime.now()
        }
        result = wins_collection.insert_one(win)
        return jsonify({"message": "Victory Recorded! 🏆"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/get_wins/<email>', methods=['GET'])
def get_wins(email):
    try:
        wins = []
        cursor = wins_collection.find({"email": email}).sort("timestamp", -1)
        for doc in cursor:
            doc['_id'] = str(doc['_id'])
            doc['timestamp'] = str(doc['timestamp'])
            wins.append(doc)
        return jsonify(wins), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ===========================
# 📊 DASHBOARD DATA
# ===========================

@app.route('/api/get_dashboard/<email>', methods=['GET'])
def get_dashboard(email):
    try:
        user = users_collection.find_one({"email": email})
        stats = power_stats_collection.find_one({"email": email})
        goals = list(goals_collection.find({"email": email}).limit(5))
        habits = list(daily_habits_collection.find({"email": email}).limit(10))
        wins = list(wins_collection.find({"email": email}).limit(5))
        
        # Convert ObjectIds to strings
        for goal in goals:
            goal['_id'] = str(goal['_id'])
            goal['timestamp'] = str(goal['timestamp'])
        
        for habit in habits:
            habit['_id'] = str(habit['_id'])
        
        for win in wins:
            win['_id'] = str(win['_id'])
            win['timestamp'] = str(win['timestamp'])
        
        if stats:
            stats['_id'] = str(stats['_id'])
        
        if user:
            user['_id'] = str(user['_id'])
        
        return jsonify({
            "user": user,
            "stats": stats,
            "goals": goals,
            "habits": habits,
            "wins": wins
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
