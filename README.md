# Real-Time Chat Application Monorepo

This monorepo contains the code for a Real-Time Chat Application, consisting of a Client using React.js, a Server written in Node.js, and a Shared folder for common utilities and types.

![Real-Time Chat Demo](./preview.gif)

## Project Structure

```
root/
├── client/
├── server/
└── shared/
```

### 1. Client

The `client/` directory contains the frontend of the Real-Time Chat Application. It is built using:

- **Vite**: Fast and more efficient build tool.
- **React**: Component-based user interface library.
- **TypeScript**: Static typing syntax for JavaScript.
- **TanStack Router**: Modern, typesafe and declarative routing solution.
- **Tailwind CSS**: Utility-first CSS library.
- **Socket.IO Client**: Real-time, bidirectional and event-based communicati
  on solution.

**Key Features:**

- Real-time messaging with modern and responsive user interface.
- Automatic user registration on first connection, assigning a unique userID and each user is connected to the global chat room.

### 2. Server

The `server/` directory contains the backend of the Real-Time Chat Application. It is built using:

- **TypeScript**: Static typing syntax for JavaScript.
- **Express**: Lightweight and flexible Node.js server framework.
- **Socket.io**: Real-time, bidirectional and event-based communication solution.

**Key Features:**

- Handles user connections, disconnections, and real-time messages.
- Integrated with the client by emitting socket events.

### 3. Shared

The `shared/` directory contains common utilities, types, and constants used across both the client and server. This includes:

- **TypeScript Types**: Shared types like the `Message` interfaces.
- **Socket Events**: Enumerations for Socket.io event names to ensure consistency across the application.

### Setup

To get started with the project:

1. Clone the repository.
2. Navigate to the `client/` and `server/` directories and run:

   ```bash
   npm install
   ```

3. Start the development servers for both the client and server by running:

   ```bash
   npm run dev
   ```
