FROM python:3.12-alpine
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache bash
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /code/
RUN adduser --disabled-password service-user

USER service-user