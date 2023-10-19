<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-modal v-model:show="Config.visibleSettingsDialog.value" :style="bodyStyle" size="small" preset="card"
      :bordered="false" title="脚本设置">
      <template #header>
        <header>脚本设置</header>
      </template>
      <n-form ref="formRef" :model="config" size="small" label-placement="top">
        <n-form-item label="当前背景图" path="bgColor">
          <n-button text type="primary" @click="onClickBackground">
            {{ BackgroundImage.currentUrl.name }}
          </n-button>
        </n-form-item>
        <!-- <n-form-item label="背景图片类目范围(点选)" path="categorys">
          <n-tag v-for="bg in BackgroundImage.IMG_CATEGORYS" v-model:checked="" checkable disabled>
            爱在西元前
          </n-tag>
        </n-form-item> -->
        <n-form-item label="背景颜色" path="bgColor">
          <n-color-picker v-model:value="config.bgColor" :show-alpha="true" :actions="['clear']"
            :on-complete="() => onChange('bgColor')" />
        </n-form-item>
      </n-form>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { StyleValue, watch } from 'vue';
import { Config } from '../plugins/Config';
import { NModal, NForm, NFormItem, NColorPicker, NButton, NConfigProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { Style } from '../plugins/Style';
import { Application } from '../Application';
import { BackgroundImage } from '../utils/BackgroundImage';

const bodyStyle: StyleValue = { width: '600px' }

const config = Config.config
const application = Application.application

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1677ff',
    primaryColorHover: '#69b1ff',
    primaryColorPressed: '#0958d9',
  },
}

/**
 * 监听配置项更新并触发钩子函数, 在 `Plugins` 中进行处理
 * @param field 更新的属性名称
 */
const onChange = (field: keyof Config) => application.emitConfigChanged(field)

const onClickBackground = () => {
  if (BackgroundImage.currentUrl.url) {
    window.open(BackgroundImage.currentUrl.url)
  }
}
</script>