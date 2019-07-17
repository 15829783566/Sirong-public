<template>
    <div>
        <button @click="tijiao">提交</button>
         <router-link to="/luyou1">888</router-link>  
    </div>
       
                
                
           
   
</template>
 
<script>
import $ from 'jquery'
export default {
    name: "hello",
    data() {
        return {
            
        };
    },
    methods: {
        tijiao(){
            this.$store.commit("logIn/getSession_id","wang")
            //this.$store.commit("logIn/getSession_id", res.data.session_id)
            console.log(this.$store.state.logIn.session_id)
        }
    }
};
// 在使用的时候，要修改logIn.js中session_id的值，可以这样改变

// $this.$store.commit("logIn/getSession_id", res.data.session_id);
// 如果想获取session_id的值，可以这样

// computed:{
//       session_id(){
//         return this.$store.state.logIn.session_id; 
//     },
//   }
</script>
<style lang="less">

</style>