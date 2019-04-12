<template>
    <div>
        <vue-headful
                title="Liquidex - Verificação de Email"
                description="Criação de conta na Liquidex"
        />
        <div class="auth-wrapper">
            <div class="all-wrapper menu-side with-pattern">
                <div class="auth-box-w">
                    <div class="logo-w">
                        <a href="">
                            <img src="https://s3.amazonaws.com/navi-public/api/clients/3/cbed47c0-5323-4873-baf7-0284f80bbf0a.png"
                                 class="logo">
                        </a>
                    </div>
                    <form action="">
                        <div class="form-group text-dark">
                            <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                            Seu email foi verificado com sucesso, agora você já pode logar.
                        </div>
                        <router-link to="/login" ref="login" class="btn btn-primary btn-block">Entrar</router-link>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

	export default {
		name: 'VerifyEmail',
		// updated: function () {
		// 	this.$nextTick(function () {
		// 		setTimeout(function () {
		// 			this.$refs.login.click()
		// 		}, 3000)
		// 	})
		// },

	}
</script>

<style scoped>
    img.logo {
        width: 235px;
    }

    .auth-wrapper.with-pattern {
        position: relative;
    }

    .auth-wrapper:after, .auth-wrapper:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        content: "";
        z-index: -1;
    }

    .btn-register {
        padding: 10px;
    }

    .auth-wrapper {
        min-height: 100%;
        min-width: 1024px;
        width: 100%;
        height: auto;
        position: fixed;
        top: 0;
        left: 0;
        color: #fff;
        background: linear-gradient(-45deg, #020024, #090979, #00d4ff);
        background-size: 400% 400%;
        -webkit-animation: Gradient 15s ease infinite;
        -moz-animation: Gradient 15s ease infinite;
        animation: Gradient 15s ease infinite;
    }

    @-webkit-keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

    @-moz-keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }

    @keyframes Gradient {
        0% {
            background-position: 0% 50%
        }
        50% {
            background-position: 100% 50%
        }
        100% {
            background-position: 0% 50%
        }
    }
</style>