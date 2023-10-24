<template>
  <n-upload
    accept="image/*"
    :multiple="true"
    :default-file-list="images"
    :custom-request="customRequest"
    @remove="onRemove"
    @preview="onPreview"
    :show-preview-button="true"
    list-type="image-card">
    点击上传
  </n-upload>
</template>

<script setup lang="ts">
import { NUpload, type UploadFileInfo } from 'naive-ui';
import type { CustomRequestOptions, SettledFileInfo } from 'naive-ui/es/upload/src/interface';
import { CustomBackgroundImage } from '../utils/BackgroundImage';
import { Application } from '../Application';
import { ref } from 'vue';

const props = defineProps<{
  url: string
}>()

const images = CustomBackgroundImage.images

// 从 indexeddb 中取出所有背景图
CustomBackgroundImage.getImages().then(() => console.warn(images))

const customRequest = async (options: CustomRequestOptions) => {
  if (!options.file.file) return console.warn('Missing Image file')
  await CustomBackgroundImage.save(options)
}

const onRemove = (data: { file: SettledFileInfo, fileList: SettledFileInfo[] }) => {
  console.log('onRemove', data)
  CustomBackgroundImage.remove(data.file)
}

const onPreview = (file: SettledFileInfo) => {
  if (file.url) Application.application.emitPreviewImage(file.url)
  console.log('onPreview', file)
}
</script>
