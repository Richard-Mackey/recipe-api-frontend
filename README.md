# Recipe Manager - Frontend

React frontend for the Recipe API, featuring user authentication, recipe management, and Spoonacular integration.

## Features

- **User Authentication**: Registration with validation (email regex, password confirmation) and JWT-based login
- **Recipe Management**: Create, edit, delete, and view personal recipes
- **Spoonacular Search**: Search external recipes via navbar and save to collection
- **Smart Filtering**: Filter by source (My Recipes/Spoonacular) and category (Breakfast/Lunch/Dinner/Dessert)
- **Pagination**: Navigate through recipe collections
- **Dynamic Categorization**: Auto-displays category images based on recipe type
- **Responsive Design**: Bootstrap styling with mobile-friendly navigation

## Tech Stack

- React 18
- React Router v6
- Bootstrap 5
- Context API (state management)
- Vite (build tool)

## Key Implementation Details

- **Context API**: `AuthContext` manages authentication state, `RecipeContext` handles recipe CRUD and Spoonacular integration
- **URL-based Search**: Search queries use URL parameters for shareable/bookmarkable results
- **Protected Routes**: Route guards redirect unauthenticated users to login
- **Event Handling**: Proper event bubbling control (`stopPropagation`) for nested clickable elements
- **Flexbox Layouts**: Equal-height recipe cards with fixed button positioning
- **Controlled Components**: All forms use controlled inputs with validation

## Running the Application

### Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:8082`

### Setup

```bash
git clone https://github.com/Richard-Mackey/recipe-frontend.git
cd recipe-frontend
npm install
npm run dev
```

Application runs on: `http://localhost:5173`

## Backend Repository

Spring Boot API: [Recipe API Backend](https://github.com/Richard-Mackey/recipe-api)

## Routes

| Route               | Component            | Description                              |
| ------------------- | -------------------- | ---------------------------------------- |
| `/`                 | LoginForm / HomePage | Login page or welcome (if authenticated) |
| `/register`         | RegisterForm         | User registration                        |
| `/recipes`          | RecipesPage          | Recipe list with filters and search      |
| `/recipes/create`   | CreateRecipePage     | Create new recipe form                   |
| `/recipes/edit/:id` | EditRecipePage       | Edit existing recipe                     |
| `/recipes/:id`      | RecipeDetailPage     | View recipe details                      |
| `/search`           | SpoonacularSearch    | Spoonacular search results               |

## Future Enhancements

- Recipe ratings and reviews
- Image upload for user recipes
- Meal planning calendar
- Recipe sharing between users
- Advanced search with multiple filters
- Offline support with service workers
