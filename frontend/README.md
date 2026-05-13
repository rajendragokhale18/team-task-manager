# FlowState — AI Powered Team Task Manager

Modern AI-powered project and task management platform built using the MERN stack. Designed for teams that need intelligent task organization, real-time collaboration, and AI-assisted productivity.

---

## 🚀 Live Demo

**Frontend:** https://your-vercel-url.vercel.app  
**Backend API:** https://your-railway-url.up.railway.app  
**GitHub Repository:** https://github.com/your-username/team-task-manager

---

## ✨ Features

- **Authentication & Authorization** — JWT-based secure login/register
- **Role-Based Access Control** — Admin and user roles with specific permissions
- **Project Management** — Create and organize projects with teams
- **Task Management** — Full CRUD operations with drag-and-drop functionality
- **Task Status Workflow** — Todo → In Progress → Completed
- **AI Task Assistant** — Generate task ideas using OpenAI/OpenRouter integration
- **Task Priority & Scheduling** — Set priorities and due dates
- **Team Collaboration** — Add members and collaborate on projects
- **Analytics Dashboard** — View task statistics and progress
- **Search & Filter** — Find tasks quickly with advanced filters
- **Responsive Design** — Works seamlessly on desktop and mobile
- **Modern Tech Stack** — MERN (MongoDB, Express, React, Node.js)
- **Production-Ready Deployment** — Deploy to Vercel & Railway

---

## 🛠 Tech Stack

### Frontend
- **React.js** — UI library
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first CSS framework
- **React Router** — Client-side routing
- **Axios** — HTTP client for API calls

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT (jsonwebtoken)** — Secure authentication
- **OpenRouter API** — AI task generation

### Deployment
- **Vercel** — Frontend hosting
- **Railway** — Backend hosting
- **MongoDB Atlas** — Cloud database
- **Environment Variables** — Secure configuration

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v14+ 
- npm or yarn
- MongoDB Atlas account
- OpenRouter API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:8000`

---

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/flowstate
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENROUTER_API_KEY=your_openrouter_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=FlowState
```

---

## 📁 Project Structure

### Backend

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Login, register, JWT logic
│   ├── taskController.js     # Task CRUD operations
│   ├── projectController.js  # Project management
│   └── aiController.js       # AI task generation
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── roleMiddleware.js     # Role-based authorization
├── models/
│   ├── User.js               # User schema
│   ├── Task.js               # Task schema
│   └── Project.js            # Project schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   ├── taskRoutes.js         # Task endpoints
│   ├── projectRoutes.js      # Project endpoints
│   └── aiRoutes.js           # AI endpoints
├── server.js                 # Express app setup
└── package.json
```

### Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/               # Images, icons, fonts
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation component
│   │   ├── TaskBoard.jsx     # Kanban board
│   │   ├── TaskCard.jsx      # Individual task card
│   │   └── AITaskGenerator.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx    # Shared layout
│   ├── pages/
│   │   ├── HomePage.jsx      # Landing page
│   │   ├── LoginPage.jsx     # Login form
│   │   ├── RegisterPage.jsx  # Registration form
│   │   └── DashboardPage.jsx # Main workspace
│   ├── routes/
│   │   └── ProtectedRoute.jsx # Route guard
│   ├── services/
│   │   ├── authService.js    # Auth API calls
│   │   ├── taskService.js    # Task API calls
│   │   ├── projectService.js # Project API calls
│   │   └── aiService.js      # AI API calls
│   ├── App.jsx               # Main app component
│   └── main.jsx              # React entry point
├── vite.config.js
└── package.json
```

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` — Create new account
- `POST /api/auth/login` — User login
- `GET /api/auth/current-user` — Get authenticated user info

### Tasks
- `POST /api/tasks` — Create task
- `GET /api/tasks` — Get all user's tasks
- `GET /api/tasks/:id` — Get single task
- `PUT /api/tasks/:id` — Update task
- `DELETE /api/tasks/:id` — Delete task (admin only)
- `PUT /api/tasks/:id/status` — Update task status

### Projects
- `POST /api/projects` — Create project
- `GET /api/projects` — Get user's projects
- `GET /api/projects/:id` — Get project details
- `PUT /api/projects/:id` — Update project
- `DELETE /api/projects/:id` — Delete project

### AI
- `POST /api/ai/generate-tasks` — Generate AI task suggestions
  - Body: `{ prompt: "string" }`
  - Returns: Array of task ideas

---

## 🎯 Key Features Explained

### Authentication Flow
1. User registers with email and password
2. Password is hashed before storage
3. JWT token is generated and stored in localStorage
4. Token is sent with every request via Authorization header
5. Protected routes verify token before allowing access

### Task Management
- Tasks belong to projects
- Tasks have status: `todo`, `in-progress`, `completed`
- Tasks have priority: `low`, `medium`, `high`
- Only task owner can edit/delete their tasks
- Admin can delete any task

### AI Task Generation
1. User enters a prompt (e.g., "Help me plan a React project")
2. Backend sends prompt to OpenRouter API
3. AI generates task suggestions
4. User can select and save tasks
5. Tasks are created with AI-generated titles and descriptions

### Role-Based Access
- **User Role** — Create projects/tasks, manage their own items
- **Admin Role** — Delete any task, manage all projects

---

## 🚀 Deployment

### Deploy Backend to Railway

```bash
# 1. Create Railway project
# 2. Connect GitHub repository
# 3. Set environment variables in Railway dashboard
# 4. Deploy
```

### Deploy Frontend to Vercel

```bash
# 1. Push code to GitHub
# 2. Connect repo to Vercel
# 3. Set VITE_API_URL to your Railway backend URL
# 4. Deploy
```

---

## 📸 Screenshots

### Landing Page
> [Add screenshot of homepage]

### Dashboard
> [Add screenshot of task dashboard]

### Task Creation
> [Add screenshot of task form]

### AI Task Generator
> [Add screenshot of AI feature]

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register new user
- [ ] Login with credentials
- [ ] Create project
- [ ] Create task in project
- [ ] Move task between statuses
- [ ] Generate AI tasks
- [ ] Delete task (as admin)
- [ ] Logout
- [ ] Protected route redirects to login when no token

### API Testing with cURL

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create task
curl -X POST http://localhost:8000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Test","priority":"high"}'
```

---

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Check `VITE_API_URL` in frontend `.env`
- Verify backend is running on correct port
- Check CORS configuration in backend

### MongoDB connection error
- Verify MongoDB Atlas connection string in `MONGO_URI`
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

### AI generation not working
- Verify `OPENROUTER_API_KEY` is set
- Check OpenRouter account has credits
- Test API key with OpenRouter dashboard

### JWT token errors
- Clear localStorage and login again
- Verify `JWT_SECRET` is set in backend
- Check token hasn't expired

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose Guide](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT Authentication](https://jwt.io/)
- [OpenRouter API](https://openrouter.ai/)

---

## 🤝 Contributing

This is a personal project, but feel free to fork and improve!

---

## 📝 License

MIT License - feel free to use this project for learning and development.

---

## 👨‍💻 Author

Rajendra
Email: rajendragokhale2004@gmail.com
GitHub: https://github.com/rajendragokhale18


---

## 📞 Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Email me directly
- Check the troubleshooting section above

---

## 🎯 Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] Task comments and activity feed
- [ ] File attachments
- [ ] Recurring tasks
- [ ] Calendar view
- [ ] Mobile app
- [ ] Dark mode
- [ ] Advanced analytics
- [ ] Slack integration
- [ ] Email notifications

---

**Built with ❤️ using MERN Stack**

Built for modern teams & AI-native workflows.