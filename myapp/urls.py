from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('ai-generate/', views.ai_generate, name='ai_generate'),
    path('add_flashcard/', views.add_flashcard, name='add_flashcard'),
    path('quiz/', views.quiz, name='quiz')
]


