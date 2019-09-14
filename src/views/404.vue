<template>
    <div>
        <el-button @click="click()" >返回首页</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        click(){
            this.$router.push('/')
        }
    },
}
</script>
<style lang="less">
    body{
        background-image: url('../../public/images/404.png')
    }
</style>