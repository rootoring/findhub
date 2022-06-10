<template>
  <PostsList routeToPagination="pages" /> 
</template>

<script>

import PostsList from '@/components/PostsList'

export default {  
  name: 'Main',
  components: { PostsList },
  mounted(){
    window.scrollTo(0,0);
  },
  head() {
    return {
      title: "Все посты | Findhub",
    }
  }
}
</script>