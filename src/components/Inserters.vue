<template>
  <span class='flex around'>
    <img v-for='inserter in inserters' class="icon" :src='icon(inserter)' />
  </span>
</template>
