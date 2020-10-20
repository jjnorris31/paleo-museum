import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import '@/assets/styles/variables.scss'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
            variations: true,
        },
        light: true,
        lang: {
            locales: { es },
            current: 'es',
        },
        themes: {
            light: {
                primary: '#bb272a',
                secondary: '#57A7F5',
                accent: '#65D9AC',
                error: '#f44336',
                info: '#191820',
                success: '#6d8645',
                warning: '#eb760d',
                anchor: '#979797',
            },
            dark: {
                primary: '#1460AA',
            }
        },
    },
});
