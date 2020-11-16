
const stdRules = v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z0-9]+(\s)?)+$|^$/.test(v) || 'Sólo aceptamos números y letras...';
const requiredRules =  v => !!v || 'Campo requerido';
const columnsRules = v => v.length > 6 || 'Sólo selecciona 6 columnas';

const nameRules = [
    v => !!v || 'Campo requerido',
    v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z]+(\s)?)+$/.test(v) || '¡Sólo letras!',
];

const decimalRules = [
    v => !!v || 'Escribe un número decimal',
    v => /^([0-9]{1,3}(\.)[0-9]{1,6})$/.test(v) || 'Solo XX.XX decimales',
];

export {stdRules, requiredRules, nameRules, decimalRules, columnsRules}