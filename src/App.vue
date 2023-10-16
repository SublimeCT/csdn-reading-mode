<script setup lang="ts">
import { Config } from './Config'
import SettingsButton from './components/SettingsButton.vue'
import SettingsDialog from './components/SettingsDialog.vue'

</script>

<template>
  <div id="csdn-reading-mode-dom">
  </div>
  <Teleport v-if="Config.visibleSidebar" :to="Config.SIDEBAR_SELECTOR">
    <SettingsButton></SettingsButton>
  </Teleport>
  <Teleport v-if="Config.visibleSidebar" to="body">
    <SettingsDialog></SettingsDialog>
  </Teleport>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
