
const stdRules = v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z0-9]+(\s)?)+$|^$/.test(v) || 'Escribe números y letras';
const requiredRules =  v => !!v || 'Campo requerido';
const columnsRules = v => v.length > 6 || 'Sólo selecciona 6 columnas';
const numberRules = v => /^[0-9]*$|^$/.test(v)|| 'Sólo números';
const nameRules = v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z]+(\s)?)+$/.test(v) || 'Sólo letras';
const emailRules = v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/.test(v) || '¿Es un correo?';

const decimalRules = [
    v => !!v || 'Escribe un número decimal',
    v => /^([0-9]{1,3}(\.)[0-9]{1,6})$/.test(v) || 'Solo XX.XX decimales',
];

const passwordRules = [
    v => !!v || 'Contraseña requerida',
    v => /^\S{5,}$/.test(v)|| 'Escribe 5 o más caracteres',
]

export {stdRules, requiredRules, nameRules, decimalRules, columnsRules, passwordRules, emailRules, numberRules}