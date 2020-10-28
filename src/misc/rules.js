const stdRules = [
    v => !!v || 'Campo requerido',
    v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z0-9]+(\s)?)+$/.test(v) || 'Notamos algo raro...',
];

const nameRules = [
    v => !!v || 'Campo requerido',
    v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z]+(\s)?)+$/.test(v) || '¡Sólo letras!',
];

const decimalRules = [
    v => !!v || 'Escribe un número decimal',
    v => /^([0-9]{1,3}(\.)[0-9]{1,6})$/.test(v) || 'Solo XX.XX decimales',
];

export {stdRules, nameRules, decimalRules}