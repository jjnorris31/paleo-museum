const stdRules = [
    v => !!v || '¿Qué nombre tiene el rancho?',
    v => /^([ñÑáéíóúÁÉÍÓÚaa-zA-Z0-9]+(\s)?)+$/.test(v) || 'Notamos algo raro, ¿Está bien escrito?',
];

export {stdRules}