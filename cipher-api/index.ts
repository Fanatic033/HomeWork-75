import express from 'express';
import cors, {CorsOptions} from 'cors';
import vigenereCipher from './vigenereTS';

const app = express()
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/encode', (req, res) => {
  const encodeText = vigenereCipher(req.body.message, req.body.password, true);
  res.send({encoded: encodeText});
})

app.post('/decode', (req, res) => {
  const decodeText = vigenereCipher(req.body.message, req.body.password, false);
  res.send({decoded: decodeText});
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
