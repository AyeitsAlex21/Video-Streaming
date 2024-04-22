# Dockerfile for Django backend

# Use an official Python runtime as a parent image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /app


COPY . /app/
RUN pip install -r requirements.txt


COPY . /app/


EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
