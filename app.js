// This code runs only for the index.html page
document.addEventListener("DOMContentLoaded", () => {
    
    const signInForm = document.getElementById("signInForm");
    const signUpForm = document.getElementById("signUpForm");
    const showSignUp = document.getElementById("showSignUp");
    const showSignIn = document.getElementById("showSignIn");
    const signUpButton = document.getElementById("signUpButton");
    
    // NEW: Get the Sign In button inside the form
    const signInButton = signInForm.querySelector(".btn"); 

    // --- Form Switching Logic ---
    if (showSignUp) {
        showSignUp.addEventListener("click", (e) => {
            e.preventDefault(); 
            signInForm.style.display = "none";
            signUpForm.style.display = "block";
        });
    }

    if (showSignIn) {
        showSignIn.addEventListener("click", (e) => {
            e.preventDefault();
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
        });
    }

    // --- Sign Up Logic (Existing) ---
    if (signUpButton) {
        signUpButton.addEventListener("click", () => {
            const name = document.getElementById("signUpName").value;
            const email = document.getElementById("signUpEmail").value;
            const password = document.getElementById("signUpPassword").value;

            if (!name || !email || !password) {
                alert("Please fill in all sign-up fields.");
                return;
            }

            // Store user details (for the duration of the browser session)
            const user = { name: name, email: email };
            localStorage.setItem("userDetails", JSON.stringify(user));
            
            alert("Sign up successful! Welcome, " + name + ". Redirecting to the selection page.");
            window.location.href = "chocolates.html";
        });
    }
    
    // --- NEW: Sign In Logic ---
    if (signInButton) {
        signInButton.addEventListener("click", () => {
            // Check if user details already exist (meaning they previously signed up)
            const userDetails = localStorage.getItem("userDetails");
            const emailField = signInForm.querySelector('input[type="email"]').value;

            if (userDetails) {
                // We assume if details are present, the user is signed in
                // We could add a check for the email field here, but for simplicity:
                let user = JSON.parse(userDetails);
                
                // Optional: Check if the entered email matches the saved email
                if (user.email === emailField) {
                    alert("Welcome back, " + user.name + "! Redirecting to the selection page.");
                    window.location.href = "chocolates.html";
                } else if (emailField === "") {
                    alert("Please enter your email to sign in.");
                } else {
                    alert("Account not found. Please sign up first.");
                }
                
            } else {
                // No user data found in local storage
                alert("No saved account found. Please sign up first.");
            }
        });
    }
});