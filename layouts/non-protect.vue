<template>
  <main><slot /></main>
</template>

<style lang="sass">
main
  @include flex-center-evenly()
  flex-direction: column
  width: 100%
  padding-top: 1.5rem
</style>
