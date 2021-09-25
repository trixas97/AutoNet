<template>
  <q-dialog persistent transition-show="scale" transition-hide="scale">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="bg-primary text-white"
          active-color="blue"
          indicator-color="blue"
          align="justify"
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-white text-black">
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
</template>

<script>

import { ref } from 'vue'

export default {
  setup () {
    return {
      tab: ref('mails')
    }
  }
}

</script>

<style lang="scss" scoped>
    .q-card{
        min-width: 40%;
        min-height: 70%;
    }
</style>