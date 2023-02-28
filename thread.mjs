import { threadId, parentPort } from 'node:worker_threads'

/* once(uma vez)
O método parentPort é um recurso fornecido pelo módulo worker_threads do Node.js, que permite que uma thread secundária (worker thread) se comunique com sua thread pai (main thread) por meio de uma porta de mensagem.

O método parentPort é um membro do objeto Worker que representa a porta de comunicação entre a thread secundária e a thread pai. Através do objeto parentPort, é possível enviar e receber mensagens entre as duas threads.

O método once pode ser utilizado em conjunto com parentPort para registrar uma função que deve ser executada apenas uma vez quando uma mensagem específica é recebida na porta de comunicação parentPort. Isso pode ser útil, por exemplo, quando a thread pai precisa receber uma resposta única de uma thread secundária em resposta a uma solicitação específica.

No fim das contas o worker vai receber um postMessage do index e devolver um postMessage de volta pro index o thread id e a quantidade de itens que ele processou

o from ate o to. A nossa thread principal ou seja o index vai delegar quanto que cada thread vai processar e vai esperar o resultado de cada uma delas de forma dinamica.
*/
parentPort.once('message', ({ from, to }) => {
  // Essa função era pra travar o processo principal, mas como estamos usando o worker_threads, então nada vai ficar travado
  console.time(`benchamark-${threadId}`)
  let count = 0
  for (let i = from; i < to; i++) {
    count++
  }

  // threadId -> id da thread que rodou a terefa
  console.timeEnd(`benchamark-${threadId}`)
  parentPort.postMessage(`I'm ${threadId} done! with ${count} items`)
})
