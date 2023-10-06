<template>
   <div
      style="
         display: flex;
         justify-content: center;
         align-items: center;
         height: 55vh;
      "
   >
      <div class="q-gutter-y-md" style="max-width: 600px">
         <q-card>
            <q-tabs
               v-model="tab"
               dense
               class="text-grey"
               active-color="primary"
               indicator-color="primary"
               align="justify"
               narrow-indicator
            >
               <q-tab name="general" label="General" style="width: 200px" />
               <q-tab name="done" label="Done" style="width: 200px" />
               <q-tab name="pending" label="Pending" style="width: 200px" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated style="height: 317px">
               <!-- general tab -->
               <q-tab-panel name="general">
                  <div class="text-h6">Labels:</div>
                  <div class="row">
                     <div class="col">
                        <q-card class="my-card">
                           <div class="q-pa-lg">
                              <q-option-group
                                 v-model="group"
                                 :options="options"
                                 color="green"
                                 type="checkbox"
                              />
                           </div>
                        </q-card>
                     </div>
                     <div class="col">
                        <div class="row">
                           <div class="col" style="margin-left: 50px">
                              <q-input
                                 outlined
                                 v-model="textName"
                                 label="name"
                                 dense
                              />
                           </div>
                           <div class="col" style="text-align: center">
                              <!-- <q-btn color="black" label="ADD" @click="addlabel" /> -->
                              <q-file
                                 outlined
                                 dense
                                 v-model="imagenBBDD"
                                 label="Upload"
                                 @change="previewImage"
                              />
                           </div>
                        </div>
                        <div class="row">
                           <div class="row">
                              <div class="col" style="margin-left: 50px">
                                 <img
                                    v-if="previewUrl"
                                    :src="previewUrl"
                                    alt="Preview"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col" style="text-align: end">
                        <div class="q-pa-lg">
                           <p>Data:</p>
                        </div>
                     </div>
                     <div class="col" style="max-width: 130px">
                        <div class="q-pa-lg">
                           <q-btn
                              color="primary"
                              label="Upload"
                              @click="uploadPicture()"
                           >
                           </q-btn>
                        </div>
                     </div>
                     <div class="col" style="max-width: 130px">
                        <div class="q-pa-lg">
                           <q-btn
                              color="green"
                              label="Download"
                              @click="downloadPicture"
                           />
                        </div>
                     </div>
                  </div>
               </q-tab-panel>
               <!-- general tab -->
               <q-tab-panel name="done">
                  <div class="text-h6">Done</div>
                  <div class="row">
                     <div class="col">
                        <div class="q-pa-md q-gutter-sm">
                           <q-img
                              :src="imageArray"
                              style="height: 180px; max-width: 180px"
                           >
                              <div
                                 class="absolute-bottom text-subtitle1 text-center"
                                 style="
                                    font-size: 1rem;
                                    font-weight: 400;
                                    line-height: 0.75;
                                    letter-spacing: 0.00937em;
                                 "
                              >
                                 {{ labelDetail }}
                              </div>
                           </q-img>
                        </div>
                     </div>
                     <div class="col">
                        <div class="row" style="display: block">
                           <div class="col">
                              Done by:
                              <q-input
                                 outlined
                                 v-model="usuario"
                                 label="Usuario"
                                 dense
                                 disable
                                 readonly
                              />
                           </div>
                           <div class="col">
                              Texto:
                              <q-input
                                 outlined
                                 v-model="textoLabel"
                                 label="Texto"
                                 dense
                                 disable
                                 readonly
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col" style="margin-left: 4%">
                        <q-btn
                           color="secondary"
                           @click="leftPicture()"
                           label="Back"
                        />
                        <q-btn
                           color="accent"
                           @click="rightPicture()"
                           style="margin-left: 20px"
                           label="Next"
                        />
                     </div>
                  </div>
               </q-tab-panel>
               <q-tab-panel name="pending" style="text-align: center">
                  <div class="text-h6">Pending</div>
                  <div class="row">
                     <div class="col">
                        <div class="q-pa-md q-gutter-sm">
                           <q-img
                              :src="imageArray"
                              style="height: 180px; max-width: 180px"
                           >
                              <div
                                 class="absolute-bottom text-subtitle1 text-center"
                                 style="
                                    font-size: 1rem;
                                    font-weight: 400;
                                    line-height: 0.75;
                                    letter-spacing: 0.00937em;
                                 "
                              >
                                 {{ labelDetail }}
                              </div>
                           </q-img>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col">
                        <q-btn
                           color="secondary"
                           @click="leftPicture()"
                           label="Back"
                        />
                        <q-btn
                           color="accent"
                           @click="rightPicture()"
                           style="margin-left: 20px"
                           label="Next"
                        />
                     </div>
                  </div>
               </q-tab-panel>
            </q-tab-panels>
            <div class="row">
               <q-btn
                  color="red"
                  @click="returnLogin()"
                  label="Return"
                  style="margin-bottom: 10px; margin-left: 10px"
               />
            </div>
         </q-card>
      </div>
   </div>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import axios from "axios";

