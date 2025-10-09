import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const port = 3000;
app.use(express.json());

// Define a POST endpoint to receive weather data
app.post('/weather', (req: Request, res: Response) => {
    const data = req.body;
    console.log('Received data:', data);

    // Process the data (e.g., add a timestamp)
    const processedData = {
        ...data,
        processingTimestamp: new Date().toISOString()
    };

    // Write the processed data to a file
    fs.appendFile('processed_weather_data.json', JSON.stringify(processedData) + '\n', (err) => {
        if (err) {
            console.error('Failed to write data:', err);
            return res.status(500).send('Failed to write data');
        }
        console.log('Data saved successfully');
        return res.status(200).send('Data processed and saved');
    });
});

app.listen(port, () => {
    console.log(`API service listening at http://localhost:${port}`);
});

