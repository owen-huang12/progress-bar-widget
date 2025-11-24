# Progress Bar Backend

Spring Boot backend for the Progress Bar Widget application.

## Local Development

1. Make sure you have Java 17+ and Maven installed
2. Run the application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. The API will be available at `http://localhost:8080`

## API Endpoints

- `GET /api/progress/{id}` - Get progress for a specific bar ID
- `POST /api/progress/{id}` - Save progress for a specific bar ID
  - Body: `{ "percentage": 50 }`

## Deploy to Railway

1. Create a new project on Railway
2. Add PostgreSQL database from Railway marketplace
3. Connect your GitHub repository
4. Railway will auto-detect the Spring Boot app
5. Add environment variable if needed:
   - `SPRING_DATASOURCE_URL` pointing to your PostgreSQL database

For Railway deployment with PostgreSQL, update `application.properties` to use the PostgreSQL configuration.
