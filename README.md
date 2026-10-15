# Casa Barako - Basic Express Routing

## Run
    npm install
    npm start        # or: npm run dev (uses nodemon)

Open http://localhost:3000

## Routes
| Route | Response |
|---|---|
| GET / | public/index.html |
| GET /menu | public/menu.html |
| GET /about | public/about.html |
| GET /contact | public/contact.html |
| GET /api/menu | all drinks (JSON) |
| GET /api/menu?type=cold | filtered by query string |
| GET /api/menu/:id | one drink by route param, 404 JSON if missing |

Each page visit logs `Rendering <file>` in the terminal.
