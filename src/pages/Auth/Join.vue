<template>
    <div class="row text-center" style="margin-top: 50px;">
      <loading :active.sync="isLoading" :is-full-page="true" :loader="'bars'" :color="'#AA439D'" :background-color="'#000'" :opacity="0.8"></loading>
        <div class="col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-10 offset-1">
            <card type="user">
                <p class="card-text"></p>
                <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <a href="#">
                    <img class="avatar" src="img/logotipo.jpg" alt="..." />
                    <h5 class="title">Seu kit de ferramentas definitivo.</h5>
                </a>
                <p class="description">
                    Crie anúncios de forma automática.
                </p>
                </div>
                <p></p>
                <p class="card-description">
                    <button class="btn" @click="signInWithGoogle">Entrar com Google</button>
                </p>
            </card>
        </div>
    </div>
  </template>
  
  <script>
  import { auth, provider } from '@/firebase';
  import { signInWithPopup } from 'firebase/auth';
  import store from '@/store/index';

  // Import component
  import Loading from 'vue-loading-overlay';
  // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';
  
  export default {
    name: 'Join',
    components: {
        Loading
    },
    data() {
      return {
          isLoading: false,
      }
    },
    methods: {
      async signInWithGoogle() {
        try {
          this.isLoading = true;
          const result = await signInWithPopup(auth, provider);
          
          store.dispatch('join', result);

          this.$notify({
            message: this.$t('join.welcome'),
            icon: 'tim-icons icon-bell-55',
            horizontalAlign: 'center',
            verticalAlign: 'top',
            type: 'success',
            timeout: 3000,
          });
          this.isLoading = false;
          this.$router.push('/dashboard');
        } catch (error) {
          this.isLoading = false;
          console.error(error);
        }
      }
    },
    mounted() {
        if ( Object.keys(store.getters.getUser).length > 0 ) {
          this.$router.push('/dashboard');
        }
    }
  }
  </script>
  
  <style>
  .join-container {
    /* Estilize seu botão de login conforme necessário */
  }
  </style>
  