"use strict";

// Char sets
const digits = '0123456789';
const uppLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowLetters = 'abcdefghijklmnopqrstuvwxyz';
var validChars;


// Copy to clipboard 
function copyPwd() {
    let word = document.getElementById('pwd-out').innerHTML;
    navigator.clipboard.writeText(word).then(
        () => copyAlert(true), // copy succeeded
        () => copyAlert(false) // copy failed
    );
}

function copyAlert(success) {
    const placeholder = document.getElementById('alertPlaceholder');
    placeholder.setAttribute('role', 'alert');
    if (success) {
        placeholder.innerHTML = 'Password copied';
        placeholder.setAttribute('class', 'alert alert-success');
    } else {
        placeholder.innerHTML = 'Failed to copy password';
        placeholder.setAttribute('class', 'alert alert-danger');
    }
}

// Synchronize length inputs and write pasword
function lenSync(event) {
    let thisElement = event.target;
    let otherId = (thisElement.id == 'len-box') ? 'len-bar' : 'len-box';
    let otherElement = document.getElementById(otherId);
    otherElement.value = thisElement.value;
    writePwd();
}

function writePwd() {
    let output = document.getElementById('pwd-out');
    let pwdLen = document.getElementById('len-box').value;
    output.innerHTML = generator(pwdLen);
}

// Generate a new password
function generator(len) {
    setValidChars();
    // No valid char => ''
    if (validChars.length < 1) {
        return '';
    }
    // Create new password
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += randItm(validChars);
    }
    return pwd;
}

function setValidChars() {
    validChars = '';
    if (document.getElementById('digits').checked) {
        validChars += digits;
    }
    if (document.getElementById('uppercase').checked) {
        validChars += uppLetters;
    }
    if (document.getElementById('lowercase').checked) {
        validChars += lowLetters;
    }
}

// Return random item from nonempty array/string
function randItm(x) {
    return x[randRange(x.length)];
}

// Return random int in {0, ..., n-1}
function randRange(n) {
    return Math.floor(Math.random() * n);
}


function setupListeners() {
    // Length
    document.getElementById('len-box').addEventListener('input', lenSync);
    document.getElementById('len-bar').addEventListener('input', lenSync);
    // Characters
    let boxes = document.querySelectorAll('input[type=checkbox]');
    for (let b of boxes) {
        b.addEventListener('change', writePwd);
    }
    // Buttons
    document.querySelector('form').addEventListener('submit', event => {
        writePwd();
        event.preventDefault(); // prevent page from reloading
    });
    document.getElementById('copy').addEventListener('click', copyPwd);
}

window.addEventListener('load', setupListeners);
window.addEventListener('load', writePwd);
