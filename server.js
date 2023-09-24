require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// temp
const express = require('express');

const https = require('https');
const axios = require('axios');
const bodyParser = require('body-parser');

// Set up server and base characterstics
const app = express();
app.use(bodyParser.json());

// ENDPOINTS ------------------------------------------------------------------

// Proxy part
app.get('/proxy', async (req, res) => {
    try {
        let { url } = req.query;
        console.log(url);
        const response = await https.get(url);
        console.log(response);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

// Roadmaps part
app.get('/roadmaps/fetchUser', async (req, res) => {
    const userId = req.body.userId;

    results = await supabase
        .from('user_profile')
        .select('selected_roadmaps')
        .eq('japhenai_id', `${userId}`)
        .then((token) => {
            return token;
        });
    res.json({ data: results.data[0].selected_roadmaps });
});

// Tes part
app.get('/dummy', (req, res) => {
    res.json({ prout: 'hello:!' });
});

const PORT = 8080; // or any other preferred port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
