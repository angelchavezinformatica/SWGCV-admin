<template>
  <Main>
    <section>
      <h1>Colaboradores</h1>
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
  </Main>
</template>

<script setup lang="ts">
useHead({ title: "Vivero La Huerta" });

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
    name: "Dayanara Costa",
    username: "dayanaraC",
    github: "https://github.com/dayanaraC",
  },
  {
    name: "Norma Rojas",
    username: "KaterineDev",
    github: "https://github.com/KaterineDev",
  },
  {
    name: "Félix Sánchez",
    username: "SanchezIng",
    github: "https://github.com/SanchezIng",
  },
];
</script>

<style scope lang="sass"></style>
