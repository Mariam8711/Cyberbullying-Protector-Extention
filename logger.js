// logger.js

// Function to get the current date and time in a readable format
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
  }
  
  // Function to log the message and sender to a file
  function logMessage(sender, message) {
    const dateTime = getCurrentDateTime();
    const logEntry = `${dateTime} - ${sender}: ${message}\n`;
  
    // Save the log entry to a file
    saveLog(logEntry);
  }
  
  // Function to save the log entry to a file (pseudo-code; actual implementation depends on the environment)
  function saveLog(logEntry) {
    // Example using browser's local storage (for demonstration purposes)
    // This should be replaced with actual file system writing logic in a suitable environment
    const logs = localStorage.getItem('messageLogs') || '';
    localStorage.setItem('messageLogs', logs + logEntry);
  
    // For Node.js environment, you can use the fs module
    // const fs = require('fs');
    // fs.appendFileSync('message_logs.txt', logEntry);
  }
  
  // Export the logMessage function for use in other scripts
  export { logMessage };
  