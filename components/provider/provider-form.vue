<template>
  <Form
    :send-value="sendValue"
    @s="handleSubmit"
    @r="handleReset"
    :disabled="disabled"
  >
    <FormInput id="name" label="Nombre:" type="text" v-model="name" />
    <FormInput
      id="phone-number"
      label="Número de Teléfono:"
      type="text"
      v-model="phoneNumber"
      :error="phoneNumberError"
    />
  </Form>
</template>

<script setup lang="ts">
interface Props {
  id?: number;
  name?: string;
  phoneNumber?: string;
}
const props = defineProps<Props>();

import { useProviderForm } from "~/composables/pages/provider/form";

const {
  disabled,
  handleSubmit,
  handleReset,
  name,
  sendValue,
  phoneNumber,
  phoneNumberError,
} = useProviderForm(props);
</script>
