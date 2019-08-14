// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueHeadful from 'vue-headful';
import {store} from './store/api'

import Master from './components/layouts/Master'
import routes from './routes'
import VueRouter from 'vue-router'
import VueCurrencyFilter from 'vue-currency-filter'

import Toasted from 'vue-toasted'
import Tooltip from 'vue-directive-tooltip';
import map from 'lodash/map'

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

import './../static/css/tooltip.css';

Vue.component('vue-phone-number-input', VuePhoneNumberInput);

Vue.use(Tooltip, {
	delay: 500,
	placement: 'top',
	triggers: ['hover'],
	offset: 0
});

Vue.use(Toasted)
Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false

Vue.use(VueRouter)

Vue.filter('fixValue', function (value) {
	return parseFloat(value).toFixed(5);
});

Vue.filter('roundValue', function (value) {
	return parseFloat(value).toFixed(0);
});

Vue.filter('shortStr', function (value) {
	return value.substring(1, 32)
});

Vue.filter('formatValue', function (value) {
	let val = parseFloat(value).toFixed(2).replace('.', ',')
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});

Vue.use(VueCurrencyFilter,
	{
		symbol: '',
		thousandsSeparator: '.',
		fractionCount: 2,
		fractionSeparator: ',',
		symbolPosition: 'front',
		symbolSpacing: true
	})

Vue.mixin({
	methods: {
		handleErrors: function (response) {
			let toasted = this.$toasted;
			if (response.status === 401 || response.data.status === 401) {
				toasted.show("Sua sessão expirou, favor logar novamente!", {
					position: 'top-center',
					type: 'info'
				}).goAway(1500)
				this.$router.push({name: 'login'})
			} else {
				toasted.show(response.data.message, {position: 'top-center', type: 'error'}).goAway(5000)
				if (response.data.errors) {
					let errors = response.data.errors
					map(errors, function (value, key) {
						toasted.show(value, {position: 'top-center', type: 'error'}).goAway(5000)
					});
				}
			}

		},
	}
});


const router = new VueRouter({
	routes,
	linkExactActiveClass: "selected",
	mode: 'history'
})

if (process.env.NODE_ENV !== "local") {
	Vue.config.devtools = false
	Vue.config.debug = false
	Vue.config.silent = true
}

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.getters.loggedIn) {
			next({
				name: 'login'
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.requiresVisitor)) {
		if (store.getters.loggedIn) {
			next({
				name: 'dashboard'
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router: router,
	store: store,
	components: {Master},
	template: '<Master/>'
})
