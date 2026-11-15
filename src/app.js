// Interactive command-line menu so each function can be called one at a time


const readline = require('readline');
const pool = require('./db');
const {
  getAllStudents,
  addStudent,
  updateStudentEmail,
  deleteStudent,
} = require('./students');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Queue incoming lines so input works whether typed by hand or piped from a file
const lines = [];
let waiting = null;
let closed = false;
rl.on('line', (line) => (waiting ? (waiting(line), (waiting = null)) : lines.push(line)));
rl.on('close', () => {
  closed = true;
  if (waiting) waiting(null);
});

// Prints a prompt and waits for the next line of input 
function ask(prompt) {
  process.stdout.write(prompt);
  if (lines.length) return Promise.resolve(lines.shift());
  if (closed) return Promise.resolve(null);
  return new Promise((resolve) => (waiting = resolve));
}

// Shows the menu options
function printMenu() {
  console.log('\n=== Student Database ===');
  console.log('1. Get all students');
  console.log('2. Add a student');
  console.log('3. Update a student email');
  console.log('4. Delete a student');
  console.log('5. Exit');
}

// Main loop: read a choice, run the matching function, repeat until exit


async function main() {
  // Check the connection up front so a bad password fails fast with a clear message
  await pool.query('SELECT 1');
  console.log('Connected to PostgreSQL.');

  while (true) {
    printMenu();
    const input = await ask('Choose an option: ');
    if (input === null) break; // input ended
    const choice = input.trim();

    try {
      if (choice === '1') {
        await getAllStudents();
      } else if (choice === '2') {
        const first = await ask('First name: ');
        const last = await ask('Last name: ');
        const email = await ask('Email: ');
        const date = await ask('Enrollment date (YYYY-MM-DD, blank for none): ');
        await addStudent(first, last, email, (date || '').trim() || null);
      } else if (choice === '3') {
        const id = await ask('Student id: ');
        const email = await ask('New email: ');
        await updateStudentEmail(Number(id), email);
      } else if (choice === '4') {
        const id = await ask('Student id: ');
        await deleteStudent(Number(id));
      } else if (choice === '5') {
        break;
      } else {
        console.log('Invalid option, pick 1-5.');
      }
    } catch (err) {
      // Database errors  are shown without crashing the app
      if (err.code === '23505') {
        console.log('Error: that email is already used by another student.');
      } else {
        console.log('Error:', err.message);
      }
    }
  }

  rl.close();
  await pool.end();
  console.log('Goodbye.');
}






main().catch(async (err) => {
  console.error('Could not connect to the database:', err.message);
  rl.close();
  await pool.end();
  process.exit(1);
});
