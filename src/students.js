
// The four CRUD functions required 
// Every query uses parameters instead of string concatenation
// so user input can't break the SQL (prevents SQL injection).

const pool = require('./db');

// READ: get every row in the students table and print it as a table
async function getAllStudents() {
  const result = await pool.query('SELECT * FROM students ORDER BY student_id');

  // Formatted(easier to read)
  const rows = result.rows.map((s) => ({
    ...s,
    enrollment_date: s.enrollment_date
      ? s.enrollment_date.toLocaleDateString('en-CA')
      : null,
  }));

  console.table(rows);
  return rows;
}

// CREATE: insert a new student and print the new row 
async function addStudent(first_name, last_name, email, enrollment_date) {
  // Reject blank required fields 
  if (!first_name?.trim() || !last_name?.trim() || !email?.trim()) {
    throw new Error('First name, last name, and email are required.');
  }


  const result = await pool.query(
    `INSERT INTO students (first_name, last_name, email, enrollment_date)
     VALUES ($1, $2, $3, $4)
     RETURNING student_id`,
    [first_name, last_name, email, enrollment_date]
  );

  const id = result.rows[0].student_id;
  console.log(`Added student ${first_name} ${last_name} with id ${id}.`);
  return id;
}



// UPDATE: change the email of the student with the given id
async function updateStudentEmail(student_id, new_email) {
  // Reject a blank new email
  if (!new_email?.trim()) {
    throw new Error('New email cannot be empty.');
  }

  
  const result = await pool.query(
    'UPDATE students SET email = $1 WHERE student_id = $2',
    [new_email, student_id]
  );

  // rowCount tells us if a student with that id actually existed
  if (result.rowCount === 0) {
    console.log(`No student found with id ${student_id}.`);
  } else {
    console.log(`Updated email for student ${student_id} to ${new_email}.`);
  }
  return result.rowCount;
}




// DELETE: remove the student with the given id
async function deleteStudent(student_id) {
  const result = await pool.query(
    'DELETE FROM students WHERE student_id = $1',
    [student_id]
  );

  if (result.rowCount === 0) {
    console.log(`No student found with id ${student_id}.`);
  } else {
    console.log(`Deleted student ${student_id}.`);
  }
  return result.rowCount;
}

module.exports = { getAllStudents, addStudent, updateStudentEmail, deleteStudent };
