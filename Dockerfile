# Use official Python image
FROM python:3.11

# Prevent Python from writing pyc files & turn off buffering
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies for psycopg2
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput || true

# Gunicorn command
CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn flashcardproject.wsgi:application --bind 0.0.0.0:$PORT"]
