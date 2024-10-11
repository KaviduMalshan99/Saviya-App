const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt'); // Import bcrypt
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'saviya'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// Sample route for user registration
app.post('/register', async (req, res) => {
    const { firstname, lastname, email, contact_number, gender, password, status } = req.body; // Include status
  
    console.log("Received status:", status); // Log the status value to check if it's being received correctly
  
    // Hash the password before storing it
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash with 10 rounds
      const sql = 'INSERT INTO users (firstname, lastname, email, contact_number, gender, password, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
      
      db.query(sql, [firstname, lastname, email, contact_number, gender, hashedPassword, status], (err, result) => { // Include status here
        if (err) {
          console.error(err); // Log the error for debugging
          return res.status(500).send({ message: 'Error registering user' }); // Sending back a message
        }
        res.status(201).send({ message: 'User registered successfully' });
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      return res.status(500).send({ message: 'Error registering user' });
    }
  });
  




app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Error retrieving user' });
        }

        if (results.length === 0) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({ message: 'Error checking password' });
            }

            if (!isMatch) {
                return res.status(401).send({ message: 'Invalid email or password' });
            }

            // Authentication successful, return user data
            res.status(200).send({
                message: 'Login successful',
                user: {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    contact_number: user.contact_number,
                    gender: user.gender,
                },
            });
        });
    });
});


app.get('/api/courses/category/:slug', (req, res) => {
    const { slug } = req.params;
    console.log('Fetching courses for category:', slug); // Log the category slug
    
    const sql = `
        SELECT courses.* 
        FROM courses
        JOIN course_category ON courses.id = course_category.course_id
        JOIN categories ON course_category.category_id = categories.id
        WHERE categories.slug = ?
    `;
    
    db.query(sql, [slug], (err, results) => {
        if (err) {
            console.error('Error fetching courses by category:', err);
            return res.status(500).json({ message: 'Error retrieving courses' });
        }
        console.log('Courses retrieved:', results); // Log the results
        res.json(results);
    });
});



// Route to get course by ID
app.get('/api/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = 'SELECT * FROM courses WHERE id = ?';
  
    db.query(sql, [courseId], (err, results) => {
      if (err) {
        console.error('Error retrieving course details:', err);
        return res.status(500).json({ message: 'Error retrieving course details' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      console.log('Course details:', results[0]);  // Log the course details in the terminal
      res.json(results[0]);
    });
  });


  // Route to get course by ID
app.get('/api/sections/:id', (req, res) => {
    const courseId = req.params.id;
    const sql = 'SELECT * FROM courses WHERE id = ?';
  
    db.query(sql, [courseId], (err, results) => {
      if (err) {
        console.error('Error retrieving course details:', err);
        return res.status(500).json({ message: 'Error retrieving course details' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      console.log('Course details:', results[0]);  // Log the course details in the terminal
      res.json(results[0]);
    });
  });


// Route to get course sections by course_id
app.get('/api/courses/:courseId/sections', (req, res) => {
    const courseId = parseInt(req.params.courseId, 10);
  
    const sql = 'SELECT * FROM sections WHERE course_id = ? ORDER BY `order` ASC'; // Fetching sections and sorting by `order`
    
    db.query(sql, [courseId], (err, results) => {
      if (err) {
        console.error('Error fetching sections:', err);
        return res.status(500).json({ message: 'Error fetching sections' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No sections found for this course' });
      }
  
      console.log(`Fetched sections for courseId: ${courseId}`, results); // Log to check data
      res.json(results); // Send the results to the client
    });
  });

// Route to get contents by section_id
app.get('/api/sections/:sectionId/contents', (req, res) => {
    const sectionId = parseInt(req.params.sectionId, 10);

    const sql = 'SELECT * FROM contents WHERE section_id = ? ORDER BY `order` ASC'; // Fetching contents and sorting by `order`
    
    db.query(sql, [sectionId], (err, results) => {
        if (err) {
            console.error('Error fetching contents:', err);
            return res.status(500).json({ message: 'Error fetching contents' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No contents found for this section' });
        }

        console.log(`Fetched contents for sectionId: ${sectionId}`, results); // Log the fetched content
        res.json(results); // Send the fetched contents back to the client
    });
});


// Fetch user details by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user details:', err); // Log error
        return res.status(500).json({ message: 'Error fetching user details' });
      }
      if (result.length === 0) {
        console.log('No user found for id:', userId); // Log if no user is found
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('Fetched user details:', result[0]); // Log fetched user data
      res.json(result[0]); // Return user details
    });
});
  
// Update user details by ID
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { firstname, lastname, email, contact_number, password } = req.body;
  
    try {
      // If password is provided, hash it. Otherwise, keep the existing password
      let hashedPassword;
      if (password) {
        console.log('Hashing new password');
        hashedPassword = await bcrypt.hash(password, 10); // Hash new password if provided
      }
  
      // If password is not provided, exclude it from the SQL query
      const sql = password
        ? 'UPDATE users SET firstname = ?, lastname = ?, email = ?, contact_number = ?, password = ? WHERE id = ?'
        : 'UPDATE users SET firstname = ?, lastname = ?, email = ?, contact_number = ? WHERE id = ?';
  
      const params = password
        ? [firstname, lastname, email, contact_number, hashedPassword, userId]
        : [firstname, lastname, email, contact_number, userId];
  
      db.query(sql, params, (err) => {
        if (err) {
          console.error('Error updating user details:', err); // Log error
          return res.status(500).json({ message: 'Error updating user details' });
        }
        console.log('User updated successfully:', { userId, firstname, lastname, email, contact_number });
        res.json({ message: 'User updated successfully' });
      });
    } catch (error) {
      console.error('Error updating user:', error); // Log any caught errors
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
