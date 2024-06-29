// Function to create and append GIF image and Solmyr image
function appendGif(targetParent) {
  // Remove existing container if it exists to reset the animation
  let existingContainer = document.getElementById('extensionGifContainer');
  if (existingContainer) {
    existingContainer.remove();
  }

  // Create container for both images
  const gifContainer = document.createElement('div');
  gifContainer.id = 'extensionGifContainer';
  Object.assign(gifContainer.style, {
    position: 'absolute',
    top: '50%',
    left: '0',
    zIndex: '999999',
    opacity: '0',
    transition: 'opacity 0.1s'
  });

  // Create Solmyr image
  const solmyrImage = document.createElement('img');
  solmyrImage.src = chrome.runtime.getURL('img/solmyr.png');
  Object.assign(solmyrImage.style, {
    position: 'absolute',
    left: '-180px',
    top: '50%',
    transform: 'translate(-100%, -50%)',
    maxWidth: '100px',
    height: 'auto',
    zIndex: '9999999'
  });

  // Create GIF image
  const gifImage = document.createElement('img');
  gifImage.src = chrome.runtime.getURL('img/lightning.gif');
  Object.assign(gifImage.style, {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translate(-100%, -50%)',
    maxWidth: '200px',
    height: 'auto',
    zIndex: '9999998'
  });

  // Append both images to the container
  gifContainer.appendChild(solmyrImage);
  gifContainer.appendChild(gifImage);

  // Append the container to the target's parent
  targetParent.appendChild(gifContainer);

  // Fade in the container
  gifContainer.style.opacity = '1';

  // After 0.95 second, fade out the container and remove it from the DOM
  setTimeout(() => {
    gifContainer.style.opacity = '0';
    gifContainer.addEventListener('transitionend', () => {
      gifContainer.remove();
    });
  }, 950);
}

// Listen for clicks on elements with class 'task_checkbox', which is the checkbox in Todoist
document.addEventListener('click', function (event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('task_checkbox') ||
    clickedElement.closest('.task_checkbox')) {
    const targetParent = clickedElement.closest('.task_checkbox') || clickedElement.parentNode;
    appendGif(targetParent);
    console.log('Solmyr casted a chain lightning!');
  }
}, true); // Use capture phase to ensure this listener runs first