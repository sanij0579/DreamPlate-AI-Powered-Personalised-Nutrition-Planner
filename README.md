🍽️ DreamPlate – AI-Powered Personalised Nutrition Planner

Smart diet planning using AI + Django REST + React Native + Firebase

DreamPlate is an intelligent nutrition planner that provides personalised meal plans, healthy recommendations, and real-time nutrition tracking based on user preferences, goals, and lifestyle. Designed for students, professionals, and hostel residents who want to eat healthier without thinking too much.

⸻

🚀 Overview

Most people struggle with maintaining a balanced diet due to:
	•	Lack of personalised recommendations
	•	No knowledge of nutritional values
	•	Busy schedule or hostel mess food dependency
	•	Difficulty tracking day-to-day nutrients

DreamPlate solves this using AI-driven recommendations, adaptive meal planning, and smart nutrition insights.

⸻

🧠 Key Features

🔹 1. AI-Driven Personalised Diet Plans
	•	Meal plans tailored to user profile, BMI, goals, allergies, and activity level
	•	Adapts over time using ML-based preference learning

🔹 2. Django REST + React Native Integration
	•	Real-time nutrition tracking
	•	Smooth communication between backend & app

🔹 3. Smart Shopping List

Automatically generates a grocery list based on:
	•	Weekly diet plan
	•	Pantry items
	•	Budget optimization

🔹 4. Hostel Mess Menu Integration
	•	Users living in hostels can sync mess food
	•	App auto-adjusts their meals for balanced portions

🔹 5. Health Insights Dashboard
	•	Track calories, protein, carbs, fats
	•	Daily and weekly insights
	•	Suggests healthier alternatives

🔹 6. Firebase Integration
	•	Real-time sync
	•	Secure auth & user data backup

⸻

🏗️ Architecture

User → React Native App → Django REST API → ML Engine → Firebase Sync → Nutrition DB

Frontend (React Native)
	•	User onboarding
	•	Meal plans & shopping list
	•	Nutrition dashboard

Backend (Django REST Framework)
	•	Diet plan generation
	•	User profile logic
	•	Ingredients database
	•	Authentication

AI/ML Layer
	•	Smart meal recommendations
	•	Adaptive preference learning
	•	Calorie & macro optimization

Firebase
	•	Realtime sync
	•	Notifications

⸻

🔧 Tech Stack
	•	Backend: Django REST Framework
	•	Frontend: React Native
	•	Database: PostgreSQL / SQLite
	•	Cloud: Firebase Authentication & Realtime DB
	•	AI/ML: Python, Pandas, Scikit-Learn
	•	APIs: Nutrition API / Custom DB

⸻

📸 Screenshots

Add screenshots after uploading.

⸻

🛠️ Installation

📌 Clone Project

git clone <repo-url>
cd DreamPlate

📌 Backend Setup (Django)

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

📌 Mobile App Setup (React Native)

cd mobile-app
npm install
npm start

📌 Firebase Setup
	•	Add Firebase config inside app
	•	Enable Authentication
	•	Enable Realtime DB / Cloud Firestore

⸻

📊 Highlights & Impact
	•	Personalised nutrition → Better health outcomes
	•	Balanced calorie intake through adaptive suggestions
	•	Helps hostel students maintain a nutritious diet
	•	Smart shopping list saves time & reduces waste
	•	AI-driven portion control improves long-term habits

⸻

🔭 Future Enhancements
	•	AI chatbot nutrition assistant
	•	Integration with smartwatches
	•	Water intake & sleep tracking
	•	Voice-based meal logging
	•	Multi-language support

⸻

🤝 Contribution

PRs, issues, and feature ideas are welcome.

⸻

📝 License

MIT License

⸻

🎯 Goal

To make personalised nutrition accessible, simple, and achievable for everyone — one meal at a time.
