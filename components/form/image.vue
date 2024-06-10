<template>
  <div class="Form-input">
    <div class="Form-input-content">
      <label :for="id">{{ label }}</label>
      <input
        class="Form-input-content-input"
        type="file"
        :name="id"
        :id="id"
        accept="image/*"
        @change="previewImage"
      />
    </div>
    <div class="Form-input-image" v-if="modelValue">
      <img :src="modelValue" alt="Image" />
    </div>
    <div class="Form-input-error" v-if="error !== undefined" v-show="error">
      <p>❌ {{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string | null;
  error?: string | null;
}
defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const previewImage = (ev: Event) => {
  const file = ev.target?.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit("update:modelValue", e.target?.result || null);
    };
    reader.readAsDataURL(file);
  } else emit("update:modelValue", null);
};
</script>

<style scope lang="sass">
.Form-input-content-input
  outline: none !important
.Form-input-image
  @include flex-center-center()
  padding: .5rem 0
  img
    box-shadow: 0 0 10px $accent-1
    width: 250px
    height: 150px
    object-fit: cover
</style>
