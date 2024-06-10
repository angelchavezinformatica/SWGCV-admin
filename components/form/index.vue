<template>
  <form class="Form" novalidate @submit.prevent="$emit('s', $event)">
    <slot />
    <div class="Form-input">
      <button class="Form-input-button" @click="$emit('r')">
        Reiniciar formulario
      </button>
      <input
        class="Form-input-button"
        type="submit"
        :value="sendValue"
        :disabled="disabled"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
interface Props {
  sendValue: string;
  disabled: boolean;
}
defineProps<Props>();
defineEmits(["s", "r"]);
</script>

<style scope lang="sass">
.Form
  @include flex-center-center()
  flex-direction: column
  width: 100%
  max-width: 600px
  box-shadow: 0 0 5px $accent-1
  border-radius: 20px
  padding: 1rem
  gap: 1.7rem
  .Form-input
    display: flex
    flex-direction: column
    width: 100%
    gap: .5rem
  .Form-input-content
    display: flex
    width: 100%
    gap: 1rem
    label
      font-size: 1.2rem
    input
      border-radius: 20px
      border: none
      outline: 1px solid $accent-1
      flex: 1
      padding: .1rem .5rem
      font-size: 1.2rem
  .Form-input-error
    width: 100%
    text-align: center
    color: $error
  .Form-input-button
    width: 100%
    padding: .1rem 0
    font-size: 1.2rem
    text-transform: uppercase
    border-radius: 20px
    border: 2px solid $accent-1
    color: $accent-1
    font-weight: 700
    cursor: pointer
  .Form-input-button:active
    transform: scale(.9)
  .Form-input-button:disabled
    transform: scale(1)
    cursor: not-allowed
    opacity: 0.5
</style>
