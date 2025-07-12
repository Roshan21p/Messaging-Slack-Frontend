# Messaging-Slack Frontend

**Messaging-Slack** is a real-time team communication platform inspired by Slack. It enables users to collaborate through channels and direct messages with support for media, typing indicators, real-time notifications, and role-based access.

This is the **frontend** of the application, built with **React**, **Tailwind CSS**, **Socket.IO**, and **React Context API** for state management.
 It connects to the backend API and provides an interactive, responsive UI for users to chat and collaborate in workspaces.

🔗 **Live Demo (Frontend on Vercel)**: [https://messaging-slack.vercel.app](https://messaging-slack-frontend.vercel.app)  
🔗 **Backend Repository**: [https://github.com/Roshan21p/messaging-slack-backend](https://github.com/Roshan21p/Messaging-Slack-Backend)

**First-time setup:** Connect the backend manually if it hasn't started yet:  
[https://messaging-slack-backend.onrender.com/connect-db](https://messaging-slack-backend.onrender.com/connect-db)
> ⚠️ Backend may take 40–50 seconds to wake up if hosted on Render.
---

##  Features

- User registration and login (JWT-based)
- Role-based access control (Admin/Member)
- Real-time messaging using Socket.IO
- Typing indicators in channels and DMs
- Track online users’ presence
- Unread message counts per channel/DM
- Workspace creation and member invitations
- Email notifications using a message queue system (e.g., Bull + Redis)
- Channel and Direct Messaging support
- Media upload support via Cloudinary
- Toast notifications and error handling
- Responsive UI for all screen sizes
- State management using React Context API and Custom Hooks (for auth and UI state) and React Query (for API data caching and fetching)
---

## 🛠️ Technologies Used

- **React.js**
- **Tailwind CSS**
- **shadcn/ui** (component library)
- **Socket.IO (Client)**
- **React Router DOM**
- **Axios**
-  **Quill Editor** (rich text editor for chat input)
- **Cloudinary**
- **@tanstack/react-query (React Query)**

---

## 🌐 Deployment

### ✅ Frontend

Deployed on **Vercel**  
🔗 [Live Site](https://messaging-slack-frontend.vercel.app)

### ✅ Backend

Deployed on **Render**  
🔗 [Backend API](https://messaging-slack-backend.onrender.com/connect-db)

---

## 💻 How to Run Locally

#  Frontend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/Messaging-Slack-Frontend.git
cd Messaging-Slack-Frontend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm run dev
```
### 4 Frontend .env
 Create a .env file in the root of Messaging-Slack-Frontend
```bash
VITE_BACKEND_API_URL=http://localhost:3000/api/v1
# Or for production:
VITE_BACKEND_API_URL=https://messaging-slack-backend.onrender.com/api/v1

VITE_BACKEND_SOCKET_URL=http://localhost:3000
# Or for production:
VITE_BACKEND_SOCKET_URL=https://messaging-slack-backend.onrender.com

CLOUDINARY_CLOUD_NAME=your_cloudinary_name

CLOUDINARY_API_KEY=your_api_key
```

---
# Backend SetUp
### 1. Clone the repository

```bash
git clone https://github.com/Roshan21p/Messaging-Slack-Backend.git
cd Messaging-Slack-Backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. To run the project, use the following command
```bash
npm start
```
### 4 Backend .env
Create a .env file in the root of Messaging-Slack-Backend
```bash
PORT=3000
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000/api/v1

# Add your actual credentials below:
DEV_DB_URL=mongodb+srv://<your-mongo-credentials>.oqsvz.mongodb.net/slack?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=your_jwt_secret
JWT_EXPIRY=expiry_time

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

REDIS_PORT=6379
REDIS_HOST=localhost || 127.0.0.1

MAIL_ID=your_email
MAIL_PASSWORD=your_email_password
```
---

## 📸 Screenshots

### Home_page
![landing_page](https://github.com/user-attachments/assets/ddc568b8-0593-47e0-b729-27f9665f4144)

### SignUp_page
![signup](https://github.com/user-attachments/assets/d532978d-7f92-4667-bfa4-61538d831104)

### Login_page
![signin](https://github.com/user-attachments/assets/6bff3c43-e828-4dbd-956a-c44e8dd9f0b8)

### Profile_page
![profile](https://github.com/user-attachments/assets/7d18f470-5b0d-4b5f-b9bf-1bcad490a876)

### WorkspaceLayout
![Workspace_Layout](https://github.com/user-attachments/assets/eb659feb-51b5-476d-9f48-904f13975c64)

### ChannelChatView
![channel_message](https://github.com/user-attachments/assets/82f58822-3154-4143-9cf7-c70c88d54340)

### DirectMessageLayout
![DirectMessage_chat](https://github.com/user-attachments/assets/2ef0e890-a9ad-465d-9d11-fc4aa2c1fcee)

### DirectChatView
![DirectMessage_chat](https://github.com/user-attachments/assets/5f24a6fc-2d30-4f4a-b863-594065c363ad)

### LeaveWorkspaceModal 
![userLeaveWorkspace](https://github.com/user-attachments/assets/af4ff36f-666d-4921-a404-a05c1f6c7bb3)
![confirmationOfleaveWorkspace](https://github.com/user-attachments/assets/208b08af-9346-4d2e-b729-15b38dc7b393)

## Admin Section

### WorkspacePanelHeader
![WorkspacePanelHeader](https://github.com/user-attachments/assets/abfae1d3-3ac6-4ec2-9a90-e6bd96a52aeb)

### InvitePeopleToWorkspace
![InvitePeopleToWorkspace](https://github.com/user-attachments/assets/8a1bc388-39d9-44da-8df3-ea434701d06a)

### RemoveMemberFromWorkspace
![removeMemberFromWorkspace](https://github.com/user-attachments/assets/cae5e5f5-5917-4d65-aa5d-4de62028ecf3)

### CreateChannelModal
![CreateChannel](https://github.com/user-attachments/assets/d9362863-7c8a-47b3-b4d7-d975f9f06eb3)

### EditChannelModal / DeleteChannelModal
![EditAndDeleteChannel](https://github.com/user-attachments/assets/01b14264-a656-47e8-ba2c-41107e820d0a)

### AddMemberToWorkspace 
![AddedMemberToWorkspace](https://github.com/user-attachments/assets/86498c21-68b5-4042-b8f6-ad302e8c84d0)

### DeleteWorkspaceModal
![DeleteWorkspace](https://github.com/user-attachments/assets/aaf6585f-9221-4bd7-85f3-d81c87c0ca11)
![confirmationOfDeleteWorkspace](https://github.com/user-attachments/assets/3da2492a-7d34-493e-ace5-a70f702b2ac0)

---
ShadCN SetUp: [Link](https://ui.shadcn.com/docs/installation/vite)

Atom Design: [Link](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97)
