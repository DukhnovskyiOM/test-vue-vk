<script setup></script>

<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    user-select: none;
    padding: 8px;
    min-height: 50px;
    color: rgb(73, 73, 73);
    border-radius: 12px;
    background-color: rgb(216, 216, 216);
}
</style>
