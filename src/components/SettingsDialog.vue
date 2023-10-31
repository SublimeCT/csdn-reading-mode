<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal v-model:show="visibleSettingsDialog" :style="bodyStyle" size="small" preset="card" class="userscript-settings-dialog"
      :bordered="false" title="脚本设置">
      <template #header>
        <header>脚本设置</header>
      </template>
      <n-form ref="formRef" :model="config" size="medium" label-placement="top">
        <n-form-item label="当前背景图" path="bgColor">
          <n-button text type="info" @click="onClickBackground">
            {{ BackgroundImage.currentUrl.name }}
          </n-button>
        </n-form-item>
        <n-form-item label="背景图片类目范围(点选)" path="categorys">
          <n-space size="small">
            <n-tag
              v-for="(ids, category) in BackgroundImage.IMG_CATEGORYS"
              :checked="config.categorys.includes(category)"
              checkable
              type="warning"
              :on-update-checked="(checked: boolean) => onUpdateCheckedCategory(category, checked)">
              {{ category }}
            </n-tag>
          </n-space>
        </n-form-item>
        <n-form-item label="自定义背景图片" path="bgColor">
          <custom-image v-model:url="config.customUrl"></custom-image>
        </n-form-item>
        <n-form-item label="背景颜色" path="bgColor">
          <n-color-picker v-model:value="config.bgColor" :show-alpha="true" :actions="['clear']"
            :on-complete="() => onChange('bgColor')" />
        </n-form-item>
      </n-form>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';
import { NTag, NImageGroup, NSpace, NImage, NModal, NForm, NFormItem, NColorPicker, NButton, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { Application } from '../Application';
import { BackgroundImage, CustomBackgroundImage } from '../utils/BackgroundImage';
import { config, visibleSettingsDialog } from '../State'
import { ScriptConfig } from '../ScriptConfig';
import CustomImage from './CustomImage.vue'

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
.userscript-settings-dialog .n-form-item-label span {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
  text-indent: -3px;
}

.userscript-settings-dialog .n-form-item-label span::after {
  content: ":";
}
</style>