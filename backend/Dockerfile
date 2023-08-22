FROM python:3.11.4-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /opt/

# Copy dependency definitions
COPY requirements.txt /opt/requirements.txt

# Install dependecies and clean cache
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip cache purge

CMD ["/bin/bash"]
