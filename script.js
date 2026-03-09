// ================================================
// 💪 POWERDEV - PERSONAL TRANSFORMATION OS
// JavaScript Logic & Application Flow
// ================================================

const API_BASE = 'http://localhost:5000/api';
let currentUser = null;
let currentEmail = null;

// ========================
// 🔐 AUTHENTICATION
// ========================

function registerUser() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const vision = document.getElementById('register-vision').value;

    if (!name || !email || !vision) {
        alert('Please fill all fields!');
        return;
    }

    fetch(`${API_BASE}/create_user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, vision })
    })
    .then(res => res.json())
    .then(data => {
        alert('🎉 Welcome to PowerDev! You are now registered!');
        currentEmail = email;
        currentUser = { name, email, vision };
        localStorage.setItem('powerdev_user', email);
        loginUser();
    })
    .catch(err => console.error('Registration Error:', err));
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    
    if (!email) {
        alert('Please enter your email!');
        return;
    }

    fetch(`${API_BASE}/get_user/${email}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert('User not found. Please register first!');
            return;
        }
        currentEmail = email;
        currentUser = data;
        localStorage.setItem('powerdev_user', email);
        showApp();
        loadDashboard();
    })
    .catch(err => console.error('Login Error:', err));
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        currentEmail = null;
        localStorage.removeItem('powerdev_user');
        location.reload();
    }
}

// ========================
// 🎯 SECTION NAVIGATION
// ========================

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update navbar active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load section data
    if (sectionId === 'goals') loadGoals();
    if (sectionId === 'habits') loadHabits();
    if (sectionId === 'stats') loadStats();
    if (sectionId === 'mastermind') loadMastermind();
    if (sectionId === 'wins') loadWins();
}

function showApp() {
    document.getElementById('login-section').classList.remove('active');
    document.getElementById('app-container').classList.add('active');
    document.getElementById('username').textContent = currentUser.name;
    showSection('dashboard');
}

// ========================
// 📊 DASHBOARD
// ========================

function loadDashboard() {
    fetch(`${API_BASE}/get_dashboard/${currentEmail}`)
    .then(res => res.json())
    .then(data => {
        if (data.user) {
            updatePowerDisplay(data.stats);
        }
        displayRecentWins(data.wins);
        displayActiveGoals(data.goals);
    })
    .catch(err => console.error('Dashboard Load Error:', err));
}

function updatePowerDisplay(stats) {
    if (!stats) return;

    const overall = stats.overall || 0;
    document.getElementById('power-fill').style.width = overall + '%';
    document.getElementById('power-number').textContent = overall;

    // Update dimension sliders
    document.getElementById('health-slider').value = stats.health || 0;
    document.getElementById('wealth-slider').value = stats.wealth || 0;
    document.getElementById('power-slider').value = stats.power || 0;
    document.getElementById('influence-slider').value = stats.influence || 0;
    document.getElementById('skills-slider').value = stats.skills || 0;
    document.getElementById('relationships-slider').value = stats.relationships || 0;

    updateSliderValues();
}

function updateSliderValues() {
    document.getElementById('health-value').textContent = document.getElementById('health-slider').value;
    document.getElementById('wealth-value').textContent = document.getElementById('wealth-slider').value;
    document.getElementById('power-value').textContent = document.getElementById('power-slider').value;
    document.getElementById('influence-value').textContent = document.getElementById('influence-slider').value;
    document.getElementById('skills-value').textContent = document.getElementById('skills-slider').value;
    document.getElementById('relationships-value').textContent = document.getElementById('relationships-slider').value;

    updateStatsDisplay();
}

function updateStatsDisplay() {
    const h = parseInt(document.getElementById('health-slider').value);
    const w = parseInt(document.getElementById('wealth-slider').value);
    const p = parseInt(document.getElementById('power-slider').value);
    const i = parseInt(document.getElementById('influence-slider').value);
    const s = parseInt(document.getElementById('skills-slider').value);
    const r = parseInt(document.getElementById('relationships-slider').value);

    document.getElementById('stat-health').style.width = h + '%';
    document.getElementById('stat-health-value').textContent = h + '%';
    document.getElementById('stat-wealth').style.width = w + '%';
    document.getElementById('stat-wealth-value').textContent = w + '%';
    document.getElementById('stat-power').style.width = p + '%';
    document.getElementById('stat-power-value').textContent = p + '%';
    document.getElementById('stat-influence').style.width = i + '%';
    document.getElementById('stat-influence-value').textContent = i + '%';
    document.getElementById('stat-skills').style.width = s + '%';
    document.getElementById('stat-skills-value').textContent = s + '%';
    document.getElementById('stat-relationships').style.width = r + '%';
    document.getElementById('stat-relationships-value').textContent = r + '%';
}

