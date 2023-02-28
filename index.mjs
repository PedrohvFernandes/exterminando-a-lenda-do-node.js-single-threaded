// UV_THREADPOOL_SIZE=100 node index.mjs
// child_process filho do processo principal, que resolve algo e retorna para o processo principal
// prefixo node: é para o nodejs entender que é um modulo/lib/pacote nativo do nodejs
import { execSync } from 'node:child_process'
import { Worker } from 'node:worker_threads'

// Metodo pra saber quantas threads estao rodando no processo
function getCurrentThreadCount() {
  // obtem quantidade de threadds do process e conta
  /* 
    ps -M e wc -l para MacOs ps é um comando do terminal que lista os processos em execução no sistema operacional. A opção -M é usada para listar apenas os processos que têm threads associados a eles.

    Por outro lado, wc é um comando do terminal que conta o número de linhas, palavras ou caracteres em um arquivo ou saída de comando. A opção -l especifica que apenas o número de linhas deve ser contado.

    Portanto, a combinação ps -M | wc -l lista os processos com threads associados e conta o número de linhas na saída, que é o número total de processos com threads. Esse comando é usado no contexto de monitoramento e gerenciamento de processos e threads em um sistema operacional.
  */
 
  //  return parseInt(execSync(`ps -M ${process.pid} | wc -l`).toString())

  // Windows: tasklist /FI "PID eq 1234" /NH
  // return parseInt(`${process.pid}`).toString()
  // return parseInt(
  //   execSync(`tasklist /FI "PID eq ${process.pid}" /NH`).toString()
  // )
  return parseInt(
    execSync(`tasklist /FI "PID eq ${process.pid}" /NH`).toString().length
  )
}

// cria uma thread
function createThread(data) {
  // nosso arquivo com uma certa tarefa que vai rodar em uma thread, usando o worker_threads que cria multiplas threads para supostas tarefas que iriam travar tudo.
  const worker = new Worker('./thread.mjs')
  // cria uma promise que vai ser resolvida quando a thread terminar de processar ou rejeitada se der erro
  const p = new Promise((resolve, reject) => {
    worker.once('message', message => {
      return resolve(message)
    })
    worker.once('error', reject)
  })

  // envia uma mensagem para a thread, no caso o from e o to
  worker.postMessage(data)
  return p
}

// Sem o worker, vai travar
async function asyncBlockingFunction(data) {
  const p = new Promise((resolve, reject) => {
    console.time(`promise`)
    for (let i = data.from; i < data.to; i++);
    console.timeEnd(`promise`)

    resolve('termineeei')
  })

  return p
}

// ignora o processo principal
const nodejsDefaultThreadNumber = getCurrentThreadCount() - 1 // ignora o process

console.log(
  `Im running`,
  // process.pid = id do processo
  process.pid,
  `default threads: ${nodejsDefaultThreadNumber}`
)

let nodejsThreadCount = 0
const intervalId = setInterval(() => {
  // console.log(`running at every sec: ${new Date().toISOString()}`)

  // dessa forma vemos somente as threads que criamos manualmente
  const currentThreads = getCurrentThreadCount() - nodejsDefaultThreadNumber
  if (currentThreads == nodejsThreadCount) return

  nodejsThreadCount = currentThreads
  console.log('threads', nodejsThreadCount)
})

// for(let i =0; i< 1e20; i++);

// await Promise.all([
//   asyncBlockingFunction({
//     from: 0,
//     to: 1e10
//   }),
//   asyncBlockingFunction({
//     from: 0,
//     to: 1e9
//   }),
// ])

// Aqui executa/criamos as threads
// promisse.all espera todas as promises serem resolvidas para continuar
await Promise.all([
  createThread({
    from: 0,
    to: 1e9
  }),
  createThread({
    from: 0,
    to: 1e9
  }),
  createThread({
    from: 0,
    to: 1e8
  }),
  createThread({
    from: 0,
    to: 1e10
  }),
  createThread({
    from: 0,
    to: 1e3 // 1000
  })
]).then(results => console.log(results))

clearInterval(intervalId)
