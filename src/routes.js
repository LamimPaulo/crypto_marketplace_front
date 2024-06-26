import Logout from './components/auth/Logout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';
import SendResetPassword from './components/auth/SendResetPassword';
import RequestResetPassword from './components/auth/RequestResetPassword';
import Dashboard from './components/Dashboard';
import Profile from './components/user/profile/Profile';
import User from './components/layouts/User';
import UserLayout from './components/layouts/User';
import Transactions from './components/layouts/Transactions';
import TransactionsList from './components/user/transactions/TransactionsList';
import WalletList from './components/user/wallets/WalletList';
import Order from './components/user/orders/Order';
import WalletCrypto from './components/user/wallets/WalletCrypto';
import WalletFiat from './components/user/wallets/WalletFiat';
import Conversion from './components/user/orders/Conversion';
import NanotechLQX from './components/trader/NanotechLQX';
import Masternode from './components/masternode/Masternode';
import UserGateway from './components/user/gateway/UserGateway';
import PharaosGateway from './components/user/pharaos-gateway/PharaosGateway';
import UserGatewayPayments from './components/user/gateway/UserGatewayPayments';
import UserTickets from './components/user/UserTickets';
import UserGatewayPdv from './components/user/gateway/UserGatewayPdv';
import Gateway from './components/user/gateway/Gateway';
import IndexFunds from './components/user/funds/IndexFunds';
import LevelList from './components/user/levels/LevelList';
import NotificationsList from './components/user/notifications/NotificationsList';
import ReadNotification from './components/user/notifications/ReadNotification';
import Mining from './components/mining/Mining';

const routes = [
    {
        path: '/gateway/tx/:tx',
        name: 'gateway-tx',
        component: Gateway,
    },
    {
        path: '/',
        name: '/',
        component: Login,
        meta: {requiresVisitor: true}
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {requiresVisitor: true}
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {requiresAuth: true}
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {requiresVisitor: true}
    },
    {
        path: '/signup',
        name: 'signup',
        component: Register,
        meta: {requiresVisitor: true}
    },
    {
        path: '/register/verify',
        name: 'register-verify',
        component: VerifyEmail,
        meta: {requiresVisitor: true}
    },
    {
        path: '/recover/password',
        name: 'recover/password',
        component: SendResetPassword,
        meta: {requiresVisitor: true}
    },
    {
        path: '/request/password',
        name: 'request/password',
        component: RequestResetPassword,
        meta: {requiresVisitor: true}
    },
    {
        path: '/user',
        component: User,
        meta: {requiresAuth: true},
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: Profile,
                meta: {requiresAuth: true}
            }, {
                path: '/notifications',
                name: 'notifications',
                component: NotificationsList,
                meta: {requiresAuth: true}
            }, {
                path: '/notification/:id',
                name: 'read-notification',
                component: ReadNotification,
                meta: {requiresAuth: true}
            },
        ]
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {requiresAuth: true}
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: Transactions,
        meta: {requiresAuth: true},
        children: [
            {
                path: '/transactions/list',
                name: 'transactions-list',
                component: TransactionsList,
                meta: {requiresAuth: true}
            },
            {
                path: '/order/:id',
                name: 'order',
                component: Order,
                meta: {requiresAuth: true}
            },
            {
                path: '/wallets/list',
                name: 'wallets-list',
                component: WalletList,
                meta: {requiresAuth: true}
            },
            {
                path: '/wallet/c/:symbol',
                name: 'walletCrypto',
                component: WalletCrypto,
                meta: {requiresAuth: true}
            },
            {
                path: '/wallet/f/:symbol',
                name: 'walletFiat',
                component: WalletFiat,
                meta: {requiresAuth: true}
            },
            {
                path: '/conversion/:id',
                name: 'conversion',
                component: Conversion,
                meta: {requiresAuth: true}
            },
            {
                path: '/index/fund',
                name: 'index-fund',
                component: IndexFunds,
                meta: {requiresAuth: true}
            },
        ]
    },
    {
        path: '/investments',
        component: UserLayout,
        meta: {requiresAuth: true},
        children: [
            {
                path: '/nanotech/lqx',
                name: '/nanotech/lqx',
                component: NanotechLQX,
                meta: {requiresAuth: true}
            },
            {
                path: '/masternode',
                name: '/masternode',
                component: Masternode,
                meta: {requiresAuth: true}
            },
            {
                path: '/mining',
                name: '/mining',
                component: Mining,
                meta: {requiresAuth: true}
            },
        ]
    },
    {
        path: '/gateway',
        name: 'gateway',
        component: UserGateway,
        meta: {requiresAuth: true}
    },
    {
        path: '/gateway-mmn',
        name: 'gateway-mmn',
        component: PharaosGateway,
        meta: {requiresAuth: true}
    },
    {
        path: '/gateway/pdv',
        name: 'gateway-pdv',
        component: UserGatewayPdv,
        meta: {requiresAuth: true}
    },
    {
        path: '/gateway/payments',
        name: 'gateway-payments',
        component: UserGatewayPayments,
        meta: {requiresAuth: true}
    },
    {
        path: '/levels',
        name: 'levels',
        component: LevelList,
        meta: {requiresAuth: true}
    },
    {
        path: '/tickets',
        name: 'tickets',
        component: UserTickets,
        meta: {requiresAuth: true}
    },
];

export default routes
