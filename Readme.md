# Event Finder Application

This is an API application for an Event Finder, allowing users to create, search, and attend events. The application is
developed using Django Rest Framework and utilizes PostgreSQL as the database. JWT tokens are used for authentication,
and the project is containerized with Docker.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1.Clone the repository:

```shell
git clone https://github.com/i3oi3ka/EventFinderApplication.git
```

2.Create a '.env' file in the project root and set the necessary environment variables:

```
SECRET_KEY=
DB_PASSWORD=
DB_NAME=
DB_USER=
DB_HOST=
DB_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

3.Build and run the Docker containers:

```shell
docker-compose up --build
```

4.Create a superuser:
```shell
docker-compose exec backend python manage.py createsuperuser
```
5.Access the API documentation at http://localhost:8000/swagger or http://localhost:8000/redoc for FastAPI.
## Project Structure
The project is organized into applications for better separation of concerns:

users: Manages user authentication and profiles.\
events: Handles event creation, retrieval, updating, and deletion.\
tickets: Manages ticket reservations and user ticket history.\
reviews: Deals with event reviews and ratings.\
notifications: Handles notifications for users.

## Database Structure
The database includes the following tables:

    Users
    Events
    Tickets
    Reviews
    Notifications
