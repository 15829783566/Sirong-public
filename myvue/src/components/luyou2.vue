<template>
    <div class="animated zoomInDown"> 
        <p>路由地址嵌套（2）<router-link to="/luyou4">路由地址嵌套-->3</router-link></p>
        <img src="./../assets/fdj.png" alt="">
        <div>
            <router-view></router-view>
            
        </div>
    </div>
</template>

<script>
export default {
    name:"luyou2"
}
</script>

<style>

</style>