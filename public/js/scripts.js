$(document).ready(function() {
    $('#orderForm').on('submit', function(event) {
        event.preventDefault();

        // Collect menu items
        const items = [];
        $('.menu-item:checked').each(function() {
            items.push($(this).val());
        });

        // Collect form data
        const formData = {
            name: $('#name').val(),
            address: $('#address').val(),
            phone: $('#phone').val(),
            deliveryDay: $('#day').val(),
            deliveryTime: $('#time').val(),
            items: items,
            totalAmount: $('#totalPrice').text()
        };

        console.log('Form Data:', formData); // Debugging line

        // Send form data to the server
        $.ajax({
            type: 'POST',
            url: '/submit-order',
            data: formData,
            success: function(response) {
                alert('Order submitted successfully!');
            },
            error: function(xhr, status, error) {
                console.error('Error:', error); // Debugging line
                alert('Error submitting order.');
            }
        });
    });

    // Update total price on item selection
    $('.menu-item').on('change', function() {
        let total = 0;
        $('.menu-item:checked').each(function() {
            total += parseInt($(this).data('price'), 10);
        });
        $('#totalPrice').text(total);
    });
});

