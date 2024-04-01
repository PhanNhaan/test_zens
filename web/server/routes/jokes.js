const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./jokes.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS jokes (
        id INTEGER PRIMARY KEY,
        joke TEXT NOT NULL
      )
    `);

    db.run('DELETE FROM jokes');

    db.run('INSERT INTO jokes (joke) VALUES (?)', [`A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on."
                                                    The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now."
                                                    The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."`]);
    db.run('INSERT INTO jokes (joke) VALUES (?)', [`Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!" 
                                                    Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"`]);
    db.run('INSERT INTO jokes (joke) VALUES (?)', [`The teacher asked Jimmy, "Why is your cat at school today Jimmy?" Jimmy replied crying, "Because I heard my daddy tell my mommy, 'I am going to eat that pussy once Jimmy leaves for school today!'"`]);
    db.run('INSERT INTO jokes (joke) VALUES (?)', [`A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it's either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"`]);
});

// delete cookie
router.post('/deleteCookie', (req, res) => {
    res.cookie('votedJokes', '', { maxAge: 0 });
    res.send('Cookie đã được xóa');
});

// get joke
router.get('/joke', (req, res) => {
    const cookies = req.cookies;
    const votedJokes = cookies.votedJokes ? JSON.parse(cookies.votedJokes) : [];
    console.log(votedJokes)

    db.serialize(() => {
        db.get(
            `SELECT * FROM jokes WHERE id NOT IN (${votedJokes.join(',')}) ORDER BY RANDOM() LIMIT 1`,
            (err, row) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (!row) {
                    return res.status(404).json({ message: "That's all the jokes for today! Come back another day!" });
                }

                res.json(row);
            }
        );
    });
});

// Vote
router.post('/vote', (req, res) => {
    const { id, vote } = req.body;
    // console.log(req.body)

    if (vote !== 'like' && vote !== 'dislike') {
        return res.status(400).json({ error: 'Invalid vote. Vote must be "like" or "dislike".' });
    }
    
    // get cookie
    const cookies = req.cookies;
    const votedJokes = cookies.votedJokes ? JSON.parse(cookies.votedJokes) : [];

    if (votedJokes.includes(id)) {
        return res.status(400).json({ error: 'You have already voted for this joke.' });
    }

    // add cookie
    votedJokes.push(id);
    res.cookie('votedJokes', JSON.stringify(votedJokes), { maxAge: 86400000 });
    res.json({ message: 'Vote recorded successfully.' });
});


module.exports = router;
