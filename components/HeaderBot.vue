<template>
  <section :class=" `header__nav ${headerScroll ? 'activeScroll' : ''}` ">
    <nav class="conteiner">
      <div @click="toogleMenu(true)" class="burger">
        <span></span>
        <span></span>
        <span></span>
      </div>  
      <ul>
        <li>
          <nuxt-link class="add-elem" to="/">
            Все посты 
          </nuxt-link>   
        </li>
        <li v-for="category, key of categories" :key="key">
          <nuxt-link :to="{name:`category-id`, params:{id:category._id}}" class="add-elem">
            {{category.title}} 
            <i class="fas fa-arrow-down"></i>
          </nuxt-link>
          <NavModalWindow :childCategories="category.childCategories" />
        </li>
      </ul>
    <div>
      <nuxt-link :to="{name:`Search`}"><i class="fas fa-search"></i></nuxt-link>
      <a class="telegram" href="https://t.me/findhubru"><i class="fab fa-telegram-plane"></i></a>
      <a class="instagram" href="https://www.instagram.com/findhub.ru/"><i class="fab fa-instagram"></i></a>
    </div>
  </nav>
</section>
</template>

<script>

  import { mapGetters, mapActions, mapMutations } from "vuex"   
  
  export default {
    name: 'HeaderBot',
    components:{ NavModalWindow:() =>  import ("@/components/NavModalWindow") },
    data(){
      return{
      headerScroll:false,
    }
    },
    methods:{
      ...mapMutations({
        toogleMenu:'main/toogleMenu',
      }),
      ...mapActions({
        fetchCategories:'category/fetchCategories',
      }),
      modals(elemMove,elemModals){
        let elems = document.querySelectorAll(elemMove);
        for(let elem of elems){
          elem.addEventListener("mouseover",function(){
            if(this.parentNode.querySelector(elemModals)) {
              let modal = this.parentNode.querySelector(elemModals);
              let arrow = this.querySelector('i');
              let link = this;

              link.classList.add('active');
              modal.classList.add('active');
              arrow.classList.add('active');

              let hook = function(){
                modal.querySelectorAll('li').forEach(item => {
                  item.classList.add('active'); 
                });
              }

              modal.addEventListener('transitionend', hook);

              this.parentNode.addEventListener("mouseout",function(event){
                if(this.contains(event.relatedTarget)){
                  return
                }else{

                  modal.removeEventListener('transitionend', hook);

                  modal.querySelectorAll('li').forEach(item => {
                    item.classList.remove('active');  
                  });

                  modal.classList.remove('active');
                  link.classList.remove('active');
                  arrow.classList.remove('active');
                }
              });
            } 
          });
        }
      },
      scrollNav(){
        window.addEventListener('scroll',()=>{
          if(window.scrollY > 200){ 
            this.headerScroll = true;
          }else{ 
            this.headerScroll = false;
          } });
          
        } 

    },
    computed: {
      ...mapGetters({
        categories:'category/categories',
      }),      
    },
    async fetch(){
      await this.fetchCategories();
    },
    mounted(){
      this.modals('.add-elem','.header__modal'),
      this.scrollNav()
    },

  }
</script>

<style scoped lang="scss">
  .conteiner{
    align-items:center;
  }
  .header__nav.activeScroll{ 
    position: sticky;
    top: 0;
    height: 50px;
    z-index: 4;
    a{
      font-size: 18px;
    }
  }
  .header__nav{
    width:100%;
    padding:0px 20px 0px 20px;
    background:#262626;
    box-shadow:0px 3px 5px #000;
    color:#fff;
    height:80px;
    transition: .5s all;
    top: -80px;

    nav{
      display:flex;
      height:100%;
      .telegram{
        height:100%;
        color:#0088cc;
        margin:0px 15px;
        transition: .3s all;
      }
      .instagram{
        height:100%;
        color:#e1306c;
        transition: .3s all;
      }
      ul{
        display: flex;
        @media(max-width:1170px){
          display:none;
        }
        li{
          position:relative;
          margin-right:40px; 
          padding:10px 0px;
          &:last-child{
            margin-right:0px;
          }
          a{
            height:100%;
            color:#fff;
            font-size:22px;
            transition: .3s all;
            &:hover{
              color:#4faab3;
            }
            &:hover i{
              color:#4faab3;
            }
            &.active{
              color:#4faab3;
            }
            i{
              font-size:14px;
              &.active{
                color:#4faab3;
                transform:rotate(90deg);
              }
            }
          }
          
        }
      }
      i{
        font-size:30px;
        color:#fff;
        transition:.3s all;
        &:hover{
          color:#4faab3;
        }  
      }
    }
  }
</style>
