<template>
    <div class="prova">
      <h1>Cadastro: </h1>
  
      <div class="menu">
    
      <div class="medida">
        <label for="medida">Medida </label>
        <input id="medida" type="text" v-model="medida" />
      </div>
      <div class="dataHora">
        <label for="dataHora">dataHora </label>
        <input id="dataHora" type="datetime-local" v-model="dataHora" />
      </div>  
      
      <div class="umidade">
        <label for="umidade">Umidade </label>
        <input id="umidade" type="float" v-model="umidade" />
      </div>  

      <div class="vento">
        <label for="vento">Vento </label>
        <input id="vento" type="float" v-model="vento" />
      </div>  

      <div class="particulas">
        <label for="particulas">Particulas </label>
        <input id="particulas" type="float" v-model="particulas" />
      </div>  

      
      
      
      </div>
      <div class="cadastrar">
        <button @click="cadastrar">Cadastrar</button>
      </div>
  
      <h2>Buscar por:  </h2>
      
      <div class="search">
        <div class="nome">
          <label for="searchMedida">Medida  </label>
          <input type="text" id="searchMedida" v-model="searchMedida" />
        </div>
      <div class="searchDataHora">
        <label for="searchDataHora">DataHora  </label>
        <input  type="datetime-local" id="searchDataHora" v-model="searchDataHora" />
      </div>
     
    </div>
    
      <div class="buttonsearch">
        <button @click="buscar">Buscar</button>
      </div>
  
      <div class="table">
  <template v-if="temperaturas && temperaturas.length > 0">
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Data/Hora</th>
          <th>Medida</th>
          <th>Sensação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="temperatura in temperaturas" :key="temperatura.id">
          <td>{{ temperatura.id }}</td>
          <td>{{ temperatura.dataHora }}</td>
          <td>{{ temperatura.medida }}</td>
          <td :class="{ 'quente': temperatura.medida > 26, 'ok': temperatura.medida <= 26 }">
            {{ temperatura.medida > 26 ? 'Quente' : 'Ok' }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <p>Nenhuma temperatura encontrada</p>
  </template>
</div>

      
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  
  const searchDataHora = ref("");
  const searchMedida = ref("");

  const medida = ref("medida");
  const umidade = ref("umidade");
  const dataHora = ref("dataHora");
  const vento = ref("vento");
  const particulas = ref("particulas");
 

  const temperaturas = ref();
  
  const erro = ref();
  
  async function atualizar() {
    try {
      temperaturas.value = (await axios.get("temperatura")).data;
    } catch (ex) {
      erro.value = (ex as Error).message;
    }
  }
  
  async function cadastrar() {
    try {
      await axios.post("temperatura", {
      medida:medida.value,
      dataHora: dataHora.value,
      umidade:umidade.value,
      vento:vento.value,
      particulas:particulas.value
      });
  
      medida.value = "";
      dataHora.value ="";
      umidade.value="";
      vento.value="";
      particulas.value="";
      
    } catch (ex) {
      erro.value = (ex as Error).message;
    }
  
    atualizar();
  }
  
  async function buscar() {
    try {
      if (searchMedida.value || searchDataHora.value) {
        temperaturas.value = await (await axios.get(`temperatura/${searchDataHora.value}/${searchMedida.value}`)).data;
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


.prova {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.menu,
.search {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.nome,
.medida,
.particula {
  margin-left: 1rem;
}

.cadastrar,
.buttonsearch {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.table {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

button:hover {
  transform: translateY(-0.5px);
  box-shadow: 0 0 7px hsla(160, 100%, 37%, 1);
}

input {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #ffffff;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}

table, th, td {
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
}

.p {
  margin-left: 1rem;
}

  
   </style>