function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    try {
        var result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (e) {
        clearOnDisplay();
        alert('Hatalı ifade!');
    }
}

function clearOnDisplay() {
    document.getElementById('display').value = '';
}



// Dark Mode toggle fonksiyonu
function toggleDarkMode() {
    var calculator = document.getElementById('calculator');
    var display = document.getElementById('display');
    var keys = document.querySelectorAll('#keys button');
    
    // calculator ID'sine sahip elementte dark mode sınıfını toggle et
    calculator.classList.toggle('dark-mode');
    display.classList.toggle('dark-mode');
    keys.forEach(button => button.classList.toggle('dark-mode'));
}

// Dark mode toggle butonuna event listener ekle
document.getElementById('darkModeToggle').addEventListener('change', toggleDarkMode);
