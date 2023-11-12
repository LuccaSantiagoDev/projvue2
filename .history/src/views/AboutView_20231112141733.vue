<template>
  <div class="about">
    <h1>Segundou!</h1>

    <div class="menu">
      <div class="nome">
        <label for="termo">Termo </label>
        <input type="text" id="termo" name="termo" v-model="termo" />
      </div>
    <div class="medida">
      <label for="significado">Significado </label>
      <input id="significado" type="text" v-model="significado" />
    </div>
    <div class="particula">
      <label for="versao">Versao </label>
      <input id="versao" type="float" v-model="versao" />
    </div>  
    
    </div>
    <div class="cadastrar">
      <button @click="cadastrar">Cadastrar</button>
    </div>

    <p v-if="erro">{{ erro }}</p>
    <div class="search">
      <div class="nome">
        <label for="searchTerm">Termo:</label>
        <input type="text" id="searchTerm" v-model="searchTerm" />
      </div>
    <div class="medida">
      <label for="searchVersao">e Versao:</label>
      <input type="text" id="searchVersao" v-model="searchVersao" />
    </div>
    <div class="buttonsearch">
      <button @click="buscar">Buscar</button>
    </div>
  </div>

     <div class="table">
      <template v-if="vocabulos && vocabulos.length > 0">
        <table>
          <thead>
            <td>Id</td>
            <td>Termo</td>
            <td>Significado</td>
            <td>Versao</td>
          </thead>
          <tr v-for="vocabulo in vocabulos" :key="vocabulo.id">
            <td>{{ vocabulo.id }}</td>
            <td>{{ vocabulo.termo }}</td>
            <td>{{ vocabulo.significado }}</td>
            <td>{{ vocabulo.versao }}</td>
          </tr>
        </table>
      </template>
      <template v-else>
        <p>Nenhum vocábulo encontrado</p>
      </template>
     </div> 
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const searchTerm = ref("");
const searchVersao = ref("");
const significado = ref("significado");
const termo = ref("termo");
const erro = ref();
const versao = ref("versao");
const vocabulos = ref();
const dataHora = ref('');


async function atualizar() {
  try {
    vocabulos.value = (await axios.get("vocabulo")).data;
  } catch (ex) {
    erro.value = (ex as Error).message;
  }
}

async function cadastrar() {
  try {
    await axios.post("vocabulo", {
      termo: termo.value, 
      significado: significado.value, 
      versao: versao.value, 
      dataHora: dataHora.value
    });

    termo.value = "";
    significado.value = "";
    versao.value = "";
  } catch (ex) {
    erro.value = (ex as Error).message;
  }

  atualizar();
}

async function buscar() {
  try {
    if (searchTerm.value || searchVersao.value) {
      vocabulos.value = await (await axios.get(`vocabulo/${searchTerm.value}/${searchVersao.value}`)).data;
    } else {
      atualizar();
    }
  } catch (ex) {
    erro.value = (ex as Error).message;
  }
}

onMounted(() => {
  atualizar();
});
</script>
<style>

  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

.table{
  display: flex;
  justify-content: center;
  align-items: center;
   

  margin-top: 1rem;
}

.p{   
  margin-left: 1rem;
}
.medida{
  margin-left: 1rem;
  
}

.particula{
  margin-left: 1rem;
  
}

.nome{
  margin-bottom: 1rem;
  
}

.cadastrar{
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
}

.buttonsearch{
  border: solid 3px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}
button {
  padding: 0.5rem 1rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

button:hover{
    transform: translateY(-0.5px);
    box-shadow: 0 0 7px hsla(160, 100%, 37%, 1);;
}

input {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;

  background-color: #ffff;
}
.menu{
  display: flex;
  justify-content: center;
}

.search{
  display: flex;
  justify-content: center;
}
</style>