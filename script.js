// Validación avanzada de correo electrónico en el formulario de contacto
window.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            var correo = document.getElementById('correo').value;
            var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(correo)) {
                alert('Por favor ingrese un correo electrónico válido.');
                e.preventDefault();
            }
        });
    }
});
// Contador de caracteres y bloqueo de caracteres especiales/emojis en textarea mensaje
window.addEventListener('DOMContentLoaded', function() {
    var mensaje = document.getElementById('mensaje');
    var contador = document.getElementById('contador-mensaje');
    if (mensaje && contador) {
        mensaje.addEventListener('input', actualizarContador);
        mensaje.addEventListener('keydown', bloquearEspeciales);
        mensaje.addEventListener('paste', bloquearPegado);
        actualizarContador();
    }
});

function actualizarContador() {
    var mensaje = document.getElementById('mensaje');
    var contador = document.getElementById('contador-mensaje');
    if (mensaje && contador) {
        // Eliminar caracteres especiales y emojis en tiempo real
        var texto = mensaje.value;
        var limpio = texto.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ .,;:!?\n\r]/g, '');
        if (texto !== limpio) {
            mensaje.value = limpio;
        }
        var restantes = 300 - mensaje.value.length;
        contador.textContent = restantes + ' caracteres restantes';
        if (restantes < 0) {
            mensaje.value = mensaje.value.substring(0, 300);
            contador.textContent = '0 caracteres restantes';
        }
    }
}

function bloquearEspeciales(e) {
    // Bloquear emojis y caracteres especiales
    var key = e.key;
    if (/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ .,;:!?\n\r]/.test(key)) {
        e.preventDefault();
    }
}

function bloquearPegado(e) {
    var clipboardData = e.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('Text');
    var limpio = pastedData.replace(/[^A-Za-z0-9ÁÉÍÓÚáéíóúÑñ .,;:!?\n\r]/g, '');
    if (pastedData !== limpio) {
        e.preventDefault();
        var mensaje = document.getElementById('mensaje');
        var start = mensaje.selectionStart;
        var end = mensaje.selectionEnd;
        var nuevo = mensaje.value.substring(0, start) + limpio + mensaje.value.substring(end);
        mensaje.value = nuevo.substring(0, 300);
        actualizarContador();
    }
}
