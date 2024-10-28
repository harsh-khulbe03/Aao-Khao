const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT || 3002;
app.use(cors());

app.get('/api',(req,res)=>{
    res.send("Hello Harsh")
})

app.get('/api/restaurants', async (req, res) => {
    try {
        const result = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.73390&lng=76.78890&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
            }
        })
        const data = await result.json();
        return res.json(data)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to fetch data.' })
    }
})

app.get('/api/menu/:id', async (req, res) => {
    const { id } = req.params;

    /* OLD SWIGGY API
    const url = `https://www.swiggy.com/dapi/menu/v4/full?lat=${lat}&lng=${lng}&menuId=${menuId}`;
    */

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6280075&lng=77.3607098&submitAction=ENTER&restaurantId=${id}`;


    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    });

    const data = await response.json();
    return res.json(data);
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
