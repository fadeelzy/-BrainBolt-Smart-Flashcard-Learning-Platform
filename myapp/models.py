from django.db import models

# Create your models here.

class Flashcard(models.Model):
    topic = models.CharField(max_length=100)
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.topic} - {self.question[:30]}"
