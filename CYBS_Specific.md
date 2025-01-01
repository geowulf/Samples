Let’s dive into integrating Cybersource’s Unified Checkout Library! We'll securely collect credit card information using microforms hosted by Cybersource.

---

### **Overview of Cybersource Unified Checkout Integration**
1. **Load the Cybersource Unified Checkout Library**: Include the JavaScript library in your application.
2. **Initialize the Microform**: Configure the library with your merchant credentials and set up secure iframe elements for credit card fields.
3. **Handle Tokenization**: Use the microform’s asynchronous methods to tokenize the credit card data.
4. **Send Token to Backend**: Pass the token to your backend for processing.

---

### **Step-by-Step Implementation**

#### **HTML Structure**
Here’s the basic HTML for the modal, including placeholders for the credit card form:

```html
<div id="overlay" class="overlay">
  <div class="modal">
    <div class="modal-header">Secure Payment</div>
    <div class="modal-body">
      <form id="payment-form">
        <div id="cardNumber"></div>
        <div id="expiryDate"></div>
        <div id="cvv"></div>
        <button type="submit" class="button button-primary">Submit Payment</button>
      </form>
    </div>
    <div class="modal-footer">
      <button id="closeModal" class="button button-secondary">Cancel</button>
    </div>
  </div>
</div>

<script src="https://testsecureacceptance.cybersource.com/unifiedcheckout/v1/microform.js"></script>
```

#### **JavaScript for Cybersource Integration**
This script initializes the Cybersource microform library and handles form submission:

```javascript
// Merchant configuration
const config = {
  clientKey: 'YOUR_CLIENT_KEY', // Replace with your Cybersource client key
  apiKey: 'YOUR_API_KEY', // Replace with your API key
  organizationId: 'YOUR_ORGANIZATION_ID', // Replace with your organization ID
};

// Initialize the microform
function initializeMicroform() {
  const microform = new Microform(config);

  // Create credit card fields
  const cardNumber = microform.createField('card-number', {
    placeholder: 'Card Number',
    container: '#cardNumber',
  });

  const expiryDate = microform.createField('expiry-date', {
    placeholder: 'MM / YY',
    container: '#expiryDate',
  });

  const cvv = microform.createField('cvv', {
    placeholder: 'CVV',
    container: '#cvv',
  });

  return { microform, cardNumber, expiryDate, cvv };
}

// Handle form submission
function handleFormSubmission(microformInstance) {
  const form = document.getElementById('payment-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      // Tokenize credit card data
      const tokenResponse = await microformInstance.tokenize();
      console.log('Token:', tokenResponse);

      // Send the token to your backend
      await fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenResponse.token }),
      });

      alert('Payment submitted successfully!');
    } catch (error) {
      console.error('Error tokenizing or processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const { microform } = initializeMicroform();
  handleFormSubmission(microform);
});
```

---

### **Explanation**

1. **HTML**:
   - The `#cardNumber`, `#expiryDate`, and `#cvv` elements act as containers for the microform’s secure iframes.
   - The Cybersource library asynchronously loads secure input fields into these containers.

2. **JavaScript**:
   - **Microform Initialization**: The `Microform` class is configured with your credentials. It creates iframe-based fields.
   - **Tokenization**: On form submission, the `tokenize` method generates a secure token that represents the credit card details.
   - **Backend Communication**: The token is sent to the backend for processing, ensuring compliance with PCI standards.

---

### **Next Steps**

1. Replace the placeholder credentials (`YOUR_CLIENT_KEY`, etc.) with your Cybersource credentials.
2. Create a backend route (`/process-payment`) to handle the token securely and complete the transaction.
3. Test in Cybersource’s **sandbox environment** before going live.

---

Would you like me to help with the backend integration or expand on token handling in the front end?
