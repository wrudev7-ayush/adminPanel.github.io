
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);


document.addEventListener("DOMContentLoaded", function () {

  // ===== ELEMENTS =====
  const forgotBtn = document.getElementById("forgotBtn");
  const backToLogin = document.getElementById("backToLogin");
  const loginFields = document.querySelectorAll(".login-field");
  const forgotFields = document.querySelectorAll(".forgot-field");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");

  const otpSection = document.getElementById("otpSection");
  const otpBoxes = document.querySelectorAll(".otp-box");
  const resendBtn = document.getElementById("resendBtn");
  const timerText = document.getElementById("timerText");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");

  // Demo OTP
  const CORRECT_OTP = "123456";

  // ===== FORGOT PASSWORD =====
  forgotBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    loginFields.forEach(el => el.style.display = "none");
    forgotFields.forEach(el => el.style.display = "block");

    forgotBtn.style.display = "none";
    backToLogin.style.display = "inline";

    formTitle.innerText = "Reset Password";
    submitBtn.innerText = "Submit";
  });

  // ===== BACK TO LOGIN =====
  backToLogin?.addEventListener("click", function (e) {
    e.preventDefault();

    loginFields.forEach(el => el.style.display = "block");
    forgotFields.forEach(el => el.style.display = "none");

    forgotBtn.style.display = "inline";
    backToLogin.style.display = "none";

    formTitle.innerText = "Login to continue";
    submitBtn.innerText = "Login";
  });

  // ===== LOGIN → OTP =====
  submitBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    loginFields.forEach(el => el.style.display = "none");
    forgotFields.forEach(el => el.style.display = "none");

    forgotBtn.style.display = "none";
    backToLogin.style.display = "none";
    submitBtn.style.display = "none";

    formTitle.innerText = "Verify OTP";
    otpSection.style.display = "block";

    setTimeout(() => {
      otpBoxes[0]?.focus();
      startResendTimer();
    }, 100);
  });

  // ===== OTP AUTO MOVE =====
  otpBoxes.forEach((box, index) => {
    box.addEventListener("input", () => {
      if (box.value && index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    });

    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && index > 0) {
        otpBoxes[index - 1].focus();
      }
    });
  });

  // ===== RESEND TIMER =====
  let timer = 30;
  let interval;

  function startResendTimer() {
    clearInterval(interval);
    timer = 30;
    resendBtn.disabled = true;
    timerText.innerText = `Resend OTP in ${timer}s`;

    interval = setInterval(() => {
      timer--;
      timerText.innerText = `Resend OTP in ${timer}s`;

      if (timer <= 0) {
        clearInterval(interval);
        timerText.innerText = "Didn’t receive OTP?";
        resendBtn.disabled = false;
      }
    }, 1000);
  }

  resendBtn?.addEventListener("click", () => {
    startResendTimer();
    otpBoxes.forEach(b => {
      b.value = "";
      b.classList.remove("otp-error", "otp-success");
    });
    otpBoxes[0]?.focus();
  });

  // ===== VERIFY OTP & REDIRECT =====
  verifyOtpBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    let enteredOtp = "";
    otpBoxes.forEach(box => enteredOtp += box.value);

    if (enteredOtp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    if (enteredOtp === CORRECT_OTP) {
      otpBoxes.forEach(b => b.classList.add("otp-success"));

      setTimeout(() => {
        window.location.replace("https://wrudev7-ayush.github.io/adminPanel.github.io/index.html");
      }, 800);

    } else {
      otpBoxes.forEach(b => b.classList.add("otp-error"));

      setTimeout(() => {
        otpBoxes.forEach(b => {
          b.value = "";
          b.classList.remove("otp-error");
        });
        otpBoxes[0]?.focus();
      }, 600);
    }
  });

});


// // LOGIN BUTTON CLICK
// document.getElementById("submitBtn").addEventListener("click", login);

// function login() {
//   const email = document.querySelector('input[name="email"]').value;
//   const password = document.querySelector('input[name="pass"]').value;

//   if (!email || !password) {
//     alert("Email and password are required");
//     return;
//   }

//   fetch("http://localhost:8080/admin/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password
//     })
//   })
//   .then(res => {
//     if (res.status === 401) {
//       throw new Error("Invalid credentials");
//     }
//     return res.json();
//   })
//   .then(data => {
//     console.log("Login Response:", data);

//     localStorage.setItem("token", data.token);

//     window.location.href = "dashboard.html";
//   })
//   .catch(err => alert(err.message));
// }

// LOGIN authentication here ayush

document.getElementById("submitBtn").addEventListener("click", login);

function login() {
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="pass"]').value;

  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  fetch("http://localhost:8080/admin/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Login response:", data);

    // save email for OTP
    localStorage.setItem("loginEmail", email);

    // show OTP 
    document.getElementById("otpSection").style.display = "block";
  })
  .catch(() => alert("Login failed"));
}



document.getElementById("verifyOtpBtn").addEventListener("click", verifyOtp);

function verifyOtp() {
  let otp = "";
  document.querySelectorAll(".otp-box").forEach(i => otp += i.value);

  fetch("http://localhost:8080/admin/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: localStorage.getItem("loginEmail"),
      otp: otp
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Verify OTP response:", data);

    // SAVE JWT (ONLY HERE)
    localStorage.setItem("token", data.token);

    localStorage.removeItem("loginEmail");

    window.location.href = "dashboard.html";
  })
  .catch(() => alert("OTP verification failed"));
}

