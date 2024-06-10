<template>
  <div class="Form-input">
    <div class="Form-input-content">
      <label :for="id">{{ label }}</label>
      <input
        :name="id"
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target?.value)"
        v-bind="$attrs"
      />
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
  modelValue: string | number;
  error?: string | null;
}
defineProps<Props>();
</script>

<style scope lang="sass"></style>
