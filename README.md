🧠 BrainBolt — Smart Flashcard Learning Platform

An intelligent flashcard web app that helps users learn faster using AI-generated study questions.
Built with Django, PostgreSQL, and a clean HTML/CSS/JS frontend — powered by Google Gemini AI for interactive study assistance.

🚀 Features

✅ User Dashboard – View topics, progress, and flashcards in a modern responsive interface

✅ Create & Manage Flashcards – Add, edit, and delete cards easily by topic

✅ AI Study Assistant – Generates practice questions using Gemini AI

✅ Quiz Mode – Test yourself by topic and track mastery

✅ PostgreSQL Database – Reliable, scalable data storage

✅ Responsive UI – Built with modern CSS and JS for a smooth user experience


🧩 Tech Stack

-Layer	Technologies Used

-Frontend	HTML5, CSS3

-JavaScript (Vanilla)

-Backend	Django 5+, Python 3.12

-Database	PostgreSQL hosted on Neon

-AI Integration	Google Gemini API (via google-generativeai)

-Version Control	Git & GitHub

-Deployment -	Render 

-Others	CSRF protection, JSON APIs, Modular views


🧠 AI Integration — “Study Assistant”


The AI Assistant uses Google Gemini (models/gemini-2.5-flash) to suggest short, clear study questions for any topic entered by the user.

Flow:

User enters a topic (e.g., “Python loops”)


The frontend sends a request to /ai-generate/


Django view calls Gemini API and returns generated questions


The dashboard displays a list of suggested questions dynamically


⚙️ Setup & Installation

1️⃣ Clone the Repository
git clone https://github.com/<your-username>/brainbolt.git
cd brainbolt

2️⃣ Create and Activate Virtual Environment
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Configure Environment Variables

Create a .env file or update your settings.py with:

SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=postgres://<user>:<password>@localhost:5432/brainbolt
GEMINI_API_KEY=your_google_gemini_api_key

5️⃣ Apply Migrations
python manage.py migrate

6️⃣ Run the Server
python manage.py runserver


Then visit 👉 http://127.0.0.1:8000

🧰 API Endpoints
Endpoint	Method	Description
/api/flashcards/	GET	Fetch all flashcards
/api/flashcards/<id>/	GET	Retrieve a specific flashcard
/ai-generate/	POST	Generate AI-powered study questions
/quiz/	GET	Start a quiz by topic

Example body for /ai-generate/:

{
  "topic": "Machine Learning"
}

🧑‍💻 Folder Structure

flashcardproject/

│
├── flashcardproject/    

│   ├── templates/

│   │   └── dashboard.html and others

│   ├── static/js/

│   │   └── dashboard.js

│   ├── views.py

│   ├── models.py

│   └── urls.py

├── manage.py


🌍 Deployment Notes

Use Render

Set your environment variables in the dashboard before deploying.

For PostgreSQL i used Neon DB.

🧑‍🎓 Learning Outcome

This project demonstrates:

Full-stack web development with Django & PostgreSQL

REST API integration

Secure form handling and CSRF management

Frontend-backend synchronization

AI-powered feature integration (Google Gemini)

Clean, modular code structure for scalability

🧑‍💼 About the Developer

👋 Hi, I’m Fadilah Abdulkadir
A passionate Backend Developer, Site Reliability Engineer and Cloud solutions Architect specializing in Python, Django, and modern API-driven web solutions.
I love building tools that blend data, automation, monitoring, intelligence and ensuring reliability, security and scalability.

📫 Reach me at: [fadeelzy@gmail.com or connect with me linkedin.com/in/fadilah-abdulkadir-378a47269]
💻 Portfolio: []

⭐ If You Liked This Project...

Give it a ⭐ on GitHub and share your feedback!

"Learning smarter with AI — one flashcard at a time." 🧠
