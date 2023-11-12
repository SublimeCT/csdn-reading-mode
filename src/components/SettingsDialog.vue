<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :data-locale="dateZhCN">
    <n-modal v-model:show="visibleSettingsDialog" :style="bodyStyle" size="small" preset="card"
      class="userscript-settings-dialog" :bordered="false" title="脚本设置">
      <template #header>
        <header>脚本设置</header>
      </template>
      <n-tabs type="segment">
        <n-tab-pane name="background" tab="🎨 背景">
          <n-scrollbar class="userscript-settings-dialog-main">
            <n-form ref="formRef" :model="config" size="medium" label-placement="top">
              <tips>
                <p class="tips-row">
                  <div style="margin-bottom: 5px;">
                    <span>当前背景: </span>
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
                </p>
              </tips>
              <n-form-item label="背景颜色(优先使用)" path="bgColor">
                <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
                  <n-color-picker style="width: calc(100% - 60px);" v-model:value="config.bgColor" :show-alpha="true" :actions="['clear']"
                    :on-complete="() => onChange('bgColor')" />
                  <n-button size="small" secondary type="info" style="width: 50px;" @click="config.bgColor = '', onChange('bgColor')">清除</n-button>
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
          </n-scrollbar>
        </n-tab-pane>

        <n-tab-pane name="page" tab="📃 页面">
          <n-scrollbar class="userscript-settings-dialog-main">
            <span>也卖弄</span>
          </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane name="about" tab="💡 关于">
          <n-scrollbar class="userscript-settings-dialog-main">
            <a href="https://github.com/SublimeCT/csdn-reading-mode" target="_blank" class="link">GitHub</a>
          </n-scrollbar>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </n-config-provider>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue';
import { NTag, NScrollbar, NSpace, NModal, NForm, NFormItem, NColorPicker, NButton, NConfigProvider, NTabs, NTabPane } from 'naive-ui'
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

<style lang="scss">
.userscript-settings-dialog {
  .n-form-item-label {
    position: relative;
  }

  .n-form-item-label::before {
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

  .n-form-item-label span {
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 5px;
    /* text-indent: -3px; */
  }

  .link {
    color: #2080f0;
  }
  .n-card__content {
    padding: 0;
    padding-bottom: 0;
  }
  .n-tabs-nav {
    padding: 0 var(--userscript-dialog-padding);
  }
  .n-form-item-label span::after {
    content: ":";
  }

  .userscript-settings-dialog-main {
    width: 100%;
    height: 60vh;
    margin: 0;
    padding: 0 var(--userscript-dialog-padding);
    padding-left: 7px;
    overflow-y: auto;
    .n-scrollbar-container {
      padding-left: 8px;
    }
  }
}

</style>