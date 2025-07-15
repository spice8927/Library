document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            emailError.textContent = "Email is required.";
            return;
        }

        // Clear any previous error
        emailError.textContent = "";

        try {
            const response = await fetch('forgot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `email=${encodeURIComponent(email)}`
            });

            const result = await response.text();

            if (response.ok) {
                alert(result);
                form.reset();
            } else {
                alert("Error: " + result);
            }
        } catch (error) {
            alert("Something went wrong. Please try again later.");
            console.error("Forgot password error:", error);
        }
    });
});
