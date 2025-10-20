// Add-and-Edit functionality for BrainBolt (Django-integrated)
async function handleSubmit(e) {
  e.preventDefault();
 function getCSRFToken() {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const trimmed = cookie.trim();
    if (trimmed.startsWith(name + '=')) {
      return trimmed.substring(name.length + 1);
    }
  }
  return '';
 }
  if (isLoading) return;

  const topic = document.getElementById('topic').value.trim();
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();

  if (!topic || !question || !answer) {
    Toast.error('Missing Information', 'Please fill in all fields before saving.');
    return;
  }

  isLoading = true;
  const saveBtn = document.getElementById('save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  const payload = { topic, question, answer };

  try {
    const url = isEdit ? `/update-flashcard/${editId}/` : '/add-flashcard/';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCSRFToken() },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      Toast.success(isEdit ? 'Flashcard Updated!' : 'Flashcard Created!', 'Saved successfully.');
      setTimeout(() => navigateTo('/'), 1000);
    } else {
      Toast.error('Error', 'Something went wrong. Please try again.');
    }
  } catch (error) {
    Toast.error('Error', 'Network or server error.');
  } finally {
    isLoading = false;
    saveBtn.disabled = false;
    saveBtn.textContent = isEdit ? 'Update Card' : 'Create Card';
  }
}
