<template>
  <div id="app">
    <div class="listado-regalos">
      <div class="inner-left">
        <div class="inner-right">
          <div class="fila">
            <div class="columna header">
              <div class=" titulo">
                <h2 class="al-centro">Baby Shower</h2>
                <h1 class="al-centro">Emiliano</h1>
                <h2 class="al-centro">Lista de regalos</h2>
              </div>
              <div class="emiliano">
              </div>
              <div class="invader"></div>
            </div>
            <div class="columna regalos">
              <div class="container grid">
                <div class="row wrap-it">
                  <div class="column regalo" v-for="(regalo, key, index) in regalos" :key="key">
                    <div class="inner">
                      <img :src="regalo.imagen" alt="">
                      <button v-if="!regalo.seleccionado" class="btn-regalar" @click="select(regalo)">
                        <img src="./assets/images/regalar.png" alt="">
                      </button>
                      <button v-else class="btn-regalar">
                        <img src="./assets/images/regalado.png" alt="">
                      </button>
                      <h3>{{regalo.nombre}}</h3>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import _ from 'lodash'
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
let app = Firebase.initializeApp(config)
let db = app.database()

let regalosRef = db.ref('regalos')


export default {
  name: 'app',
  firebase: {
    'regalos': regalosRef
  },
  data() {
    return {
      msg: 'ok'
    }
  },
  computed: {
  },
  methods: {
    'select': function (regalo) {
      if (confirm('Deseas reglar: '+regalo.nombre+'?')){
        regalo.seleccionado = !regalo.seleccionado
        let regaloSelected = _.clone(regalo)
        
        delete regaloSelected['.key']
        // console.log(regaloSelected)
        this.$firebaseRefs.regalos.child(regalo['.key']).set(regaloSelected)
      // 
      }
    }
  }

}
</script>

<style lang="scss">
// @import './node_modules/sass-mq/_mq';
// $mq-responsive: true;
// $mq-show-breakpoints: (mobile, mobileLandscape, tablet, desktop, wide);
// $mq-breakpoints: ( mobile: 320px,
//                   tablet: 740px,
//                   desktop: 980px,
//                   wide: 1300px, // Tweakpoints
//                   desktopAd: 810px,
//                   mobileLandscape: 480px);
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.listado-regalos,
.inner-left,
.inner-right {
  height: 100vh;
  overflow: hidden;
}

.header {
  min-height: 190px;
}

.listado-regalos {
  background: url('./assets/images/fondo-cesped.png') no-repeat bottom left;
  background-size: contain;
  background-position: 0px 130px;
  @media (min-width: 40.0rem) {
    background-position: bottom left;
  }
}

.fila {
  display: flex;
  flex-direction: column;
  @media (min-width: 40.0rem) {
    flex-direction: row;
  }
}

.columna {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h1,
h2 {
  font-weight: normal;
  margin: 0;
}

.al-centro {
  text-align: center;
}

.wrap-it {
  flex-wrap: wrap;
}

@media (min-width: 40.0rem) {
  .inner-left {
    background: url('./assets/images/fondo-vertical.png') no-repeat center right;
    background-size: contain;
  }

  .inner-right {
    background: url('./assets/images/fondo-vertical.png') no-repeat center left;
    background-size: contain;
  }
}

.titulo {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
  background: rgba(255, 255, 255, .8);
  @media (min-width: 40.0rem) {
    margin-top: 16rem;
    margin-left: auto;
    background: none;
  }
  h1 {
    font-family: 'Yellowtail', script;
    font-size: 70px;
    line-height: 60px;
    @media (min-width: 40.0rem) {
      font-size: 120px;
      line-height: 130px;
    }
  }
  h2 {
    font-family: 'Oswald', serif;
    font-size: 20px;
    line-height: 24px;
    @media (min-width: 40.0rem) {
      font-size: 40px;
      line-height: 54px;
    }
  }
}

.regalos {
  height: 80vh;
  overflow: auto;
  @media (min-width: 40.0rem) {
    height: 100vh;
  }
  .regalo {
    max-width: 95%;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 40.0rem) {
      max-width: 50%;
      margin-left: 0;
      margin-right: 0;
    }
    .inner {
      background: #fff;
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
      border-radius: 5px;
      >img {
        max-width: inherit;
        width: 100%;
        height: 220px;
      }
    }
    h3 {
      padding: 30px 2rem 10px;
      font-size: 18px;
      margin: 0;
      line-height: 20px;
    }
  }
}

