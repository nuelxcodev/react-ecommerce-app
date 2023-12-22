import express from 'express';
import router from './routes/router.js';


const app = express();
const PORT = 8080


app.use('api', router)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})