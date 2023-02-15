const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGO_CONNECTION,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    }
).then(()=> console.log('connected to database with mongolandia :D'))
.catch(error => console.log(error))