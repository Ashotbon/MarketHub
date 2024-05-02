document.addEventListener('DOMContentLoaded', function() {
    var splashScreen = document.getElementById('splashScreen');
    var image1 = document.getElementById('splashImage1');
    var image2 = document.getElementById('splashImage2');
    var visible = true; // Image 1 is initially visible
    var count = 0; // Initialize count to manage the number of toggles

    // Function to toggle images
    var toggleImages = function() {
        if (visible) {
            image1.classList.remove('visible');
            image2.classList.add('visible');
        } else {
            image2.classList.remove('visible');
            image1.classList.add('visible');
        }
        visible = !visible;
        count++;
        if (count >= 10) { // Total 10 changes to toggle each image 5 times
            clearInterval(intervalId);
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 300); // Ensure the last image is displayed for the full interval
        }
    };

    // Toggle images every 300 milliseconds
    var intervalId = setInterval(toggleImages, 300);
});