.btn-regalar {
  border-radius: 50%;
  width: 54px;
  height: 54px;
  padding: 0;
  line-height: 0;
  overflow: hidden;
  border: 2px solid #fff;
  margin-top: -35px;
  background: #fff;
  margin-left: -30px;
  position: absolute;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, .3);
  &:hover {
    background-color: #43f160;
    border-color: #43f160;
  }
}

.btn-ok {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  border: 2px solid #fff;
  margin-top: -35px;
  margin-left: -30px;
  position: absolute;
}

.grid {
  background-color: rgba(255, 255, 255, 0.9);
  margin-top: 3rem;
}

.emiliano {
  @media (min-width: 40.0rem) {
    bottom: 9%;
    left: 11%;
    top: initial;
  }

  position: absolute;
  bottom: initial;
  top: 15%;
  left: 11%;
  width: 13%;
  padding-bottom: 20%;
  background: url('./assets/images/emiliano.png') no-repeat center center;
  background-size: contain;
}

.invader {
  position: absolute;

  top: 16%;
  left: 15%;
  bottom: initial;
  transform: scale(0.11);
  @media (min-width: 40.0rem) {
    bottom: 22%;
    left: 18%;
    top: initial;
    transform: scale(0.25);
  }
  &:after {
    content: '';
    display: block;
    box-shadow: 0px 22px 17px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 360px;
    height: 20px;
    border-radius: 50%;
    top: 280px;
    left: 20px;
  }
}

.invader {
  width: 30px;
  height: 30px;
  margin-top: 5%;
  margin-left: 10%;
  background: transparent;
  box-shadow: 85px 0 #e6511d, 120px 35px #e6511d, 120px 70px #e6511d, 85px 70px #e6511d, 85px 105px #e6511d, 50px 105px #e6511d, 50px 140px #e6511d, 15px 140px #e6511d, 15px 175px #e6511d, 15px 210px #e6511d, 85px 140px #e6511d, 85px 175px #e6511d, 85px 210px #e6511d, 120px 245px #e6511d, 155px 245px #e6511d, 120px 140px #e6511d, 155px 140px #e6511d, 155px 105px #e6511d, 155px 70px #e6511d, 190px 140px #e6511d, 190px 105px #e6511d, 190px 70px #e6511d, 225px 140px #e6511d, 225px 105px #e6511d, 225px 70px #e6511d, 260px 70px #e6511d, 260px 140px #e6511d, 260px 35px #e6511d, 295px 0 #e6511d, 295px 70px #e6511d, 295px 105px #e6511d, 295px 140px #e6511d, 295px 175px #e6511d, 295px 210px #e6511d, 225px 245px #e6511d, 260px 245px #e6511d, 330px 105px #e6511d, 330px 140px #e6511d, 365px 140px #e6511d, 365px 175px #e6511d, 365px 210px #e6511d;
  -webkit-animation: ani 2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: steps(1);
}

@-webkit-keyframes ani {

  50% {
    box-shadow: 85px 0 #e6511d, 120px 35px #e6511d, 120px 70px #e6511d, 85px 70px #e6511d, 85px 105px #e6511d, 50px 105px #e6511d, 50px 140px #e6511d, 15px 140px #e6511d, 15px 70px #e6511d, 15px 105px #e6511d, 85px 140px #e6511d, 85px 175px #e6511d, 85px 210px #e6511d, 50px 245px #e6511d, 50px 175px #e6511d, 120px 140px #e6511d, 155px 140px #e6511d, 155px 105px #e6511d, 155px 70px #e6511d, 190px 140px #e6511d, 190px 105px #e6511d, 190px 70px #e6511d, 225px 140px #e6511d, 225px 105px #e6511d, 225px 70px #e6511d, 260px 70px #e6511d, 260px 140px #e6511d, 260px 35px #e6511d, 295px 0 #e6511d, 295px 70px #e6511d, 295px 105px #e6511d, 295px 140px #e6511d, 295px 175px #e6511d, 295px 210px #e6511d, 330px 245px #e6511d, 330px 175px #e6511d, 330px 105px #e6511d, 330px 140px #e6511d, 365px 140px #e6511d, 365px 70px #e6511d, 365px 105px #e6511d;
  }
}
</style>
