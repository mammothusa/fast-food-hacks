// Fast Food Hacks Full Site - Web App Code (Frontend & Backend) with Real-Time Scraping, Ads, and Affiliate Banners

// Dependencies
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Function to Scrape Fast Food Menu Prices
async function scrapeFastFoodHacks() {
    try {
        const urls = {
            "McDonald's": 'https://www.mcdonalds.com/us/en-us/full-menu.html',
            "Taco Bell": 'https://www.tacobell.com/food/',
            "Burger King": 'https://www.bk.com/menu',
            "Dunkin'": 'https://www.dunkindonuts.com/en/menu',
            "Starbucks": 'https://www.starbucks.com/menu',
            "Chipotle": 'https://www.chipotle.com/order/menu',
            "Subway": 'https://www.subway.com/en-US/MenuNutrition/Menu',
            "Wendy's": 'https://www.wendys.com/en-us/menu',
            "KFC": 'https://www.kfc.com/menu',
            "Popeyes": 'https://www.popeyes.com/menu',
            "Dairy Queen": 'https://www.dairyqueen.com/en-us/Menu/'
        };
        
        let hacks = [];

        for (const [restaurant, url] of Object.entries(urls)) {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            // Example parsing logic (adjust based on each site's structure)
            let item = $('h2').first().text();
            let price = $('span.price').first().text();
            
            // Example: Simple hack logic
            let hack = `Order ${item} with separate add-ons to save money!`;
            
            hacks.push({ restaurant, item, price, hack });
        }

        return hacks;
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}

// API Endpoint to Fetch Real-Time Hacks
app.get('/api/hacks', async (req, res) => {
    const fastFoodHacks = await scrapeFastFoodHacks();
    res.json(fastFoodHacks);
});

// Improved Frontend UI with Ad Placeholders & Affiliate Banners
app.get('/', async (req, res) => {
    const fastFoodHacks = await scrapeFastFoodHacks();
    res.send(`
        <html>
        <head>
            <title>Fast Food Hacks</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; background-color: #f8f9fa; }
                .container { max-width: 800px; margin: 20px auto; padding: 20px; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px; }
                .ad-placeholder { width: 100%; height: 100px; background: lightgray; margin: 20px 0; display: flex; align-items: center; justify-content: center; font-weight: bold; }
                .affiliate-banner img { width: 300px; height: 50px; margin: 10px; }
                ul { list-style-type: none; padding: 0; }
                li { background: #ffffff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.1); }
                h1 { color: #ff6600; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Fast Food Hacks</h1>
                <p>Discover the cheapest way to order fast food!</p>
                
                <!-- Ad Placeholder -->
                <div class="ad-placeholder">Ad Space</div>
                
                <ul>
                    ${fastFoodHacks.map(hack => `<li><strong>${hack.restaurant}:</strong> ${hack.hack} (Price: ${hack.price})</li>`).join('')}
                </ul>
                
                <!-- Affiliate Banners for Restaurant Apps -->
                <div class="affiliate-banner">
                    <a href="#"><img src="https://via.placeholder.com/300x50" alt="Download McDonald's App"></a>
                    <a href="#"><img src="https://via.placeholder.com/300x50" alt="Download Taco Bell App"></a>
                    <a href="#"><img src="https://via.placeholder.com/300x50" alt="Download Burger King App"></a>
                </div>
                
                <!-- Another Ad Placeholder -->
                <div class="ad-placeholder">Ad Space</div>
            </div>
        </body>
        </html>
    `);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
