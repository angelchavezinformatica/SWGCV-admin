<template>
  <section>
    <h1>Hola Mundo</h1>
    <h2>Colaboradores</h2>
    <ol>
      <li v-for="collaborator in collaborators">
        <a
          :href="collaborator.github"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ collaborator.name }} ({{ collaborator.username }})
        </a>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
const collaborators = [
  {
    name: "Angel Chávez",
    username: "angelchavezinformatica",
    github: "https://github.com/angelchavezinformatica",
  },
  {
    name: "Kevin Mostacero",
    username: "Bhowa",
    github: "https://github.com/Bhowa",
  },
  {
    name: "Marlene Costa",
    username: "dayanaraC",
    github: "https://github.com/dayanaraC",
  },
  {
    name: "Norma Rojas",
    username: "KaterineDev",
    github: "https://github.com/KaterineDev",
  },
  {
    name: "Miguel Sánchez",
    username: "SanchezIng",
    github: "https://github.com/SanchezIng",
  },
];
</script>

<style scope lang="sass"></style>
