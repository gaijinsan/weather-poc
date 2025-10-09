FROM python:3.9-slim
WORKDIR /app
COPY ingest.py .
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["python", "ingest.py"]
