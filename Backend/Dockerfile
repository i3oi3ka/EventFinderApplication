FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1

# 1. Встановлюємо системні залежності
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    libfreetype6-dev \
    liblcms2-dev \
    libopenjp2-7-dev \
    libtiff-dev \
    libwebp-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    libxcb1-dev \
    tk-dev \
    tcl-dev \
    && rm -rf /var/lib/apt/lists/*

# 2. Створюємо користувача
RUN useradd -ms /bin/bash service-user

# 3. Створюємо робочу директорію
WORKDIR /code

# 4. Копіюємо залежності
COPY requirements.txt ./

# 5. Встановлюємо Python-пакети
RUN pip install --upgrade pip setuptools wheel \
 && pip install --no-cache-dir -r requirements.txt

# 6. Копіюємо весь проект
COPY . .

# 7. Виконуємо як звичайний користувач
USER service-user