function updatePowerStats() {
    const h = parseInt(document.getElementById('health-slider').value);
    const w = parseInt(document.getElementById('wealth-slider').value);
    const p = parseInt(document.getElementById('power-slider').value);
    const i = parseInt(document.getElementById('influence-slider').value);
    const s = parseInt(document.getElementById('skills-slider').value);
    const r = parseInt(document.getElementById('relationships-slider').value);

    updateSliderValues();

    fetch(`${API_BASE}/update_power_stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: currentEmail,
            health: h,
            wealth: w,
            power: p,
            influence: i,
            skills: s,
            relationships: r
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Power Stats Updated:', data);
    })
    .catch(err => console.error('Update Error:', err));
}

function displayRecentWins(wins) {
    const container = document.getElementById('recent-wins');
    container.innerHTML = '';
    
    if (!wins || wins.length === 0) {
        container.innerHTML = '<p class="text-center">No victories recorded yet. Start winning! 🏆</p>';
        return;
    }

    wins.slice(0, 3).forEach(win => {
        const winEl = document.createElement('div');
        winEl.className = 'list-item';
        winEl.innerHTML = `
            <h4>🏆 ${win.title}</h4>
            <p>${win.description}</p>
            <div class="list-item-meta">
                <span>${win.category}</span>
                <span>${win.date}</span>
            </div>
        `;
        container.appendChild(winEl);
    });
}

function displayActiveGoals(goals) {
    const container = document.getElementById('active-goals');
    container.innerHTML = '';
    
    if (!goals || goals.length === 0) {
        container.innerHTML = '<p class="text-center">No goals set yet. Define your destiny! 🎯</p>';
        return;
    }

    goals.slice(0, 3).forEach(goal => {
        const goalEl = document.createElement('div');
        goalEl.className = 'list-item';
        goalEl.innerHTML = `
            <h4>${goal.title}</h4>
            <p>${goal.category} • ${goal.timeline}</p>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin: 0.5rem 0;">
                <div style="width: ${goal.progress}%; height: 100%; background: linear-gradient(90deg, #ff6b35, #ff8c5a);"></div>
            </div>
            <div class="list-item-meta">
                <span>Progress: ${goal.progress}%</span>
                <span>Importance: ${goal.importance}/10</span>
            </div>
        `;
        container.appendChild(goalEl);
    });
}

// ========================
// 🎯 GOALS MANAGEMENT
// ========================

function createGoal() {
    const title = document.getElementById('goal-title').value;
    const category = document.getElementById('goal-category').value;
    const timeline = document.getElementById('goal-timeline').value;
    const importance = document.getElementById('goal-importance').value;

    if (!title || !category || !timeline || !importance) {
        alert('Please fill all fields!');
        return;
    }

    fetch(`${API_BASE}/create_goal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: currentEmail,
            title,
            category,
            timeline,
            importance: parseInt(importance),
            milestones: []
        })
    })
    .then(res => res.json())
    .then(data => {
        alert('🎯 Goal Created! Start crushing it!');
        document.getElementById('goal-title').value = '';
        document.getElementById('goal-category').value = '';
        document.getElementById('goal-timeline').value = '';
        document.getElementById('goal-importance').value = '';
        loadGoals();
    })
    .catch(err => console.error('Goal Creation Error:', err));
}

function loadGoals() {
    fetch(`${API_BASE}/get_goals/${currentEmail}`)
    .then(res => res.json())
    .then(goals => {
        const container = document.getElementById('goals-list');
        container.innerHTML = '';

        if (!goals || goals.length === 0) {
            container.innerHTML = '<p class="text-center">No goals yet. Set your first goal now! 🚀</p>';
            return;
        }

        goals.forEach(goal => {
            const goalEl = document.createElement('div');
            goalEl.className = 'list-item';
            goalEl.innerHTML = `
                <h4>${goal.title}</h4>
                <p>${goal.category} • ${goal.timeline}</p>
                <div style="display: flex; gap: 1rem; align-items: center; margin: 0.5rem 0;">
                    <input type="range" min="0" max="100" value="${goal.progress}" class="slider" style="flex: 1;" onchange="updateGoal('${goal._id}', this.value)">
                    <span style="color: var(--accent); font-weight: 700;">${goal.progress}%</span>
                </div>
                <div class="list-item-meta">
                    <span>Importance: ${goal.importance}/10</span>
                    <span>${goal.status}</span>
                </div>
            `;
            container.appendChild(goalEl);
        });
    })
    .catch(err => console.error('Goals Load Error:', err));
}

function updateGoal(goalId, progress) {
    fetch(`${API_BASE}/update_goal_progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            goal_id: goalId,
            progress: parseInt(progress)
        })
    })
    .then(res => res.json())
    .then(data => console.log('Goal Updated:', data))
    .catch(err => console.error('Update Error:', err));
}

// ========================
// 🔥 HABITS MANAGEMENT
// ========================

function createHabit() {
    const name = document.getElementById('habit-name').value;
    const category = document.getElementById('habit-category').value;

    if (!name || !category) {
        alert('Please fill all fields!');
        return;
    }

    fetch(`${API_BASE}/create_habit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: currentEmail,
            name,
            category,
            power_points: 10
        })
    })
    .then(res => res.json())
    .then(data => {
        alert('🔥 Habit Created! Build the streak!');
        document.getElementById('habit-name').value = '';
        document.getElementById('habit-category').value = '';
        loadHabits();
    })
    .catch(err => console.error('Habit Creation Error:', err));
}

