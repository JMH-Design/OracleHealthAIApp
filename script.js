// Initialize medication reminders array
let medicationReminders = [];

// Chatbot class to handle interactions
class HealthcareChatbot {
  constructor() {
    this.userName = '';
    this.reminderState = ''; // Track conversation state
  }

  processInput(userInput) {
    const input = userInput.toLowerCase();

    if (!this.userName) {
      this.userName = userInput;
      return `Hello ${this.userName}! I'm your healthcare AI assistant. I can help you:
                    \n1. Set medication reminders
                    \n2. View your reminders
                    \n3. Delete reminders
                    \nWhat would you like to do?`;
    }

    // Handle Brukinsa specific input
    if (
      this.reminderState === 'awaiting_medication' &&
      (input.includes('brukinsa') || input === 'brukinsa')
    ) {
      this.reminderState = ''; // Reset state
      return `Important information about Brukinsa:
                    \n• Take 320 mg daily (4 capsules of 80 mg each)
                    \n• Can be taken as either:
                    \n  - Once daily (4 capsules at once) OR
                    \n  - Twice daily (2 capsules twice a day)
                    \n• Take with water
                    \n• Can be taken with or without food
                    \n• If a dose is missed, take it as soon as possible on the same day
                    \nWould you like to set a reminder for Brukinsa?`;
    }

    if (
      input.includes('set') ||
      input.includes('add') ||
      input.includes('new reminder')
    ) {
      this.reminderState = 'awaiting_medication';
      return this.initiateReminderCreation();
    } else if (
      input.includes('view') ||
      input.includes('show') ||
      input.includes('list')
    ) {
      return this.listReminders();
    } else if (input.includes('delete') || input.includes('remove')) {
      return this.deleteReminder();
    } else {
      return "I'm sorry, I didn't understand that. Would you like to set a reminder, view your reminders, or delete a reminder?";
    }
  }

  addReminder(medication, time, frequency) {
    const reminder = {
      id: Date.now(),
      medication: medication,
      time: time,
      frequency: frequency,
    };
    medicationReminders.push(reminder);
    return `Reminder set for ${medication} at ${time}, ${frequency}`;
  }

  listReminders() {
    if (medicationReminders.length === 0) {
      return "You don't have any medication reminders set.";
    }

    let response = 'Here are your current reminders:\n';
    medicationReminders.forEach((reminder) => {
      response += `\n- ${reminder.medication} at ${reminder.time}, ${reminder.frequency}`;
    });
    return response;
  }

  deleteReminder(id) {
    const index = medicationReminders.findIndex(
      (reminder) => reminder.id === id
    );
    if (index !== -1) {
      medicationReminders.splice(index, 1);
      return 'Reminder deleted successfully.';
    }
    return 'Reminder not found.';
  }

  initiateReminderCreation() {
    return "Let's set a medication reminder. Please enter the medication name (For example: Brukinsa):";
  }
}

// Initialize chatbot
const chatbot = new HealthcareChatbot();

// Helper function to display messages
function displayMessage(sender, message) {
  const chatOutput = document.getElementById('chat-output');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = message;
  chatOutput.appendChild(messageDiv);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

// Single DOM event listener to handle all UI setup
document.addEventListener('DOMContentLoaded', () => {
  // Add welcome header
  const welcomeHeader = document.createElement('div');
  welcomeHeader.innerHTML = `
  <img src="https://shorturl.at/4mWVB" class="center"></img>     
  <h1 style="text-align: center; color: #2c3e50;">Clinical AI Assistant</h1>
        <p style="text-align: center; color: #7f8c8d; margin-bottom: 30px;">
            I am your personal AI assistant. I can do things like:
            <ul>
            <li> Set medication reminders</li>
            <li>Discuss your treatment plan and best practices</li>
            <li>Answer medical questions</li>
            </ul>
        </p>
    `;
  document.body.appendChild(welcomeHeader);

  // Create chat container and elements
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-container';

  const chatOutput = document.createElement('div');
  chatOutput.id = 'chat-output';

  const inputForm = document.createElement('form');
  const inputField = document.createElement('input');
  const submitButton = document.createElement('button');

  inputField.type = 'text';
  inputField.placeholder = 'Type your message...';
  submitButton.textContent = 'Message Clinical AI';

  inputForm.appendChild(inputField);
  inputForm.appendChild(submitButton);
  chatContainer.appendChild(chatOutput);
  chatContainer.appendChild(inputForm);
  document.body.appendChild(chatContainer);

  // Display initial welcome message
  displayMessage(
    'bot',
    'Welcome to the Clinical AI Assistant! Who am I speaking with today?'
  );

  // Handle user input
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = inputField.value.trim();
    if (userInput) {
      displayMessage('user', userInput);
      const response = chatbot.processInput(userInput);
      displayMessage('bot', response);
      inputField.value = '';
    }
  });
});

// Add styles
const style = document.createElement('style');
style.textContent = `
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f9f9f9;
    }

    h1 {
        margin-bottom: 10px;
    }
  
li {
  text-align: center; 
  color: #7f8c8d; 
  margin-bottom: 10px;
  list-style: none;
  }

    #chat-container {
        max-width: 500px;
        margin: 20px auto;
        border-radius: 5px;
        padding: 20px;
    }
    
    #chat-output {
        height: auto;
        overflow-y: auto;
        margin-bottom: 20px;
        padding: 10px;

    }
    
    .message {
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
    }
    
    .user-message {
        background-color: #e3f2fd;
        margin-left: 20%;
    }
    
    .bot-message {
        background-color: #f5f5f5;
        margin-right: 20%;
    }
    
    form {
        display: flex;
        gap: 10px;
        appearance: none;
      
    }
    
    input {
        flex: 1;
        padding: 8px;
        border: .5px solid #f2f2f2;
        background: #f2f2f2
        border-radius: 4px;
    }
    
    button {
        padding: 8px 16px;
        background-color: #c74634;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #B33220;
    }
    .center{
      display: block;
  max width: 25%;
  max height: 25$;
    }
`;
document.head.appendChild(style);
