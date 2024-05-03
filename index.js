const express = require('express');
const mysql = require('mysql');



const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors({
  origin: '*',
  credentials: true, // Enable sending cookies
}));
app.use(express.json());
const connection = mysql.createConnection({

  host: "bcs5gehb4n0ke1oyivai-mysql.services.clever-cloud.com",
  user: 'ujrrh5mr2koynblu',
  database: 'bcs5gehb4n0ke1oyivai',
  password:"uGFhj03ml6FaTOvv8oY4",
  port:3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.get("/",(req,res)=>{
  res.send("helloworld")
})

  app.post('/query', (req, res) => {
    const query = req.body.query;
  
    if (!query) {
      return res.status(400).json({ error: 'No query provided in the request body.' });
    }
  
    // Execute the SQL query
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing SQL query: ' + error.stack);
        return res.status(500).json({ error: `Error executing SQL query.${error.stack}` });
      }
  
      // Send back the query results
      res.json(results);
    });
  });
  
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
