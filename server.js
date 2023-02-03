require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(
    cors({
        origin: "*"
    })
)

const PORT = process.env.PORT || 5000;
// const DB_URI = `mongodb+srv://???:???@???`

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 


mongoose.connect(`mongodb+srv://admin-zacharia:${process.env.DB_PASS}@cluster0.41ndsjl.mongodb.net/anakostDB?retryWrites=true&w=majority`).catch(err => console.log(err));
mongoose.connection.once('open', () => { 
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', (error) => {
    console.log('Mongoose Connection Error : ' + error);
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
