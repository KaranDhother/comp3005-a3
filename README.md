# Students CRUD App (PostgreSQL + Node.js)

A command-line app that connects to PostgreSQL and runs CRUD operations on a `students` table.

## Video Demonstration

[Watch the demo video](PASTE_VIDEO_LINK_HERE)

## Project Structure

```
.
├── database/
│   └── schema.sql      # Creates the students table and inserts the initial data
├── src/
│   ├── app.js          # Interactive menu that calls each function
│   ├── db.js           # PostgreSQL connection pool (reads settings from .env)
│   └── students.js     # getAllStudents, addStudent, updateStudentEmail, deleteStudent
├── .env.example        # Template for your database connection settings
├── package.json
└── README.md
```

## Requirements

- Node.js 18 or newer
- PostgreSQL (with pgAdmin to view changes)

## Setup

1. **Create the database.** In pgAdmin, right-click *Databases > Create > Database* and name it `school`.
   Or from a terminal:
   ```
   psql -U postgres -c "CREATE DATABASE school;"
   ```

2. **Create the table and load the initial data.** In pgAdmin, right-click `school` > *Query Tool*, paste the contents of `database/schema.sql`, and run it.
   Or from a terminal:
   ```
   psql -U postgres -d school -f database/schema.sql
   ```

3. **Install dependencies.** From the project root:
   ```
   npm install
   ```

4. **Set your connection details.** Copy `.env.example` to `.env` and put in your Postgres password:
   ```
   cp .env.example .env
   ```
   (On Windows: `copy .env.example .env`)

## Running the App

```
npm start
```

Pick an option from the menu:

| Option | Function | What it does |
|---|---|---|
| 1 | `getAllStudents()` | Shows every student in the table |
| 2 | `addStudent(first_name, last_name, email, enrollment_date)` | Inserts a new student |
| 3 | `updateStudentEmail(student_id, new_email)` | Changes a student's email |
| 4 | `deleteStudent(student_id)` | Removes a student |
| 5 | Exit | Closes the app |

After an add, update, or delete, refresh the `students` table in pgAdmin (*right-click students > View/Edit Data > All Rows*) to see the change.

Note: JavaScript doesn't need a compile step, so "compiling" here is just `npm install`.

## Resetting the Data

Re-run `database/schema.sql`. It drops and recreates the table with the original 3 students.
