<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h4">Daftar Berita</div>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="key"
          append-icon="mdi-magnify"
          label="Cari berdasarkan judul, kategori.."
          outlined
          class="field-size"
          v-on:keydown.enter="searchBerita"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-simple-table height="500px" class="grey lighten-5">
          <template v-slot:default>
            <thead>
              <tr>
                <th>id</th>
                <th>Judul</th>
                <th>Waktu Publikasi</th>
                <th>Kategori</th>
                <th class="text-center">Pilihan</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="fade" mode="out-in">
              <tr v-for="item in berita" :key="item.id_berita">
                <td class="text-xs-center">{{ item.id_berita }}</td>
                <td class="text-xs-center">{{ item.judul }}</td>
                <td class="text-xs-center">{{ item.waktu_publikasi }}</td>
                <td class="text-xs-center">{{ item.kategori_berita }}</td>
                <td class="text-center">
                  <v-btn
                    v-if="item.waktu_publikasi != null"
                    class="ma-1"
                    color="success"
                    outlined
                    @click.prevent="publishBerita(item.id_berita)"
                    width="110px"
                  >Unpublish</v-btn>
                  <v-btn
                    v-else
                    class="ma-1"
                    color="success"
                    dark
                    @click.prevent="publishBerita(item.id_berita)"
                    width="110px"
                  >Publish</v-btn>
                  <v-btn
                    class="ma-2"
                    color="warning"
                    dark
                    width="110px"
                    :to="'/admin/berita/' + item.id_berita"
                  >Edit</v-btn>
                  <v-dialog v-model="dialog" persistent max-width="290" :retain-focus="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="ma-2"
                        color="error"
                        width="110px"
                        v-bind="attrs"
                        v-on="on"
                        @click.prevent="selectedBerita(item.id_berita)"
                      >Delete</v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">Apakah Anda yakin untuk menghapus berita ini?</v-card-title>
                      <v-card-text></v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-1" text @click="dialog = false">Batal</v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                          @click.prevent="deleteBerita"
                        >Yakin</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </transition-group>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-progress-circular
      class="progressbar"
      v-if="isLoading"
      color="#E52B38"
      height="10"
      indeterminate
    ></v-progress-circular>
    <v-overlay :value="isLoading" absolute></v-overlay>
  </v-container>
</template>

<script>
import daftarBerita from "../../../api/admin/daftarberita";
import { store } from "../../../store/index";
export default {
  data() {
    return {
      berita: [],
      key: "",
      id: 0,
      dialog: false,
      isLoading: false,
    };
  },

  methods: {
    retrieveBerita() {
      daftarBerita
        .getAll()
        .then((response) => {
          this.berita = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async searchBerita() {
      if (this.key === "") {
        this.retrieveBerita();
      } else {
        const response = await daftarBerita.searchBy(this.key);
        if (response instanceof Error) {
          // Munculkan error dialog
          return;
        }
        console.log(response.data);
        this.berita = response.data;
      }
    },

    deleteBerita() {
      daftarBerita
        .deleteBy(this.id, store.getters["admin/getToken"])
        .then((response) => {
          console.log(this.id);
          this.retrieveBerita();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    selectedBerita(id) {
      this.id = id;
    },

    publishBerita(id) {
      daftarBerita
        .publish(id, store.getters["admin/getToken"])
        .then((response) => {
          console.log(id);
          this.berita = response.data;
          this.retrieveBerita();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //   deleteAll() {
    //     daftarBerita.deleteAll()
    //     .then(response => {
    //       this.retrieveBerita();
    //       console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       })
    //   }
  },

  mounted() {
    this.searchBerita();
    this.deleteBerita();
  },
};
</script>

<style scoped>
.progressbar {
  position: relative;
  bottom: 50%;
  left: 50%;
}

/* Fade */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>