document.getElementById('forgotPasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').innerText = 'Password reset instructions sent to your email!';
    } else {
        document.getElementById('message').innerText = data.error || 'Email not found.';
    }
});
