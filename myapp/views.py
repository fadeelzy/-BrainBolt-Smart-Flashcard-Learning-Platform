from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Flashcard
from django.conf import settings
import json
import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

# ===================== DASHBOARD VIEW =====================
def dashboard(request):
    # Group flashcards by topic
    flashcards = Flashcard.objects.all().order_by('topic', '-created_at')
    topics = {}
    for card in flashcards:
        topics.setdefault(card.topic, []).append(card)
    return render(request, 'dashboard.html', {'topics': topics})


# ===================== AI STUDY ASSISTANT ENDPOINT =====================
genai.configure(api_key=settings.GEMINI_API_KEY)

@csrf_exempt
def ai_generate(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            topic = data.get("topic")

            if not topic:
                return JsonResponse({"error": "Missing topic"}, status=400)

            # ✅ Use the confirmed working model
            model = genai.GenerativeModel("models/gemini-2.5-flash")

            # Create the prompt
            prompt = f"""
            Generate 5 helpful study questions about {topic}.
            Each question should be clear, short, and distinct.
            Example format:
            1. What is...
            2. How does...
            3. Why is...
            """

            # Generate content
            response = model.generate_content(prompt)

            ai_text = response.text.strip() if response and response.text else "No response from AI."

            # Return structured data for frontend
            return JsonResponse({"result": ai_text})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request"}, status=400)
    
# -------------------
# Add / Edit Flashcard Page
# -------------------
def add_flashcard(request):
    if request.method == "POST":
        topic = request.POST.get("topic")
        question = request.POST.get("question")
        answer = request.POST.get("answer")

        if not all([topic, question, answer]):
            messages.error(request, "Please fill in all fields.")
            return redirect("add_flashcard")

        flashcard_id = request.POST.get("flashcard_id")

        if flashcard_id:
            # Update existing flashcard
            flashcard = Flashcard.objects.get(id=flashcard_id)
            flashcard.topic = topic
            flashcard.question = question
            flashcard.answer = answer
            flashcard.save()
            messages.success(request, "Flashcard updated successfully!")
        else:
            # Create a new one
            Flashcard.objects.create(
                topic=topic,
                question=question,
                answer=answer
            )
            messages.success(request, "Flashcard created successfully!")

        return redirect("dashboard")

    return render(request, 'add-edit-flashcard.html')


# Quiz Page
# -------------------

def quiz(request):
    flashcards = list(Flashcard.objects.values('question', 'answer', 'topic'))
    context = {
        'flashcards_json': json.dumps(flashcards)
    }
    return render(request, 'quiz.html', context)