# Exterminando a lenda do Node.js single-threaded na prática usando workers threads do lado do back-end

## Do que o projeto aborda:

O projeto aborda a lenda do Node.js single-threaded, onde o Node.js é considerado uma linguagem de programação single-threaded, mas na prática, o Node.js é uma linguagem de programação multi-threaded e que por de baixos do pano foi desenvolvido em c++ igual ao Java e curiosamente igual as navegadores, que não são feitos em JS, mas sim em C e que so interpretam codigo JS, claramente que existe navegadores hoje que são feitos em JS, mas somente os modernos. Temos que falar sobre o V8 e a libuv. 

O V8 é o mecanismo JavaScript usado pelo Node.js para interpretar e executar código JavaScript em tempo de execução. Ele é projetado para ser executado em um ambiente de servidor e fornece um alto desempenho devido à sua capacidade de compilar o código JavaScript em código nativo de máquina.

A libuv é usada pelo Node.js para gerenciar as operações de entrada e saída assíncronas, além de fornecer uma camada de abstração para trabalhar com diferentes sistemas operacionais. Ela é responsável por manipular eventos e aguardar por eventos, permitindo que o Node.js execute operações de entrada e saída de forma assíncrona sem bloquear a execução do programa.

O Node.js pode ser considerado um controlador, pois fornece uma camada de abstração para trabalhar com o sistema operacional, permitindo que os desenvolvedores escrevam código em JavaScript que possa interagir com o sistema operacional, acessar o sistema de arquivos, estabelecer conexões de rede e muito mais. Além disso, o Node.js também fornece uma ampla variedade de módulos nativos que podem ser usados para estender a funcionalidade do programa.

Em resumo, o Node.js é uma plataforma de tempo de execução que usa o V8 para interpretar e executar código JavaScript, a libuv para gerenciar as operações de entrada e saída assíncronas e fornece uma camada de abstração para trabalhar com o sistema operacional. Ele pode ser considerado um controlador, pois fornece uma interface para trabalhar com diferentes módulos e recursos do sistema operacional.

Então quando você usa o setInterval saiba que ele esta vindo do c++, igual ao o fs.readFile() do node é um espelho um proxy, pra chamar a função que eu ja tinha criado no c++, no fim o node.js não é js, o browser não é js ele usa as formas para interpretar os codigos.

E para rodar alguma tarefa que supostamente iria travar tudo seja uma leitura de um arquivo grande, edição de video ou um for loop enorme, usamos as workers threads, que são as multiplas threads, que vai deixar executando essa suposta tarefa em segundo plano. Um exemplo desse so que no front-end é o web worker, que é uma thread separada do browser, que vai executar uma tarefa em segundo plano, sem travar o browser. ex de código [performance-multithreading-em-navegadores-ECMAScript-Modules-em-Web-Workers](https://github.com/PedrohvFernandes/performance-multithreading-em-navegadores-ECMAScript-Modules-em-Web-Workers)

Apesar de conseguir fazer isso, é muito importante que tenha bom senso na hora que usar, tanto no front quanto no back, pelo fato que o node e o js foram feitos para não consumirem tanto recurso do sistema, usando somente uma thread e colocando tudo em um event loop, para que não precisa-se utilizar outras thread da CPU.


## Como rodar o projeto:

- node index.mjs
- Com a libuv podemos setar a quantidade de threads - UV_THREADPOOL_SIZE=10 node index.mjs OU UV_THREADPOOL_SIZE=100 node index.mjs --> O size nada mais é que as threads default do proprio node
- UV_THREADPOOL_SIZE=1 node index.mjs pega realmente as threads que estão sendo realmente usadas da sua CPU, e não as threads default do node(Obs: no codigo retiramos a thread principal, o processo principal)

## Tecnologias principais usadas no back-end:

- Node.js puro

## Referencia:

- [Erick Wendel](https://www.youtube.com/watch?v=f7MY2OtI7nA)
- [multi-thread.js](https://gist.github.com/ngot/4e363c08c1a912f3f10fda882a9e3956)
- [Is Node.js considered multithreading with worker threads?](https://stackoverflow.com/questions/63224356/is-node-js-considered-multithreading-with-worker-threads/63225073#63225073)
