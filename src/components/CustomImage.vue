<template>
  <n-upload
    accept="image/*"
    :multiple="true"
    :default-file-list="images"
    :custom-request="customRequest"
    @remove="onRemove"
    @preview="onPreview"
    @change="onChange"
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

const props = defineProps<{
  url: string
}>()

const images: Array<UploadFileInfo> = CustomBackgroundImage.getImages()
  console.log(images)

const customRequest = async (options: CustomRequestOptions) => {
  if (!options.file.file) return console.warn('Missing Image file')
  try {
    const base64URL = await CustomBackgroundImage.toBase64(options.file.file)
    options.file.url = base64URL
    options.onFinish()
    console.log(options)
  } catch(err) {
    options.onError()
    throw err
  }
}

const onRemove = (data: { file: SettledFileInfo, fileList: SettledFileInfo[] }) => {
  console.log('onRemove', data)
}

const onPreview = (file: SettledFileInfo) => {
  if (file.url) Application.application.emitPreviewImage(file.url)
  console.log('onPreview', file)
}

const onChange = (data: {
  file: SettledFileInfo;
  fileList: SettledFileInfo[];
  event: ProgressEvent | Event | undefined;
}) => {
  CustomBackgroundImage.saveImages(data.fileList)
}
</script>
