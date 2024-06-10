<template>
  <div class="Form-input-content">
    <label for="id">{{ label }}</label>
    <input
      class="form-control"
      :list="`${id}-items`"
      id="id"
      name="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
    <datalist :id="`${id}-items`">
      <option v-for="item in items" :value="item"></option>
    </datalist>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  items: any[];
  modelValue: string;
}
defineProps<Props>();
</script>
