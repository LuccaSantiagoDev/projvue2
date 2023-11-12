<template>
  <div class="about">
    <h1>Salve {{ nome }}!</h1>

    <div class="menu">
      <div class="nome">
      <label for="nome">Nome </label>
      <input id="nome" type="text" v-model="nome" />
    </div>
    <div class="senha">
      <label for="senha">Senha </label>
      <input id="senha" type="password" v-model="senha" />
    </div>  
    
    </div>
    <div class="cadastrar">
      <button @click="cadastrar">Cadastrar</button>
    </div>

    <p v-if="erro">{{ erro }}</p>
      <input type="text" v-model="nome" />
    <p class="p" v-if="nome.length > 5 ">Nome grande</p>
    <p class="p" v-else>Nome pequeno</p>

     <div class="table">
      <table>
        <thead>
          <td>Id</td>
          <td>Nome</td>
        </thead>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nome }}</td>
        </tr>
      </table>
     </div> 
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const nome = ref("Nome");
const senha = ref("123");
const erro = ref();
const usuarios = ref();

async function atualizar() {
  try {
    usuarios.value = (await axios.get("usuario")).data;
  }
  catch(ex) {
    erro.value = (ex as Error).message;
  }
}

async function cadastrar() {
  try {
    await axios.post("usuario",
  {
    nome: nome.value,
    senha: senha.value
  });
  }
  catch(ex) {
    erro.value = (ex as Error).message;
  }
  
  atualizar();
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
.senha{
  margin-left: 1rem;
  
}

.nome{
  margin-bottom: 1rem;
  
}

.cadastrar{
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1rem;
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
</style>