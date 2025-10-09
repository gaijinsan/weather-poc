import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path'; // Import the path module
import { fileURLToPath } from 'url';

// Replicate __dirname functionality for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.json());

// Define a POST endpoint to receive weather data
app.post('/weather', async (req: Request, res: Response) => {
    const data = req.body;
    console.log('Received data:', data);

    // Process the data (e.g., add a timestamp)
    const processedData = {
        ...data,
        processingTimestamp: new Date().toISOString()
    };

    // Define the output path relative to the app directory
    const outputPath = path.join(__dirname, '..', 'data', 'processed_weather_data.json');
    console.log('Attempting to write to:', outputPath);

    try {
        await fs.promises.appendFile(outputPath, JSON.stringify(processedData) + '\n');
        console.log('Data saved successfully');

        // Verify the file exists and is not empty
        const stats = await fs.promises.stat(outputPath);
        if (stats.size > 0) {
            console.log('File successfully created and is not empty.');
        } else {
            console.error('Error: File was created but is empty.');
            return res.status(500).send('Error: File created but is empty.');
        }

        res.status(200).send('Data processed and saved');

    } catch (err) {
        console.error('Failed to write or verify data:', err);
        return res.status(500).send('Failed to write data');
    }

});

app.listen(port, () => {
    console.log(`API service listening at http://localhost:${port}`);
});

