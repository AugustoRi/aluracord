import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNTMyNSwiZXhwIjoxOTU4ODgxMzI1fQ.Xm_nUyIjmsA3CRtZNqa2u2KGFbMeDjMf0eScVmweU5E";
const SUPABASE_URL = "https://vtvuzdaxizuahbpsicuw.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// const mensagem = () => {
//   supabaseClient
//   .from('mensagens')
//   .insert([
//     mensagem,
//   ])
//   .then(({ data }) => {
//     console.log(data);
//     setListaDeMensagensDoChat([data[0], ...listaMensagensDoChat]);
//     setMensagem("");
//   })
// }

/*
OQ QUERO FAZER NESSE ARQUIVO

[] CRIAR UM PADRAO PARA PEGAR OS DADOS NO SUPABASE
[] CRIAR UM METODO PARA PEGAR OS DADOS DE UMA NOVA MENSAGEM: {ID, TEXTO E USER}

*/

// const dadosPegados = () => {
//   supabaseClient.from('mensagens').select('*').then(async ({ data })=> {
//     return await data;
//   })
// }

// supabaseClient.from('mensagens').select('*').then(({  })=> {
//   console.log('Tudo', response)
// })

// dadosPegados,
export {  supabaseClient };