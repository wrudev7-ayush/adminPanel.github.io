(function ($) {
  "use strict";

  $('.input100').each(function () {
    $(this).on('blur', function () {
      if ($(this).val().trim() !== "") {
        $(this).addClass('has-val');
      } else {
        $(this).removeClass('has-val');
      }
    });
  });

  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) === false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr('type') === 'email') {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@(([a-zA-Z0-9\-]+\.)+)([a-zA-Z]{2,5})$/
          ) === null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() === '') {
        return false;
      }
    }
    return true;
  }

  function showValidate(input) {
    $(input).parent().addClass('alert-validate');
  }

  function hideValidate(input) {
    $(input).parent().removeClass('alert-validate');
  }
})(jQuery);


document.addEventListener("DOMContentLoaded", function () {

  const submitBtn = document.getElementById("submitBtn");
  const errorBox = document.getElementById("loginError");
  const otpSection = document.getElementById("otpSection");
  const formTitle = document.getElementById("formTitle");

  const loginFields = document.querySelectorAll(".login-field");

  submitBtn.addEventListener("click", login);

  function login(e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="pass"]').value.trim();

    errorBox.style.display = "none";
    errorBox.innerText = "";

    if (!email || !password) {
      showError("Email and password are required");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = "Please wait...";

    fetch("http://localhost:8080/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || "Invalid email or password");
        }
        else{
        localStorage.setItem("loginEmail", email);

        loginFields.forEach(el => el.style.display = "none");
        submitBtn.style.display = "none";

        formTitle.innerText = "Verify OTP";
        otpSection.style.display = "block";
      }
        return data;
      })
  
      .catch(err => {
        showError(err.message);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Login";
      });
  }

  function showError(message) {
    errorBox.innerText = message;
    errorBox.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const otpBoxes = document.querySelectorAll(".otp-box");
  const verifyOtpBtn = document.getElementById("verifyOtpBtn");

  // Auto move
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

  verifyOtpBtn.addEventListener("click", verifyOtp);

  function verifyOtp(e) {
    e.preventDefault();

    let otp = "";
    otpBoxes.forEach(b => otp += b.value);

    if (otp.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    otpBoxes.forEach(b => b.classList.remove("otp-error", "otp-success"));

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
        if (data.success && data.token) {
          otpBoxes.forEach(b => b.classList.add("otp-success"));
          localStorage.setItem("token", data.token);
          localStorage.removeItem("loginEmail");

          setTimeout(() => {
            window.location.href = "dashboard.html";
          }, 800);
        } else {
          throw new Error(data.message || "Invalid OTP");
        }
      })
      .catch(err => {
        otpBoxes.forEach(b => b.classList.add("otp-error"));
        setTimeout(() => {
          otpBoxes.forEach(b => {
            b.value = "";
            b.classList.remove("otp-error");
          });
          otpBoxes[0].focus();
        }, 600);
      });
  }
});
