# API Node.js Grades

Trabalho realizado para conclusão de modulo sobre construção de API em Node.js do Bootcamp IGTI Desenvolvedor Fullstack 10/2020.

Esta API realiza a leitura de uma base de dados em arquivo json contendo um contador de entradas para novas inclusões e um objeto contendo, nesta ordem, o id, o nome do aluno, o módulo, a atividade realizada e a nota obtida. Através dos verbos HTTP do protocolo REST são realizadas operações de inclusão busca por id, busca de toda a base de dados, exclusão de uma entrada e alteração de dados.

Apesar de ser uma API simples, esta realiza operações assincronas de leitura e escrita em disco, verificação de erros e manipulação de dados e criação de logs.

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Winston**

## Instalação

Para realizar a instalação é necessário baixar este repositório através do comando git clone e a seguir a instalação dos pacotes utilizando npm install.