FROM python:3.11.4-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /backend
WORKDIR /backend
COPY . /backend

RUN pip install --upgrade pip && pip install -r requirements.txt

RUN rm -rf /root/.cache/ && pip cache purge

CMD ["/bin/bash"]
