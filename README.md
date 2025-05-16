
![](https://eldorado.io/static/f4ed8a521b10baed657858830cac133c/ee604/logo.png) 
# El Dorado - Item CRUD API
> Senior Developer Technical Challenge · Built with TypeScript, Hapi.js, SQLite, and Prisma  
> By [Angel Morante](https://www.linkedin.com/in/theangelmorante/) · [bento.me](https://bento.me/angel-morante) · [Website](https://angel-morante.vercel.app/)


## 📝 Description

This project implements a production-ready REST API to manage **Items**, as requested in the Level 3 Backend Interview challenge for El Dorado.  
The API is modular, fully tested, documented, and ready to run in a containerized or local environment.

## ⚙️ Technologies Used

| Tool / Library       | Reason                                                                 |
|----------------------|------------------------------------------------------------------------|
| **TypeScript**        | Static typing, clarity, safety                                          |
| **Hapi.js**           | Required by the E2E tests; flexible request lifecycle, robust validation |
| **SQLite**            | Lightweight, file-based persistence; fast and reliable for dev/testing  |
| **Prisma ORM**        | Elegant, type-safe database client for modern DB access                 |
| **Joi**               | Powerful request validation for payloads and params                    |
| **Swagger (hapi-swagger)** | Clear, interactive API documentation                                     |
| **ts-node**           | Run TypeScript directly without a build step                           |
| **Jest**              | E2E and unit test runner                                                |

---
## 📮 API Endpoints

| Method | Path           | Description                      | Validation           |
|--------|----------------|----------------------------------|----------------------|
| GET    | `/items`       | Get all items                    | –                    |
| GET    | `/items/{id}`  | Get a single item by ID          | ✅ `id` param         |
| POST   | `/items`       | Create a new item                | ✅ `name`, `price`    |
| PUT    | `/items/{id}`  | Update an existing item by ID    | ✅ `id`, body         |
| DELETE | `/items/{id}`  | Delete an item by ID             | ✅ `id` param         |

> All validation errors follow this structure:
> ```json
> {
>   "errors": [
>     {
>       "field": "price",
>       "message": "Field \"price\" is required"
>     }
>   ]
> }
> ```

#### API Documentation -> [/documentation](http://localhost:4000/documentation)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
You can will find the values env var inside .env.example file.

```
DATABASE_URL="file:./dev.db"
CORS_ORIGINS="*"
PORT="4000"
HOST="0.0.0.0"`
```


## 🧪 How to Run and Test This Project

🚀 1 **Clone the Project in your local machine and enter the project folder**


⚙️ 1.1 **Prerequisites**
Ensure you have the following installed:

[Docker](https://www.docker.com/)

[Visual Studio Code](https://code.visualstudio.com/)

[Dev containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

⚙️ 2. Install Dependencies

    yarn install 
o   npm install

⚙️ 3. Open the Project in DevContainer
Open VS Code.

Run the command:
Dev Containers: Reopen in Container from the command palette (⇧⌘P / Ctrl+Shift+P).

VS Code will build the Docker image and install all dependencies inside the container automatically.

🧱 4. Set Up the Database (SQLite)
After the container is ready, run the following command in the terminal:

```
yarn prisma:generate
yarn prisma:migrate
```

o

```
npm run prisma:generate
npm run prisma:migrate
```

▶️ 5. Start the Server
Now, you can start the API server:
```yarn start```
o ```npm run start```

The API will be available at:
```http://localhost:4000```

🌐 6. Access the Swagger Documentation
You can explore and test all endpoints interactively via Swagger UI:
```http://localhost:4000/documentation```

🧪 7. Run the End-to-End Tests
To validate that your implementation passes all the required acceptance criteria:

```yarn test```
o ```npm run test```



🧪 8. Run the Unit Tests (Optional)
The project also includes isolated unit tests for internal logic:
```yarn test:unit```
o ```npm run test:unit```


📬 9. Test the API Using Postman (Optional)
Import the provided Postman collection file:
```el-dorado-items.postman_collection.json```
Use the predefined requests to test all CRUD operations.

## Criterials

---

## ✅ Acceptance Criteria Coverage

| Requirement                                                     | Status  |
|------------------------------------------------------------------|---------|
| API must perform CRUD on `Item` (id, name, price)               | ✅ Done  |
| Data must persist across service restarts                       | ✅ Done  |
| Must be implemented as a production-ready service               | ✅ Done  |
| Must pass all E2E tests                                         | ✅ Done  |
| Must be implemented in TypeScript                               | ✅ Done  |
| Must not modify the E2E test file                               | ✅ Done  |

<img width="665" alt="image" src="https://github.com/user-attachments/assets/8f6711c8-cf88-477f-89ff-46af7538973f" />

---
## To Test with Postman

📦 Postman Collection
A Postman collection file (el-dorado-items.postman_collection.json) is included to help you test all endpoints quickly.
## Important Decisions

🧠 Design Considerations
Code is fully modular and layered using hexagonal principles (domain, application, infrastructure, interface).

🏗️ Architectural Decisions
This project was designed following three core architectural principles to reflect a production-grade backend system:

- Hexagonal Architecture (Ports and Adapters)

- CQRS

- Modular Design

Intercepted validation errors in a custom onPreResponse middleware to match test expectations.

Used SQLite for fast setup, aligned with persistence requirements, but the structure is easily swappable with PostgreSQL.

### Very Important
**Since one of the criteria is that the e2e tests pass, one of them waits for an empty array to validate that the list of items is available, and then injects an item. To meet the persistence criterion and, in turn, the test criteria, the item database is only emptied when the environment is a test environment (NODE_ENV=test). This is not a practice that should be performed in production; it was done solely due to the nature of the test itself.**



## ✨ Author

Built with care and technical ownership by:

Angel Morante
Senior Full Stack Developer

🌐 [Web Site](https://angel-morante.vercel.app/)

🧰 [Bento](https://bento.me/angel-morante)

💼 [LinkedIn](https://www.linkedin.com/in/theangelmorante/)
