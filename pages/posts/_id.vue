<template> 
  <div class="wrapper"> 
    <div class="single__header"> 
      <div class="hidden__wrapper"></div> 
      <img :alt="post.alt" :src="`/img/${post.imageUrl}`" class="single__img"> 
      <div class="single__head"> 
        <span class="single__date">{{post.data}}</span> 
        <h1 class="single__title">{{post.title}}</h1> 
        <div class="single__scroll">  
          <div @click="scrollSection('comments')" data-scroll="comments" class="scroll-single"> 
            <span>{{comments.length}}</span> 
            <i class="fas fa-comment"></i>  
          </div>     
        </div> 
        <button @click.prevent="addFavoritePost({ postId:post._id, userId: $auth.user._id })"> 
          <i class="fas fa-bookmark"></i> 
          <div></div> 
        </button> 
      </div>   
    </div> 
    <main id="main" class="conteiner"> 
      <section style="position:relative;" id="content"> 
        <div v-html="post.html" > 
        </div> 
        <Panel :postCharacters="{comments:comments.length}" /> 
      </section>   
      <Aside /> 
    </main> 
    <Comments /> 
  </div>   
</template> 
 
<script> 
 
import { mapGetters, mapActions } from 'vuex'  
 
export default {   
  name: 'Post', 
  components: { 
    Aside:() =>  import ("@/components/Aside"), 
    Comments:() =>  import ("@/components/Comments"), 
    Panel:() =>  import ("@/components/post/Panel"), 
  }, 
  computed:{ 
    ...mapGetters({ 
      post: 'posts/post', 
      user: 'auth/user', 
      comments: 'posts/comments', 
    })     
  }, 
  methods:{ 
    ...mapActions({ 
      addFavoritePost: 'posts/addFavoritePost', 
    }),
    scrollSection(id){
      document.getElementById(id).scrollIntoView({
        block:"start",
        behavior: "smooth"
      });
    },
    popUpImage(images){
      for(let image of document.querySelectorAll(images)){
        image.addEventListener('click', function(){
          let html = `
            <div class="popup__image">
              <img src="${this.src}"/>
            </div>
          `;
          document.querySelector('body').insertAdjacentHTML('beforeend', html);
          setTimeout(() => document.querySelector('.popup__image').classList.add('active'), 100);
          document.querySelector('.popup__image').addEventListener('click', function(event) {
            if(event.target.tagName == 'IMG'){
              return
            }else{
              document.querySelector('.popup__image').classList.remove('active');
              setTimeout(() => this.remove(), 100);
            }
          });
        })
      }
    }, 
    copyCode(block){
      let codes = document.querySelectorAll(block);
      for(let code of codes){
        code.querySelector('.copy').addEventListener('click', function(event){
          // создание выделения
          let range = document.createRange();
          range.selectNode(code);
          // удаление текущего выделения на странице
          window.getSelection().removeAllRanges();
          // выделение объекта
          window.getSelection().addRange(range)
          document.execCommand("copy");
        });
      }
    },
  }, 
  mounted(){ 
    window.scrollTo(0,0); 
    this.popUpImage('#content>div>img')
    this.copyCode('.code'); 
  }, 
  async fetch({store, params}) { 
    await store.dispatch('posts/fetchPost', params.id); 
  }, 
  head() { 
    return { 
      title: this.post.title + ' | Findhub',  
      meta:[ 
        { hid: 'description', name: 'description', content: this.post.description }, 
      ], 
    } 
  } 
} 
</script> 
 
<style scoped lang="scss"> 
.wrapper{ 
  padding:0px ; 
} 
.single__header{ 
  width:100%; 
  display:flex; 
  flex-direction: column; 
  align-items:center; 
  justify-content:center; 
  position: relative; 
  height:calc(100vh - 160px); 
  .single__img{ 
    width:100%; 
    height:100%; 
    position: absolute; 
    object-fit: cover; 
  } 
  .hidden__wrapper{ 
    opacity: 1; 
    background:rgba(0, 0, 0, .8); 
  } 
  .single__head{ 
    z-index: 1; 
    width:60%; 
    padding:0px 0px; 
    @media(max-width:768px){ 
      width:100%; 
      padding:0px 20px; 
    } 
    .single__title{ 
      font-size:44px; 
      font-weight:600; 
      line-height:60px; 
      color:#00d1a0; 
      margin-top: 20px; 
      letter-spacing:1.5px; 
      @media(max-width:1170px){ 
        font-size:32px; 
        line-height:40px; 
      } 
      @media(max-width:768px){ 
        font-size:28px; 
        line-height:35px; 
      } 
    } 
    .single__date{ 
      font-size:24px; 
      color:#a1a1a1; 
      letter-spacing:1.5px; 
      @media(max-width:1170px){ 
        font-size:20px; 
      } 
    } 
    .single__scroll{ 
      display:flex; 
      margin-top:50px; 
      font-size:18px; 
      color:#fff; 
      @media(max-width:1170px){ 
        margin-top:30px; 
      } 
      div{ 
        display:flex; 
        border:1px solid #fff; 
        padding:10px 30px; 
        transition:.3s all; 
        cursor:pointer; 
        margin-right:50px; 
        &:last-child{ 
          margin-right:0px; 
        } 
        @media(max-width:768px){ 
          padding:10px 20px; 
          margin-right:30px; 
        } 
        &:hover{ 
          background:#4faab3; 
          border:1px solid #4faab3; 
        } 
        i{ 
          margin-left:10px; 
        } 
      } 
    } 
    button{ 
      padding:15px 20px; 
      border-radius:50%; 
      border:2px solid #00d1a0; 
      font-size:24px; 
      color:#fff; 
      background:inherit; 
      position: relative; 
      overflow:hidden; 
      margin-top:40px; 
      @media(max-width:1170px){ 
        margin-top:30px; 
      } 
      i{ 
        position: relative; 
        z-index:1; 
      } 
      &:hover div{ 
        transform:scale(1); 
      } 
      div{ 
        transform:scale(0); 
        width:100%; 
        border-radius:50%; 
        height:100%; 
        z-index:0; 
        transition:.3s all; 
        position:absolute; 
        top:0; 
        left:0; 
        background:#00d1a0; 
      } 
    } 
  } 
} 
 
main{ 
  padding:60px 0px 0px 0px; 
  @media(max-width:1170px){ 
    padding:40px 0px 0px 0px; 
  } 
} 
 
</style>