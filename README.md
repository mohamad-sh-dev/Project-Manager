# Project Manager Node.js Application

## Overview

The Project Manager Node.js application is a robust project and team management system designed to streamline your workflow. This application allows you to efficiently manage projects, teams, and users, assigning tasks and projects to specific teams or individuals.

## Features

- **User Management:**
  - Add users to the system.
  - Assign users to specific teams.

- **Team Management:**
  - Create teams for better organization.
  - Add or remove users from teams.

- **Project Management:**
  - Create and manage projects.
  - Assign projects to specific teams or users.

- **Task Assignment:**
  - Break down projects into tasks.
  - Assign tasks to teams or individual users.


## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/mohamad-sh-dev/project-manager.git
   cd project-manager
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file and configure the following variables:
     ```env
     PORT=3000
     DB_URI=mongodb://localhost:27017/projectmanager
     ```

4. **Start the Application:**
   ```bash
   npm start
   ```

   Your application should now be running at `http://localhost:3000`.

## Usage

1. **User Management:**
   - Navigate to the user management section to add and manage users.

2. **Team Management:**
   - Create teams and assign users to them.

3. **Project Management:**
   - Create projects and assign them to teams or individual users.

4. **Task Assignment:**
   - Break down projects into tasks and assign them accordingly.

5. **Permissions:**
   - Define roles and permissions in the admin panel.

6. **Logging:**
   - Check the logs to monitor user activity and changes.

## API Documentation (swagger)

Soon...

## Contributing

We welcome contributions! Follow the [Contribution Guidelines](CONTRIBUTING.md) to contribute to the development of this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---