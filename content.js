const offensiveWords = ['hate', 'bitch', 'fag']; // List offensive words
const blockedSenders = new Set(); // Track blocked senders for Discord

// Function to replace offensive words in text nodes
function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    offensiveWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      text = text.replace(regex, word.replace(/./g, '*'));
    });
    node.textContent = text;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(replaceText);
  }
}

// Function to handle DOM mutations
function handleMutations(mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Apply word replacement for all platforms
          replaceText(node);

          // Apply specific blocking logic for Discord
          if (window.location.hostname === 'discord.com') {
            checkAndBlockSender(node);
          }
        }
      });
    }
  }
}

// Function to check and block the sender on Discord
function checkAndBlockSender(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Example selectors for Discord; these may need adjustment
    const messageElement = node.querySelector('[class*="message-"]');
    const senderElement = node.querySelector('[class*="username-"]');

    if (messageElement && senderElement) {
      const sender = senderElement.textContent.trim();
      const message = messageElement.textContent.trim();

      if (offensiveWords.some(word => message.includes(word))) {
        if (!blockedSenders.has(sender)) {
          blockedSenders.add(sender);
          blockDiscordUser(sender);
        }
      }
    }
  }
}

// Function to block a user on Discord (pseudo-code; requires interaction)
function blockDiscordUser(sender) {
  console.log(`Blocking sender on Discord: ${sender}`);
  
  // Locate the user by their username or ID
  const userElement = Array.from(document.querySelectorAll('[class*="username-"]')).find(el => el.textContent.trim() === sender);
  
  if (userElement) {
    // Simulate user interaction to block the user
    // This may involve opening the user's profile and clicking the block button
    // Example actions (pseudo-code):
    // userElement.click(); // Open user menu or profile
    // const blockButton = document.querySelector('button[aria-label="Block"]'); // Adjust selector as needed
    // if (blockButton) blockButton.click();
  }
}

// Initialize MutationObserver
const observer = new MutationObserver(handleMutations);
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
replaceText(document.body);
