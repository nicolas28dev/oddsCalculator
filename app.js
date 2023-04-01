const helpButton = document.getElementById("help-button");
const helpModal = document.getElementById("help-modal");
const closeModal = document.querySelector(".close");

helpButton.onclick = () => {
    helpModal.style.display = "block";
};

closeModal.onclick = () => {
    helpModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target == helpModal) {
        helpModal.style.display = "none";
    }
};


document.getElementById('add-prize').addEventListener('click', () => {
    const prizeElements = document.getElementById('prize-elements'); // Get the prize-elements container
    const newPrize = document.createElement('div');
    newPrize.classList.add('prize');
    newPrize.innerHTML = `
        <label>Amount (€):</label>
        <input type="number" class="prize-amount">
        <label>Number of tickets:</label>
        <input type="number" class="prize-tickets">
        <button type="button" class="remove-prize">&times;</button>
    `;
    prizeElements.appendChild(newPrize); // Append the new prize element to the prize-elements container
});

document.getElementById('odds-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const totalTickets = parseFloat(document.getElementById('total-tickets').value);
    const ticketPrice = parseFloat(document.getElementById('ticket-price').value);

    const prizeAmounts = document.getElementsByClassName('prize-amount');
    const prizeTickets = document.getElementsByClassName('prize-tickets');
    
    let expectedValue = 0;
    for (let i = 0; i < prizeAmounts.length; i++) {
        const amount = parseFloat(prizeAmounts[i].value);
        const tickets = parseFloat(prizeTickets[i].value);
        const probability = tickets / totalTickets;
        expectedValue += amount * probability;
    }

    const expectedWinnings = expectedValue * (1000 / ticketPrice);

    document.getElementById('expected-value').textContent = expectedValue.toFixed(2);
    document.getElementById('expected-winnings').textContent = expectedWinnings.toFixed(2);
});

// Add this function to handle the removal of prizes
function removePrize(event) {
    const prizeToRemove = event.target.parentElement;
    prizeToRemove.remove();
}

// Add event listeners for the initial prize's remove button
document.querySelector('.remove-prize').addEventListener('click', removePrize);

// Add event listeners for the remove buttons of newly added prizes
document.getElementById('prizes-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-prize')) {
        removePrize(event);
    }
});