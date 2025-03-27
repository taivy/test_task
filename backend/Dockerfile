# Use official Python image
FROM python:3.12

# Set working directory
WORKDIR /app

# Install Poetry
RUN pip install poetry

# Copy project files
COPY pyproject.toml poetry.lock /app/

# Install dependencies
RUN poetry install --no-root

# Copy the application files
COPY . /app

# Expose port
EXPOSE 8000

# Run FastAPI server
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
