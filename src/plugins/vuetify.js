import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import es from 'vuetify/es5/locale/es';
import '@/scss/variables.scss'

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
        locales: { es },
        current: 'es',
    },
    theme: {
        options: {
            customProperties: true,
            variations: true,
        },
        light: true,
        themes: {
            light: {
                primary: '#1460AA', // signal blue
                secondary: '#00A4E1', // aquamarine
                accent: '#65D9AC',
                error: '#FF3D33', // south coral
                info: '#e4e4e4',
                success: '#54BF00', // green law
                warning: '#FFCC17', // egg yolk
                anchor: '#979797',
            },
            dark: {
                primary: '#1460AA',
            }
        },
    },
});
