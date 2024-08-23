const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const sendOrderEmail = require('./sendOrderEmail'); // Adjust the path as needed

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit-order', (req, res) => {
    console.log('Received Form Data:', req.body); // Debugging line

    const { name, address, phone, deliveryDay, deliveryTime, items, totalAmount } = req.body;

    // Check for undefined fields
    if (!name || !address || !phone || !deliveryDay || !deliveryTime || !items || !totalAmount) {
        console.error('Missing fields in form data');
        return res.status(400).send('Missing fields in form data');
    }

    // Create the email content
    const emailContent = `
        <h1>Order Confirmation</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Preferred Delivery Day:</strong> ${deliveryDay}</p>
        <p><strong>Preferred Delivery Time:</strong> ${deliveryTime}</p>
        <h3>Items Ordered:</h3>
        <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <h3>Total Amount: ₹${totalAmount}</h3>
    `;

    // Send the email
    sendOrderEmail(name, address, phone, deliveryDay, deliveryTime, items, totalAmount)
        .then(() => {
            res.send('Order submitted successfully!');
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).send('Error submitting order.');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
