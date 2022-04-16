<template>
    <div class="not-found-container">
        <div class="main">啊噢，你要访问的页面不存在</div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
    };
</script>

<style lang="scss" scoped>
    .not-found-container {
        .main {
            font-size: 32px;
            font-weight: bold;
            color: #a03f4d;
            position: absolute;
            top: 50%;
            left: 57%;
            transform: translate(-50%, -50%);
        }
    }
</style>