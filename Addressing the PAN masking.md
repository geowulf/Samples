In Cybersource’s Unified Checkout Library, the card number input field is securely rendered in an iframe by the library itself, so you won’t have direct access to the input field's value. This ensures PCI compliance by preventing sensitive credit card data from ever entering your application's DOM.

However, if you'd like to simulate masking for an external preview (e.g., a real-time display of the entered card number masked as `**** **** **** 1234`), you can achieve this by listening for events emitted by the microform library and updating an external preview element.

---

### **Simulating Masked Card Entry**

Here’s how you can add a preview with masked input:

#### **HTML (Add a Preview Element)**  
```html
<div class="modal-body">
  <form id="payment-form">
    <div id="cardNumber"></div>
    <div id="expiryDate"></div>
    <div id="cvv"></div>
    <div id="cardPreview">Card Number: **** **** **** ****</div>
    <button type="submit" class="button button-primary">Submit Payment</button>
  </form>
</div>
```

#### **JavaScript (Masking Functionality)**  
Add a listener for the card number field to handle input and update the preview:

```javascript
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

  // Add event listener to simulate masking
  cardNumber.on('input', (event) => {
    const { value } = event;
    const maskedValue = maskCardNumber(value);
    document.getElementById('cardPreview').textContent = `Card Number: ${maskedValue}`;
  });

  return { microform, cardNumber, expiryDate, cvv };
}

// Function to mask the card number
function maskCardNumber(cardNumber) {
  // Replace all but the last 4 digits with '*'
  return cardNumber.replace(/.(?=.{4})/g, '*');
}
```

---

### **How It Works**

1. **`cardNumber.on('input')`**:
   - Listens for input events on the microform's `card-number` field.
   - The `event.value` contains the entered digits but not in plain text; it's obfuscated for security.

2. **`maskCardNumber` Function**:
   - Masks all but the last four digits using a regular expression. For example:
     - Input: `4111111111111111`
     - Output: `**** **** **** 1111`

3. **Update the Preview**:
   - The masked number is displayed in the `#cardPreview` element.  

---

### **Important Note**  
This masking is purely cosmetic and does not affect the underlying secure iframe. It’s just a visual aid for users. Direct access to the actual input field or modifying its value is not possible due to security restrictions imposed by Cybersource.

---

Would you like to test this, or should we refine it further?
