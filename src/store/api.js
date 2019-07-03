import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = `${process.env.API_ROOT}`;

export const store = new Vuex.Store({
	state: {
		token: (localStorage.getItem('liquidex_access_token') && localStorage.getItem('liquidex_access_token') !== 'undefined') ? localStorage.getItem('liquidex_access_token') : null,
		user: {
			name: 'carregando...',
			level: '-'
		}
	},
	getters: {
		loggedIn(state) {
			return state.token !== null
		},
		user(state) {
			return state.user
		},
	},
	mutations: {
		retrieveToken(state, token) {
			state.token = token
		},
		destroyToken(state) {
			state.token = null
		},
		retrieveUser(state, user) {
			state.user = user
		},
	},
	actions: {
		register(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('/register', credentials)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveToken(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('/login', {
					username: credentials.username,
					password: credentials.password,
					recaptcha: credentials.recaptcha,
					code_2fa: credentials.code_2fa,
				})
					.then(response => {
						const token = response.data.access_token
						localStorage.setItem('liquidex_access_token', token)
						context.commit('retrieveToken', token)
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		destroyToken(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

			if (context.getters.loggedIn) {
				return new Promise((resolve, reject) => {
					axios.get('/logout')
						.then(response => {
							localStorage.removeItem('liquidex_access_token')
							context.commit('destroyToken')
							resolve(response)
						})
						.catch(error => {
							localStorage.removeItem('liquidex_access_token')
							context.commit('destroyToken')
							reject(error)
						})
				})
			}
		},
		retrieveCountries(context) {
			return new Promise((resolve, reject) => {
				axios.get('/countries')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrievePassword(context, email) {
			return new Promise((resolve, reject) => {
				axios.post('/sendPasswordResetLink', {
					email: email.email,
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		resetPassword(context, credentials) {
			return new Promise((resolve, reject) => {
				axios.post('/resetPassword', {
					email: credentials.email,
					password: credentials.password,
					password_confirmation: credentials.password_confirmation,
					token: credentials.token,
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUser(context) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

			axios.get('/user')
				.then(response => {
					context.commit('retrieveUser', response.data.user)
				})
				.catch(error => {
					if (error.response.status === 401) {
						localStorage.removeItem('liquidex_access_token')
						context.commit('destroyToken')
						this.$router.push({name: 'login'})
					}
				})
		},
		retrieveCpf(context, document) {
			return new Promise((resolve, reject) => {
				axios.get('/user/cpf/' + document.document)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendDocument(context, document) {
			return new Promise((resolve, reject) => {
				axios.post('/user/documents/store', document)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveDocuments() {
			return new Promise((resolve, reject) => {
				axios.get('/user/documents/list')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveHist() {
			return new Promise((resolve, reject) => {
				axios.get('/user/hist')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendMailToken(context, token) {
			return new Promise((resolve, reject) => {
				axios.post('/send-mail-token', token)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updateUser(context, user) {
			return new Promise((resolve, reject) => {
				axios.post('/user/update', {
					document: user.document,
					action: user.action,
					code: user.code,
					pin: user.pin,
				})
					.then(response => {
						this.retrieveUser(context)
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updateUserInt(context, user) {
			return new Promise((resolve, reject) => {
				axios.post('/user/update-international', user)
					.then(response => {
						this.retrieveUser(context)
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updatePassword(context, user) {
			return new Promise((resolve, reject) => {
				axios.post('/user/update-password', user)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updatePin(context, pin) {
			return new Promise((resolve, reject) => {
				axios.post('/user/update-pin', pin)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updatePhone(context, user) {
			return new Promise((resolve, reject) => {
				axios.post('/user/verify-phone', {
					phone: user.phone,
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		validatePhone(context, user) {
			return new Promise((resolve, reject) => {
				axios.post('/user/validate-phone', {
					code: user.code,
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		/**MENSAGENS DO SISTEMA**/
		retrieveNotificationsList(context, page) {
			return new Promise((resolve, reject) => {
				axios.get('/messages/notifications?page=' + page)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveTotalNotifications(){
			return new Promise((resolve, reject) => {
				axios.get('/messages/total')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveNotification(context, message) {
			return new Promise((resolve, reject) => {
				axios.get('/messages/edit/' + message)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrievePrices() {
			return new Promise((resolve, reject) => {
				axios.get('/coins/prices')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveCurrentPrices() {
			return new Promise((resolve, reject) => {
				axios.get('/coins/currentPrices')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrievePrice(context, coin) {
			return new Promise((resolve, reject) => {
				axios.get('/coins/price/' + coin)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveWallet(context, wallet) {
			return new Promise((resolve, reject) => {
				axios.get('/user/wallet/' + wallet)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveWallets(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/wallets')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveWalletsConversionOrder() {
			return new Promise((resolve, reject) => {
				axios.get('/user/wallets/conversion-order')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updateWalletsConversionOrder(context, wallets) {
			return new Promise((resolve, reject) => {
				axios.post('/user/wallets/update-conversion-order', wallets)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveDashboard(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/dashboard')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveSecWallet(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/secondaryWallet/')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveFee(context, transaction) {
			return new Promise((resolve, reject) => {
				axios.post('/transactions/estimateFee/', transaction)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendTransaction(context, transaction) {
			return new Promise((resolve, reject) => {
				axios.post('/transactions/send/', transaction)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveTransactions(context, page) {
			return new Promise((resolve, reject) => {
				axios.get('/transactions/list?page=' + page)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveTransactionsWallet(context, data) {
			return new Promise((resolve, reject) => {
				axios.get('/transactions/listByWallet/' + data.symbol + '/' + data.address + '?page=' + data.page)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveBanks() {
			return new Promise((resolve, reject) => {
				axios.get('/banks')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveZipCode(context, zipcode) {
			return new Promise((resolve, reject) => {
				axios.get('/user/address/get/' + zipcode)
					.then(response => {
						resolve(response)
					}).catch(error => {
						reject(error)
				})
			})
		},
		updateUserAddress(context, address) {
			return new Promise((resolve, reject) => {
				axios.post('/user/address/store', address)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveAccounts(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/accountsList/')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveAccount(context, account) {
			return new Promise((resolve, reject) => {
				axios.get('/user/account/' + account)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storeAccount(context, account) {
			return new Promise((resolve, reject) => {
				axios.post('/user/storeAccount', account)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updateAccount(context, account) {
			return new Promise((resolve, reject) => {
				axios.post('/user/updateAccount', account)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		deleteAccount(context, account) {
			return new Promise((resolve, reject) => {
				axios.post('/user/deleteAccount', account)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveSystemAccounts(context) {
			return new Promise((resolve, reject) => {
				axios.get('/system/accountsList')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendDeposit(context, deposit) {
			return new Promise((resolve, reject) => {
				axios.post('/deposit/send', deposit)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendPaypalDeposit(context, deposit) {
			return new Promise((resolve, reject) => {
				axios.post('/depositPaypal/send', deposit)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendNetellerDeposit(context, deposit) {
			// var depositObj = deposit;
			return new Promise((resolve, reject) => {

				axios.post('https://test.api.neteller.com/v1/orders', deposit,
					{
						headers: {
							'Authorization': 'Bearer NTt3st1!',
							'Content-Type': 'application/json'
						},
						auth: {
							username: 'netellertest_BRL@neteller.com',
							password: 'NTt3st1!'
						}
					})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveWithdrawalTax() {
			return new Promise((resolve, reject) => {
				axios.get('/withdrawal/deadlines')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		calcWithdrawalTax(context, withdrawal) {
			return new Promise((resolve, reject) => {
				axios.post('/withdrawal/calc', withdrawal)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendDraft(context, draft) {
			return new Promise((resolve, reject) => {
				axios.post('/draft/send', draft)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendCancelDraft(context, draft) {
			return new Promise((resolve, reject) => {
				axios.post('/draft/cancel', draft)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveBuyTax(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/orders/estimateBuyTax/', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveSellTax(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/orders/estimateSellTax/', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendOrderBuy(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/orders/buy', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendOrderSell(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/orders/sell', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveOrder(context, order) {
			return new Promise((resolve, reject) => {
				axios.get('/order/' + order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveCoinAssets(context) {
			return new Promise((resolve, reject) => {
				axios.get('/assets/coins')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveCoinAssetsChart(context) {
			return new Promise((resolve, reject) => {
				axios.get('/assets/coins-chart')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveConversion(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/convert', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveBuyConversion(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/convert-buy', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		convertAmount(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/convert-amount', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		convertBuyAmount(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/convert-buy-amount', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		conversionList(context) {
			return new Promise((resolve, reject) => {
				axios.get('/conversion-list')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		myCoinsList() {
			return new Promise((resolve, reject) => {
				axios.get('/my-coins-list')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveConversionTx(context, tx) {
			return new Promise((resolve, reject) => {
				axios.get('/conversion/' + tx)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveLevels(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/levels')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserMiningGatewayPending() {
			return new Promise((resolve, reject) => {
				axios.get('/mining/pending-gateway')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserMiningStats() {
			return new Promise((resolve, reject) => {
				axios.get('/mining/user-stats')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserRewardChart() {
			return new Promise((resolve, reject) => {
				axios.get('/mining/user-reward-chart')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendBuyThs(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/mining/buy-ths', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		retrievePharaosGatewayKey(context, order) {
			return new Promise((resolve, reject) => {
				axios.get('/pharaos-gateway/get-key', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storePharaosGatewayKey(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/pharaos-gateway/new-key', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		updatePharaosGatewayKey(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/pharaos-gateway/update-key', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		estimateGatewayPayment(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/gateway/estimate-payment', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storeGatewayPayment(context, order) {
			return new Promise((resolve, reject) => {
				axios.post('/gateway/new-payment', order)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},

		updateGatewayPayment(context, transaction) {
			return new Promise((resolve, reject) => {
				axios.post('/gateway/update-tx/', transaction)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveFavAccount(context, email) {
			return new Promise((resolve, reject) => {
				axios.get('/user/fav-account/' + email)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveFavAccounts(context) {
			return new Promise((resolve, reject) => {
				axios.get('/user/fav-accounts/')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveSearchEmail(context, email) {
			return new Promise((resolve, reject) => {
				axios.post('/user/search-account', {
					email: email
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storeFavAccount(context, email) {
			return new Promise((resolve, reject) => {
				axios.post('/user/fav-account', {
					email: email
				})
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendTransfer(context, transfer) {
			return new Promise((resolve, reject) => {
				axios.post('/draft/credminer', transfer)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendTransferUsd(context, transfer) {
			return new Promise((resolve, reject) => {
				axios.post('/draft-usd/credminer', transfer)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveLastTrades(context) {
			return new Promise((resolve, reject) => {
				axios.get('/exchange/last-trades')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveInvestmentData(context, id) {
			return new Promise((resolve, reject) => {
				axios.get('/nanotech/data/' + id)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		sendInvestment(context, investment) {
			return new Promise((resolve, reject) => {
				axios.post('/nanotech/send/', investment)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		withdrawalInvestment(context, investment) {
			return new Promise((resolve, reject) => {
				axios.post('/nanotech/withdrawal/', investment)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveFundsList() {
			return new Promise((resolve, reject) => {
				axios.get('/funds/list')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveFundChart(context, fund) {
			return new Promise((resolve, reject) => {
				axios.get('/funds/chart/' + fund)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserFunds() {
			return new Promise((resolve, reject) => {
				axios.get('/funds/user-list/')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		// buyIndexFund(context, fund) {
		// 	return new Promise((resolve, reject) => {
		// 		axios.post('/funds/buy', fund)
		// 			.then(response => {
		// 				resolve(response)
		// 			})
		// 			.catch(error => {
		// 				reject(error)
		// 			})
		// 	})
		// },
		fundEarlyRedemption(context, fund) {
			return new Promise((resolve, reject) => {
				axios.post('/funds/earlyRedemption', fund)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		fundWithdrawal(context, fund) {
			return new Promise((resolve, reject) => {
				axios.post('/funds/withdrawal', fund)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveBuyTaxFund(context, fund) {
			return new Promise((resolve, reject) => {
				axios.post('/funds/estimate-buy-tax', fund)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveSellTaxFund(context, fund) {
			return new Promise((resolve, reject) => {
				axios.post('/funds/estimate-sell-tax', fund)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveQuotes() {
			return new Promise((resolve, reject) => {
				axios.get('/coins/quotes')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveServerTime() {
			return new Promise((resolve, reject) => {
				axios.get('/time')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		get2FaQrCode() {
			return new Promise((resolve, reject) => {
				axios.get('/2fa/qr-code')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		activate2Fa(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/2fa/activate', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		deactivate2Fa(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/2fa/deactivate', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		buyLevel(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/levels/buy', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		buyLevelUsd(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/levels/buyUsd', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		buyLevelLqx(context, data) {
			return new Promise((resolve, reject) => {
				axios.post('/levels/buyLqx', data)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveMasternodes() {
			return new Promise((resolve, reject) => {
				axios.get('/masternode/list')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserTicketsStatus() {
			return new Promise((resolve, reject) => {
				axios.get('/user/tickets/status')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserTicketsDepartments() {
			return new Promise((resolve, reject) => {
				axios.get('/user/tickets/departments')
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		retrieveUserTicketsList(context, page) {
			return new Promise((resolve, reject) => {
				axios.get('/user/tickets?page=' + page)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storeUserTicket(context, ticket) {
			return new Promise((resolve, reject) => {
				axios.post('/user/tickets', ticket)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		storeUserTicketMessage(context, message) {
			return new Promise((resolve, reject) => {
				axios.post('/user/tickets/message', message)
					.then(response => {
						resolve(response)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
    retrieveGatewayPayment(context, tx) {
      return new Promise((resolve, reject) => {
        axios.get('/credminer/gateway/status/' + tx)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
	}
})
