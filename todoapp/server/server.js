const express = require('express');
//const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./routes/auth/authapi');
const note = require('./routes/note/note');


const app = express();
const PORT = process.env.PORT || 5000;



//app.use(cors());
dotenv.config({ path: "./config.env" });


require('./database/database');
app.use(express.json());
app.use('/api/auth', auth.routes);
app.use('/api/note', note.routes);




app.listen(PORT, () => {
    console.log(`sever running at PORT: ${5000}`)
})