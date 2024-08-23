const nodemailer = require('nodemailer');

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shaurya1687@gmail.com',
        pass: 'zoin xpcx cexw gyqf'
    }
});

function sendOrderEmail(name, address, phone, deliveryDay, deliveryTime, items, totalAmount) {
    const mailOptions = {
        from: 'shaurya1687@gmail.com',
        to: 'shauryapavan6@gmail.com',
        subject: 'New Order Received',
        html: `
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
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendOrderEmail;
