<template>
  <div class="navBar">
    <nav>
      <div class="header">
        <div class="left">
          <div class="greeting-text text-subtitle-2 font-weight-bold" v-if="!isMobile">{{getGreetings}}</div>
          <div @click="slideDrawer" ref="burger" class="burger" v-else>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </div>
        </div>
        <div class="middle">
          <div class="logo">
            <img src="../../../../assets/technogram-logo.png" />
          </div>
        </div>
        <div class="right">
          <div class="navigation" v-if="!isMobile">
            <img class="item img-btn" src="../../../../assets/icons/search-icon.png" />
            <div class="loggedIn" v-if="isLoggedIn">
              <img class="item img-btn" src="../../../../assets/icons/bell.png" />
              <img class="item img-btn" src="../../../../assets/icons/profile.png" />
            </div>
            <div class="public" v-else>
              <v-btn class="item btn" color="#E52B38" small>Sign in</v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="item" v-if="!isMobile">
        <v-btn 
        text small
        :class='menuClass(index)' 
        v-for="(menu,index) in menus" 
        :key='menu.id'
        @click="onMenuSelected(index)"
        >{{menu.name}}</v-btn>
      </div>
    </nav>
    <transition :name="transitionName">
      <div class="drawer" v-if="shouldShowDrawer">
        <nav-drawer :menus="menus" :onClicked="onMenuSelected" :currentSelected="selectedMenu"></nav-drawer>
      </div>
    </transition>
  </div>
</template>

<script>
import NavDrawer from "./NavDrawer.vue";
const TEN_MINUTES = 1000 * 60 * 10;
export default {
  created(){
    this.currentTime = new Date().getHours();
    setInterval(()=>{
      this.currentTime = new Date().getHours();
    }, TEN_MINUTES)
  },
  components: { NavDrawer },
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDrawerShown: false,
      isDrawerAnimationNeeded: false,
      menus: [
        { id :1 , name : 'Home'},
        { id: 2, name: "Software" },
        { id: 3, name: "Brainware" },
        { id: 4, name: "Hardware" },
        { id :5 , name : 'More'}
      ],
      selectedMenu : 1,
      currentTime : null
    };
  },
  computed: {
    getGreetings(){
      const MORNING = this.currentTime > 0 && this.currentTime < 11;
      const NOON = this.currentTime > 11 && this.currentTime <  14;
      const AFTERNOON = this.currentTime > 14 && this.currentTime < 18;
      
      if(MORNING){
        return 'Good Morning!'
      }
      if(NOON){
        return 'Good Day !'
      }
      if(AFTERNOON){
        return 'Good Afternoon !'
      }
      return 'Good Evening !'

    },
    isMobile() {
      if (this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs) {
        return true;
      } else {
        return false;
      }
    },
    shouldShowDrawer() {
      return this.isMobile && this.isDrawerShown;
    },
    transitionName(){
      console.log(this.isMobile)
      return this.isMobile ? 'slide' : ''
    }
  },
  methods: {
    slideDrawer() {
      this.isDrawerShown = !this.isDrawerShown;
      //burger animation
      this.$refs.burger.classList.toggle("toogle");
      // if(this.isDrawerShown){

      // }
    },
    menuClass(index){
      return index === this.selectedMenu ? 'button text-decoration-underline'  : 'button'
    },
    onMenuSelected(index){
      this.selectedMenu = index;
    }
  },
  watch: {
    isMobile(value){
      if(this.isDrawerShown){
        value;
        this.isDrawerShown = false;
        this.$refs.burger.classList.toggle("toogle");
      }
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Work Sans', sans-serif;
}



nav {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.356);
  position: fixed;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
  z-index: 99;
}

.header {
  display: flex;
  padding: 1rem;
  align-items: center;
  border-bottom: 0.1px solid rgb(112, 112, 112, 0.3);
}

/* Left header */
.header .left {
  flex: 1 1 5rem;
  display: flex;
  align-items: center;
}

/* Logo */
.header .middle {
  display: flex;
  flex: 2 1 5rem;
  justify-content: center;
}

.header .middle .logo {
  flex: 1 0 1rem;
  display: flex;
  justify-content: center;
}

.header .middle .logo img {
  cursor: pointer;
}

/* Navigations */
.header .right {
  display: flex;
  flex: 1 1 5rem;
  justify-content: right;
  align-items: center;
}

.header .right .navigation {
  display: flex;
  flex: 1 1 5rem;
  justify-content: right;
  align-items: center;
}

.header .right .navigation img {
  width: 1.2=rem;
  height: 1.2rem;
}
.header .right .navigation .item {
  margin-right: 1rem;
}

.header .right .navigation .loggedIn {
  display: flex;
}

.header .right .navigation .public .btn {
  color: white;
}

.img-btn {
  cursor: pointer;
}

.img-btn:hover {
  background: rgba(80, 80, 80, 0.164);
}
/* item */
.item {
  display: flex;
  justify-content: center;
}

.item .button {
  margin: 1rem;
}

.drawer {
  padding: 1rem;
  width : 100%;
}

/* For LG - XL */
@media screen and (min-width: 940px) {
  .header .right .navigation img {
    width: 1.2rem;
    height: 100%;
  }
  .header .middle .logo img {
    width: 6rem;
  }
}

/* For XS */
@media screen and (max-width: 960px) {
  .header .middle .logo img {
    width: 5rem;
    height: 100%;
  }

  .burger {
    cursor: pointer;
  }
  .burger div {
    width: 24px;
    height: 1.5px;
    background: #707070;
    margin: 5px;
    cursor: pointer;
  }

  .header {
    backface-visibility: visible;
    display: flex;
    padding: 1rem;
    align-items: center;
    border: none;
  }
  nav {
    background: white;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.247);
    width: 100%;
    position: fixed;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.356);
  }
  .navBar {
    overflow-x: hidden;
  }
  .drawer {
    position: absolute;
    top: 8.5vh;
    z-index: 90;
  }

  .slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  transition: opacity 2s;
  opacity: 0;
  position: absolute;
  }
}

@media screen and (max-height: 500px) {
  .drawer{
    top:14vh;
  }
}

/* Animations */

/* slide */
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 2s;
}


@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}

/* fade */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}


/* Burger rotation */
.toogle .line1 {
  transform: rotate(-45deg) translate(-5px, 5px);
}

.toogle .line2 {
  opacity: 0;
}

.toogle .line3 {
  transform: rotate(45deg) translate(-5px, -3px);
}
</style>