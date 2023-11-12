<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :data-locale="dateZhCN">
    <n-modal v-model:show="visibleSettingsDialog" :style="bodyStyle" size="small" preset="card"
      class="userscript-settings-dialog" :bordered="false" title="脚本设置">
      <template #header>
        <header>脚本设置</header>
      </template>
      <n-tabs type="segment">
        <n-tab-pane name="background" tab="🎨 背景">
          <main class="userscript-settings-dialog-main">
            <n-form ref="formRef" :model="config" size="medium" label-placement="top">
              <n-form-item label="当前背景" path="bgColor">
                <section>
                  <div style="margin-bottom: 5px;">
                    <n-button text type="info" @click="onClickBackground">
                      {{ BackgroundImage.currentUrl.name }}
                    </n-button>
                  </div>
                  <n-space size="small">
                    <n-button strong secondary type="info" size="small"
                      @click="application.emit('onUpdateBackgroundImage')">
                      刷新背景图
                    </n-button>
                    <!-- <n-button strong secondary size="small" @click="toSaveBackgroundImage">
                  下载背景图
                </n-button> -->
                  </n-space>
                </section>
              </n-form-item>
              <n-form-item label="背景颜色" path="bgColor">
                <div style="width: 100%;">
                  <tips>
                    <div class="tips-row">
                      <span>页面背景<strong>优先使用背景颜色 </strong></span>
                      <n-button size="small" secondary type="info">清空背景颜色</n-button>
                    </div>
                  </tips>
                  <n-color-picker v-model:value="config.bgColor" :show-alpha="true" :actions="['clear']"
                    :on-complete="() => onChange('bgColor')" />
                </div>
              </n-form-item>
              <n-form-item label="背景图片类目范围(点选)" path="categorys">
                <n-space size="small">
                  <n-tag v-for="(ids, category) in BackgroundImage.IMG_CATEGORYS"
                    :checked="config.categorys.includes(category)" checkable type="warning"
                    :on-update-checked="(checked: boolean) => onUpdateCheckedCategory(category, checked)">
                    {{ category }}
                  </n-tag>
                </n-space>
              </n-form-item>
              <n-form-item label="自定义背景图片" path="bgColor">
                <custom-image v-model:url="config.customUrl"></custom-image>
              </n-form-item>
            </n-form>
          </main>
        </n-tab-pane>

        <n-tab-pane name="page" tab="📃 页面">
          <main class="userscript-settings-dialog-main">
            <span>也卖弄</span>
          </main>
        </n-tab-pane>
        <n-tab-pane name="about" tab="💡 关于">
          <main class="userscript-settings-dialog-main">
            <a href="https://github.com/SublimeCT/csdn-reading-mode" target="_blank" class="link">GitHub</a>
          </main>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';
import { NTag, NImageGroup, NSpace, NImage, NModal, NForm, NFormItem, NColorPicker, NButton, NConfigProvider, NTabs, NTabPane } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { Application } from '../Application';
import { BackgroundImage } from '../utils/BackgroundImage';
import { config, visibleSettingsDialog } from '../State'
import { ScriptConfig } from '../ScriptConfig';
import CustomImage from './CustomImage.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import Tips from './Tips.vue'

const bodyStyle: StyleValue = { width: '600px' }

const application = Application.application

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#fd9841',
    primaryColorHover: '#ffb97c',
    primaryColorPressed: '#ff871f',
  },
}

/**
 * 监听配置项更新并触发钩子函数, 在 `Plugins` 中进行处理
 * @param field 更新的属性名称
 */
const onChange = (field: keyof ScriptConfig) => application.emitConfigChanged(field)

const onClickBackground = () => {
  if (BackgroundImage.currentUrl.url) {
    window.open(BackgroundImage.currentUrl.url)
  }
}

const onUpdateCheckedCategory = (category: string, checked: boolean) => {
  if (checked && !config.categorys.includes(category)) {
    config.categorys.push(category)
  } else {
    config.categorys = config.categorys.filter(c => c !== category)
  }
}
</script>

<style>
.userscript-settings-dialog .n-form-item-label {
  position: relative;
}

.userscript-settings-dialog .n-form-item-label::before {
  content: "";
  width: 3px;
  height: 62%;
  display: block;
  background-color: var(--n-feedback-text-color-warning);
  border-radius: calc(var(--n-bar-width) / 2);
  transition: background-color .3s var(--n-bezier);
  left: -8px;
  top: 0;
  bottom: 0;
  position: absolute;
}

.userscript-settings-dialog .n-form-item-label span {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  /* text-indent: -3px; */
}

.userscript-settings-dialog .link {
  color: #2080f0;
}
.userscript-settings-dialog .n-form-item-label span::after {
  content: ":";
}

.userscript-settings-dialog .userscript-settings-dialog-main {
  width: 100%;
  height: 60vh;
  margin: 0;
  padding-left: 8px;
  overflow-y: auto;
}
</style>