<template>
    <div class="container_category">
        <div @click="turnPage('/profile')" class="container_category-account container_category-mold"><img :src="user.user_avatar" alt="" class="avatar"><span class="container_category-describe">{{ user.user_fullName }}</span></div>
        <div @click="turnPage('/')" class="container_category-home container_category-mold"><i data-visualcompletion="css-img" class="" style="background-image:url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/i2HLlWiS1Fa.png?_nc_eui2=AeG7t6RjXQ8VBmHc4-znHBVIGiFyLgYa3yAaIXIuBhrfIFMc9dWa7u0P29VjksbQXBrD5joYYg6eu087gz5oIrvs');background-position:0 -407px;background-size:auto;width:36px;height:36px;background-repeat:no-repeat;display:inline-block"></i><span class="container_category-describe">Home</span></div>
        <div @click="turnPage('/messager')" class="container_category-messager container_category-mold"><i data-visualcompletion="css-img" class="" style="background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v4/yr/r/EUWB4jT3kMB.png?_nc_eui2=AeHGKmpbPS_r2rCZpci8X8G4yp_YewpbAX7Kn9h7ClsBfgFPUhiu4d-LjEqgrjkyksLPhuV4saQWTG5ZXn-yQVRd&quot;); background-position: 0px 0px; background-size: auto; width: 36px; height: 36px; background-repeat: no-repeat; display: inline-block;"></i><span class="container_category-describe">messager</span></div>
        <div @click="turnPage('/friend')" class="container_category-friend container_category-mold"><i data-visualcompletion="css-img" class="" style="background-image:url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/i2HLlWiS1Fa.png?_nc_eui2=AeG7t6RjXQ8VBmHc4-znHBVIGiFyLgYa3yAaIXIuBhrfIFMc9dWa7u0P29VjksbQXBrD5joYYg6eu087gz5oIrvs');background-position:0 -296px;background-size:auto;width:36px;height:36px;background-repeat:no-repeat;display:inline-block"></i><span class="container_category-describe">Ban bè</span></div>
        <div @click="turnPage('/')" class="container_category-froup container_category-mold"><i data-visualcompletion="css-img" class="" style="background-image:url('https://static.xx.fbcdn.net/rsrc.php/v4/yH/r/i2HLlWiS1Fa.png?_nc_eui2=AeG7t6RjXQ8VBmHc4-znHBVIGiFyLgYa3yAaIXIuBhrfIFMc9dWa7u0P29VjksbQXBrD5joYYg6eu087gz5oIrvs');background-position:0 -37px;background-size:auto;width:36px;height:36px;background-repeat:no-repeat;display:inline-block"></i><span class="container_category-describe">Nhóm</span></div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import store from '@/store/store';
import { computed, onMounted } from 'vue';
    export default{
        setup(){
            let router = useRouter()
            let user = computed(() => store.state.user)
            function turnPage(param){
                router.push(param)
            }
            return {turnPage, user}
        }
    }
</script>

<style scoped>
 *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }
    .container_category{
        height: calc(100vh - 66px);
        padding-right:2px ;
        box-shadow: 0px 0 6px rgba(0, 0, 0, 0.05);
        background-color: white;
        overflow-y: scroll;
    }

    .container_category:hover::-webkit-scrollbar-thumb{
        background-color: #bdbdbd;
        border-radius: 4px;
    }
    ::-webkit-scrollbar{
        width: 8px;
    }
    
    .container_category-account .avatar {
        display: block;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        padding: 6px;
    }
    .container_category-mold i {
       margin: 6px;
    }
    .container_category-mold{
        width: 320px;
        height: 48px;
        margin: 6px 0;
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 8px;
        background-color: white;
        transition: background-color 0.2s ease;

    }
    .container_category-mold:hover{
        background-color: #f1f3f5;
        transition: none;

    } 
    .container_category-describe{
        font-size: 15px;
        font-weight: 600;
        padding: 6px;
    }
</style>
