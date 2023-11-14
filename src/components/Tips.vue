<template>
  <div class="userscript-tips-component">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// import { NH6 } from 'naive-ui'
</script>

<style>
.userscript-tips-component {
  padding: 5px 8px;
  background-color: rgba(155, 155, 155, 0.1);
  border-radius: 5px;
  /* border-left: 2px solid rgba(50, 50, 50, 0.4); */
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}
.userscript-tips-component .tips-row {
  width: 100%;
  display: block;
  transition: 0.2s all ease-in-out;
}

.userscript-tips-component strong {
  color: #666;
}
</style>