function loadHabits() {
    fetch(`${API_BASE}/get_habits/${currentEmail}`)
    .then(res => res.json())
    .then(habits => {
        const container = document.getElementById('habits-list');
        container.innerHTML = '';

        if (!habits || habits.length === 0) {
            container.innerHTML = '<p class="text-center">No habits yet. Start building daily power! 💪</p>';
            return;
        }

        habits.forEach(habit => {
            const habitEl = document.createElement('div');
            habitEl.className = 'list-item';
            const isCompletedToday = habit.completed_dates.includes(new Date().toISOString().split('T')[0]);
            habitEl.innerHTML = `
                <h4>${habit.name}</h4>
                <p>${habit.category}</p>
                <div class="list-item-meta">
                    <span>🔥 Streak: ${habit.streak} days</span>
                    <button class="action-btn" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="completeHabit('${habit._id}')" ${isCompletedToday ? 'disabled' : ''}>
                        ${isCompletedToday ? '✅ Done Today' : '✅ Complete'}
                    </button>
                </div>
            `;
            container.appendChild(habitEl);
        });
    })
    .catch(err => console.error('Habits Load Error:', err));
}

function completeHabit(habitId) {
    fetch(`${API_BASE}/complete_habit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habit_id: habitId })
    })
    .then(res => res.json())
    .then(data => {
        alert(`🔥 Habit Completed! Streak: ${data.streak}`);
        loadHabits();
    })
    .catch(err => console.error('Habit Completion Error:', err));
}

// ========================
// 📈 STATS
// ========================

function loadStats() {
    fetch(`${API_BASE}/get_power_stats/${currentEmail}`)
    .then(res => res.json())
    .then(stats => {
        updatePowerDisplay(stats);
    })
    .catch(err => console.error('Stats Load Error:', err));
}

// ========================
// 🧠 MASTERMIND
// ========================

function saveMastermind() {
    const title = document.getElementById('mastermind-title').value;
    const category = document.getElementById('mastermind-category').value;
    const content = document.getElementById('mastermind-content').value;

    if (!title || !category || !content) {
        alert('Please fill all fields!');
        return;
    }

    fetch(`${API_BASE}/add_mastermind`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, title, category, content })
    })
    .then(res => res.json())
    .then(data => {
        alert('💡 Insight Saved to Your Mastermind!');
        document.getElementById('mastermind-title').value = '';
        document.getElementById('mastermind-category').value = '';
        document.getElementById('mastermind-content').value = '';
        loadMastermind();
    })
    .catch(err => console.error('Mastermind Save Error:', err));
}

function loadMastermind() {
    fetch(`${API_BASE}/get_mastermind/${currentEmail}`)
    .then(res => res.json())
    .then(notes => {
        const container = document.getElementById('mastermind-list');
        container.innerHTML = '';

        if (!notes || notes.length === 0) {
            container.innerHTML = '<p class="text-center">No insights yet. Start capturing wisdom! 🧠</p>';
            return;
        }

        notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = 'list-item';
            noteEl.innerHTML = `
                <h4>${note.title}</h4>
                <p>${note.content}</p>
                <div class="list-item-meta">
                    <span>${note.category}</span>
                    <span>${note.date}</span>
                </div>
            `;
            container.appendChild(noteEl);
        });
    })
    .catch(err => console.error('Mastermind Load Error:', err));
}

// ========================
// 🏆 WINS
// ========================

function recordWin() {
    const title = document.getElementById('win-title').value;
    const category = document.getElementById('win-category').value;
    const description = document.getElementById('win-description').value;

    if (!title || !category || !description) {
        alert('Please fill all fields!');
        return;
    }

    fetch(`${API_BASE}/record_win`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, title, category, description })
    })
    .then(res => res.json())
    .then(data => {
        alert('🏆 Victory Recorded! You Are Unstoppable!');
        document.getElementById('win-title').value = '';
        document.getElementById('win-category').value = '';
        document.getElementById('win-description').value = '';
        loadWins();
        loadDashboard();
    })
    .catch(err => console.error('Win Recording Error:', err));
}

function loadWins() {
    fetch(`${API_BASE}/get_wins/${currentEmail}`)
    .then(res => res.json())
    .then(wins => {
        const container = document.getElementById('wins-list');
        container.innerHTML = '';

        if (!wins || wins.length === 0) {
            container.innerHTML = '<p class="text-center">No victories yet. Go achieve something! 🚀</p>';
            return;
        }

        wins.forEach(win => {
            const winEl = document.createElement('div');
            winEl.className = 'list-item';
            winEl.innerHTML = `
                <h4>🏆 ${win.title}</h4>
                <p>${win.description}</p>
                <div class="list-item-meta">
                    <span>${win.category}</span>
                    <span>${win.date}</span>
                </div>
            `;
            container.appendChild(winEl);
        });
    })
    .catch(err => console.error('Wins Load Error:', err));
}

// ========================
// 🔄 TAB SWITCHING
// ========================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// ========================
// 🚀 INITIALIZATION
// ========================

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('powerdev_user');
    if (savedUser) {
        document.getElementById('login-email').value = savedUser;
        loginUser();
    }
});
