// Dashboard functionality for BrainBolt (Django-integrated)

let flashcards = [];
let topics = [];

// ==================== CSRF TOKEN HELPER ====================
function getCSRFToken() {
  let cookieValue = null;
  const name = 'csrftoken';
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// ==================== LOAD FLASHCARDS ====================
async function loadFlashcards() {
  try {
    const response = await fetch('/api/flashcards/');
    if (!response.ok) throw new Error('Failed to fetch flashcards');

    const data = await response.json();
    flashcards = data.flashcards;
    topics = [...new Set(flashcards.map(card => card.topic))];

    updateUI();
  } catch (error) {
    console.error('Error loading flashcards:', error);
    Toast?.error?.('Error', 'Unable to load flashcards from server.');
  }
}

function updateUI() {
  const emptyState = document.getElementById('empty-state');
  const topicsContainer = document.getElementById('topics-container');
  const quizBtn = document.getElementById('quiz-btn');

  if (!emptyState || !topicsContainer) return;

  if (topics.length === 0) {
    emptyState.classList.remove('hidden');
    topicsContainer.classList.add('hidden');
    quizBtn?.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    topicsContainer.classList.remove('hidden');
    quizBtn?.classList.remove('hidden');
    renderTopics();
  }
}

function getTopicCount(topic) {
  return flashcards.filter(card => card.topic === topic).length;
}

function renderTopics() {
  const topicsGrid = document.getElementById('topics-grid');
  if (!topicsGrid) return;

  topicsGrid.innerHTML = topics.map(topic => `
    <div class="card shadow-card hover-lift cursor-pointer">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <span class="card-title text-gradient">${topic}</span>
          <span class="badge">${getTopicCount(topic)} cards</span>
        </div>
        <p class="card-description">Master your ${topic.toLowerCase()} knowledge</p>
      </div>
      <div class="card-content">
        <div class="flex gap-2">
          <a href="/quiz?topic=${encodeURIComponent(topic)}" class="btn btn-outline btn-sm w-full">
            Quiz This Topic
          </a>
          <a href="/add_flashcard/?topic=${encodeURIComponent(topic)}" class="btn btn-secondary btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14m-7-7v14"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== AI STUDY ASSISTANT ====================
document.addEventListener('DOMContentLoaded', function() {
  loadFlashcards();

  const aiBtn = document.getElementById('ai-generate-btn');
  const aiInput = document.getElementById('ai-topic-input');
  const aiResponse = document.getElementById('ai-response');

  if (!aiBtn || !aiInput || !aiResponse) {
    console.warn("AI assistant elements missing in DOM");
    return;
  }

  aiBtn.addEventListener('click', async () => {
    const topic = aiInput.value.trim();
    if (!topic) {
      aiResponse.classList.remove('hidden');
      aiResponse.innerHTML = "<p class='text-red-500'>Please enter a topic to study.</p>";
      return;
    }

    aiResponse.classList.remove('hidden');
    aiResponse.innerHTML = "<p class='text-gray-500 italic'>Generating study questions...</p>";

    try {
      const csrfToken = getCSRFToken();

      const res = await fetch("/ai-generate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();

      if (data.result) {
        // Format AI text into question list
        const questions = data.result
          .split(/\n+/)
          .filter(q => q.trim())
          .map(q => `<li class="p-3 border-b border-gray-200">${q.replace(/^\d+[\).\s-]*/, "")}</li>`)
          .join("");

        aiResponse.innerHTML = `
          <div class="bg-white rounded-2xl shadow-card p-4 mt-4">
            <h3 class="text-lg font-semibold mb-2 text-gradient">Suggested Study Questions</h3>
            <ul class="divide-y divide-gray-100">${questions}</ul>
          </div>
        `;
      } else {
        aiResponse.innerHTML = `<p class='text-red-500'>${data.error || "Error occurred while generating questions."}</p>`;
      }
    } catch (err) {
      aiResponse.innerHTML = "<p class='text-red-500'>Failed to contact AI API.</p>";
      console.error(err);
    }
  });
});