export default defineComponent({
   name: "AdminPart",
   props: {
      showLogin: Boolean,
      userId: Number,
   },

   setup(props) {
      const apiUrlWeb = "https://5eb0-37-158-136-4.ngrok-free.app/"
      const api="http://127.0.0.1:8000/"
      const tab = ref("general");
      const group = ref(["1"]);
      const textName = ref("");
      const imagenBBDD = ref("");
      const previewUrl = ref("");
      let documentsCSV = "";
      const imageArray = ref([]);
      let usuario = ref("");
      let allData = [];
      let dataImagenes;
      let currentPic = 0;
      let labelDetail = ref("");
      let textoLabel = ref("");
      let allUsers = [];
      const options = [
         { label: "with Mask", value: "1" },
         { label: "without Mask", value: "0" },
         { label: "No specified", value: '' },
      ];
      // let imageArrayPending = [];

      // Watch the 'showLogin' prop for changes
      watch(
         () => props.showLogin,
         (newValue, oldValue) => {
            console.log("showLogin changed from", oldValue, "to", newValue);
            // You can perform any other actions here when the prop changes
         }
      );

      // Watch the 'group' variable for changes
      watch(group, (newValue, oldValue) => {
         group.value.shift();
         console.log("group changed from", oldValue, "to", newValue);
         // You can perform any other actions here when the group changes
      });
      watch(textName, (newValue, oldValue) => {
         console.log("group changed from", oldValue, "to", newValue);
         // You can perform any other actions here when the group changes
      });
      watch(imagenBBDD, (newValue, oldValue) => {
         console.log("group changed from", oldValue, "to", newValue);
         // You can perform any other actions here when the group changes
      });
      watch(tab, (newValue, oldValue) => {
         if (tab.value == "done") {
            currentPic = 0;
            dataImagenes = allData.filter(
               (item) => item.label === "0" || item.label === "1"
            );
            dataImagenes ? insertValue(dataImagenes) : "";
         } else if (tab.value == "pending") {
            currentPic = 0;
            dataImagenes = allData.filter((item) => item.label === "");
            dataImagenes ? insertValue(dataImagenes) : "";
         }
         console.log("group changed from", oldValue, "to", newValue);
         // You can perform any other actions here when the group changes
      });



      function leftPicture() {
         currentPic =
            (currentPic - 1 + dataImagenes.length) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarMask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
         usuario.value = allUsers.filter(
            (item) => item.id == dataImagenes[currentPic].user
         )[0].nombre;
      }

      function rightPicture() {
         currentPic = (currentPic + 1) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarMask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
         usuario.value = allUsers.filter(
            (item) => item.id == dataImagenes[currentPic].user
         )[0].nombre;
      }

      function insertValue(items) {
         //  const filteredData = allData.filter((item) => item.label === "1");
         //  dataImagenes = allData;
         imageArray.value = items[0].imageBase64;
         labelDetail.value = comprobarMask(currentPic, items);
         textoLabel.value = items[0].text;
         usuario.value = allUsers.filter(
            (item) => item.id == items[currentPic].user
         )[0].nombre;
      }

      function comprobarMask(currentPic, dataImagenes) {
         return dataImagenes[currentPic].label == ""
            ? "sin label"
            : dataImagenes[currentPic].label * 1 == 1
            ? "with Mask"
            : "whitout mask";
      }

      async function uploadPicture() {
         try {
            const imageBlob = await imageUploaded(imagenBBDD.value);
            const data = {
               text: textName.value,
               label: group.value[0],
               imageBase64: imageBlob,
               user: props.userId,
            };
            const response = await axios.post(
               `${apiUrlWeb}api/ImageTable/`,
               data,
               {
                  headers: {
                     "Content-Type": "application/json", // Set the content type
                  },
               }
            );
            console.log("Image uploaded successfully:", response.data);
         } catch (error) {
            console.error("Error uploading picture:", error);
         }
         textName.value = "";
         group.value[0] = 1;
         imagenBBDD.value = "";
         getAllData();
      }
      async function getAllData() {
         axios
            .get(`${apiUrlWeb}api/ImageTable/`, {})
            .then((response) => {
               allData = response.data;
               console.log("todo el array", allData);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
      getAllData();

      async function getAllUsers() {
         axios
            .get(`${apiUrlWeb}usuarios/`, {})
            .then((response) => {
               allUsers = response.data;
               console.log("todo el array", allUsers);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
      getAllUsers();

      function downloadPicture() {
         const filteredData = allData.filter((item) => item.label === "1");
         const newArray = filteredData.map(
            ({ imageBase64, ...keepAttrs }) => keepAttrs
         );
         documentsCSV = newArray;
         if (documentsCSV) {
            exportToCsv(documentsCSV);
         }
         console.log(documentsCSV);
      }

      function imageUploaded(file) {
         return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
               const base64String = reader.result.split(",")[1]; // Remove any existing prefix
               const extension = file.name.split(".").pop().toLowerCase();
               const mimeType = `image/${
                  extension === "jfif" ? "jpeg" : extension
               }`;
               const base64WithPrefix = `data:${mimeType};base64,${base64String}`;
               resolve(base64WithPrefix);
            };

            reader.onerror = function (error) {
               reject(error);
            };

            reader.readAsDataURL(file);
         });
      }

      function previewImage() {
         if (imagenBBDD.value) {
            console.log("File selected:", imagenBBDD.value);
            const reader = new FileReader();
            reader.onload = (e) => {
               previewUrl.value = e.target.result;
               console.log("Preview URL:", previewUrl.value);
            };
            reader.readAsDataURL(imagenBBDD.value);
         } else {
            console.log("No file selected");
         }
      }

      function exportToCsv(rows) {
         if (!rows || !rows.length) {
            return;
         }
         const separator = ",";
         const keys = Object.keys(rows[0]);
         const csvData =
            keys.join(separator) +
            "\n" +
            rows
               .map((row) => {
                  return keys
                     .map((k) => {
                        let cell =
                           row[k] === null || row[k] === undefined
                              ? ""
                              : row[k];
                        cell =
                           cell instanceof Date
                              ? cell.toLocaleString()
                              : cell.toString().replace(/"/g, '""');
                        if (cell.search(/("|,|\n)/g) >= 0) {
                           cell = `"${cell}"`;
                        }
                        return cell;
                     })
                     .join(separator);
               })
               .join("\n");

         const blob = new Blob([csvData], {
            type: "text/csv;charset=utf-8;",
         });
         if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, "csvFile");
         } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
               // Browsers that support HTML5 download attribute
               const url = URL.createObjectURL(blob);
               link.setAttribute("href", url);
               link.setAttribute("download", "csvFile");
               link.style.visibility = "hidden";
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
            }
         }
      }
      function returnLogin() {
         this.$emit("show-login-updated", true);
         this.$emit("user-admin", false);
      }
      return {
         tab,
         group,
         options,
         textName,
         imagenBBDD,
         previewUrl,
         allData,
         imageArray,
         usuario,
         labelDetail,
         textoLabel,
         allUsers,
         dataImagenes,

         //functions
         uploadPicture,
         downloadPicture,
         imageUploaded,
         previewImage,
         exportToCsv,
         leftPicture,
         rightPicture,
         getAllData,
         insertValue,
         getAllUsers,
         comprobarMask,
         returnLogin,
      };
   },
});
</script>
