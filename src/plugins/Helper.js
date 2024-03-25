import moment from 'moment';
import store from '@/store/index';
import Vue from 'vue';

export default {
    install(Vue, options) {
        Vue.prototype.$formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY');
        };
        Vue.filter('toCurrency', function (value) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return formatter.format(value);
        });
    }
}