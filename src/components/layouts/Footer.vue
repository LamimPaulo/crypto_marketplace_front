<template>
    <footer class="footer">
        <div class="footer-left col-md-6">
            <p class="about">
                <span> Sobre</span> A Liquidex é uma empresa de ativos digitais diferenciada baseada em cinco pilares: segurança, tecnologia, compliance, mineração e arbitragens. Todos eles sustentados pela experiência comprovada dos dirigentes nestas áreas tendo como acionista principal à holding MDX Rental S/A.
            </p>
        </div>
        <div class="footer-center col-md-6">
            <div>
                <i class="far fa-clock"></i>
                <p><span> Seg-Sex</span> 09:00 às 17:00</p>
            </div>

            <div>
                <i class="fa fa-envelope"></i>
                <p><a href="#"> atendimento@liquidex.com.br</a></p>
            </div>
        </div>
        <div class="footer-right col-md-6">
            <h2><span>Liquid</span>ex</h2>
            <p class="menu">
                <a target="_blank" href="https://liquidex.com.br/#lqx"> Sobre</a> |
                <a target="_blank" href="https://liquidex.com.br/#simulator"> Simulação</a> |
                <a target="_blank" href="https://liquidex.com.br/#contact"> Contato</a> |
                <a target="_blank" href="https://liquidex.com.br/#faq"> FAQ</a>
            </p>
            <div class="icons">
                <a href="https://www.facebook.com/liquidex" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
            <p class="name"> Liquidex &copy; 2019</p>
        </div>

        <router-link to="/tickets" class="suport-ballon pointer">
            <i class="os-icon os-icon-others-43 mr-2"></i>
            Suporte
        </router-link>

    </footer>
</template>

<script>
	export default {
		name: "Footer"
	}
</script>
<style lang="" scoped>
    .suport-ballon {
        padding: 10px 20px;
        cursor: pointer;
        position: fixed;
        background-color: rgb(42, 68, 93);
        color: rgb(255, 255, 255);
        min-width: 140px;
        height: 48px;
        font-weight: bold;
        font-size: 16px;
        border-radius: 6px;
        bottom: 15px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 8px 6px -6px;
        right: 15px;
        text-decoration: none;
    }

    .footer {
        background-color: #414141;
        width: 100%;
        text-align: left;
        font-family: sans-serif;
        font-weight: bold;
        font-size: 16px;
        padding: 50px;
        /*margin-top: 50px;*/
    }

    .footer .footer-left,
    .footer .footer-center,
    .footer .footer-right {
        display: inline-block;
        vertical-align: top;
    }

    .footer .footer-right {
        text-align: right;
    }

    /* footer left*/

    .footer .footer-left {
        width: 33%;
        padding-right: 15px;
    }

    .footer .about {
        line-height: 20px;
        color: #ffffff;
        font-size: 13px;
        font-weight: normal;
        margin: 0;
    }

    .footer .about span {
        display: block;
        color: #ffffff;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .footer .icons {
        margin-top: 25px;
    }

    .footer .icons a {
        display: inline-block;
        width: 35px;
        height: 35px;
        cursor: pointer;
        background-color: #33383b;
        border-radius: 2px;
        font-size: 20px;
        color: #ffffff;
        text-align: center;
        line-height: 35px;
        margin-right: 3px;
        margin-bottom: 5px;
    }


    /* footer center*/

    .footer .footer-center {
        width: 30%;
    }

    .footer .footer-center i {
        background-color: #33383b;
        color: #ffffff;
        font-size: 25px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        text-align: center;
        line-height: 42px;
        margin: 10px 15px;
        vertical-align: middle;
    }

    .footer .footer-center i.fa-envelope {
        font-size: 17px;
        line-height: 38px;
    }

    .footer .footer-center p {
        display: inline-block;
        color: #ffffff;
        vertical-align: middle;
        margin: 0;
    }

    .footer .footer-center p span {
        display: block;
        font-weight: normal;
        font-size: 14px;
        line-height: 2;
    }

    .footer .footer-center p a {
        color: #0099ff;
        text-decoration: none;
    }


    /* footer right*/

    .footer .footer-right {
        width: 35%;
    }

    .footer h2 {
        color: #ffffff;
        font-size: 36px;
        font-weight: normal;
        margin: 0;
    }

    .footer h2 span {
        color: #0099ff;
    }

    .footer .menu {
        color: #ffffff;
        margin: 20px 0 12px;
        padding: 0;
    }

    .footer .menu a {
        display: inline-block;
        line-height: 1.8;
        text-decoration: none;
        color: inherit;
    }

    .footer .menu a:hover {
        color: #0099ff;
    }

    .footer .name {
        color: #0099ff;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
    }

    @media (max-width: 767px) {
        .footer {
            font-size: 14px;
        }

        .footer .footer-left,
        .footer .footer-center,
        .footer .footer-right {
            display: block;
            width: 100%;
            margin-bottom: 40px;
            text-align: center;
        }

        .footer .footer-center i {
            margin-left: 0;
        }
    }
</style>