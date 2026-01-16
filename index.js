const express = require('express');
const users = require('./MOCK_DATA .json');
const app = express();
const FileSystem = require('fs');

app.use(express.json());

//middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

const PORT = 4000;

app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/api/users/:id', (req, res) => {
  const userID = req.params.id;
  const user = users.find(u => u.id == userID);

  return res.json(user);    
});
app.post('/api/users', (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    FileSystem.writeFileSync('./MOCK_DATA .json', JSON.stringify(users, null, 2));

   return res.status(201).json({ message: "User created successfully", user: newUser
    });
});


app.put('/api/users/:id', (req, res) => {
    return res.send({ message : "put request ot the user "})
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
