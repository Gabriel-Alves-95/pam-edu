# Pam.edu

Esse projeto foi desenvolvido durante a primeira fase do processo seletivo da *Pam* para o cargo de Desenvolvedor Fullstack Júnior. Trata-se de uma aplicação fullstack para o gerenciamento da escola fictícia *Pam.edu*.

## O que fizemos?

O projeto consiste em uma *SPA* (Single Page Application) que permite realizar as operações *CRUD* (Create-Read-Update-Delete) sobre a base de dados da escola *Pam.edu*. Nomeadamente, podemos cadastrar, visualizar, editar e excluir professores, responsáveis, estudantes e cursos.

## Com quais Tecnologias?

No Frontend, lançamos mão do *ReactJS* juntamente com o *React Router* para criar nossa *SPA*. Para agilizar a confecção dos templates, usamos o *React Bootstrap*.

No Backend, utilizamos os frameworks *Django* e *Django Rest*. Nosso frontend consome dados do banco através da API desenvolvida com este último framework. O banco de dados adotado para este projeto foi o *MySQL*.

## O que faremos?

1. Para o futuro, pretendo modificar a exibição dos formulários. Onde for possível, quero alinhar dois ou mais inputs, ao invés de deixá-los dispostos simplesmente linha a linha. Também adicionarei validações aos mesmos. Por enquanto, não há nenhuma validação no frontend para os formulários, de modo que precisamos estar atentos aos dados que estamos passando.

2. Atualmente, temos prontas apenas as funcionalidades do Admin. Pretendo trabalhar nas funcionalidades dos estudantes e professores. Por exemplo, os professores poderão ver a lista de cursos que ministram e a lista de alunos inscritos em cada uma dessas turmas. Poderão também realizar o lançamento de notas. Por sua vez, os alunos poderão ver os cursos em que estão inscritos e acompanhar seu andamento.

3. Um bônus interessante seria adicionar certas funcionalidades implementadas em alguns *AVAs* (Ambientes Virtuais de Aprendizagem). Por exemplo, os professores poderiam fazer upload de materias para os seus alunos e atribuir provas e tarefas a serem cumpridas dentro de um determinado prazo.

4. Para isso, precisaríamos adicionar uma tela de login com a respectiva model de validação no backend. Uma vez logados, o sistema só nos permite realizar operação condizentes com a nossa *role* (Admin, professor, responsável, aluno).

5. Embora seja possível cadastrar cursos, o frontend do nosso app ainda não nos permite adicionar alunos a eles. O backend já está pronto para esta funcionalidade. Nos falta fazer algumas atualizações na página de criação de curso para resolver esta limitação.

## Rodando o projeto em sua máquina local 

Para rodar esse projeto em sua máquina local, é preciso ter instalado o *Node*, o *Python 3* e o *MySQL*. Não se esqueça de configurar a conexão com o banco usando os seus dados. Vá até o arquivo *development.py* que está dentro da pasta *settings* em *Django_Admin* e preencha o que estiver faltando com as suas informações.

```
Backend_Django > Django_Admin > settings > development.py
```
![Preencha os espaços vazios com suas informações pessoais](https://user-images.githubusercontent.com/111741554/222181931-ff1ac397-2c84-4ebc-9ace-048a2246a527.png)

## Vídeos

Nesta última seção, anexamos alguns vídeos da aplicação rodando em nossa máquina local.

### CRUD de Professores

https://user-images.githubusercontent.com/111741554/222182101-0a05e6a7-a82a-401b-8c07-7eb9ec86f45c.mp4

### CRUD de Cursos

https://user-images.githubusercontent.com/111741554/222182182-522fed0c-ef1c-41d6-be4b-2bab08a91b47.mp4

### Responsividade do template

https://user-images.githubusercontent.com/111741554/222182236-9044d6c4-31d4-4d39-8787-cbfc2c720ceb.mp4

### Conexão 3G Lenta

https://user-images.githubusercontent.com/111741554/222182304-910cb051-6e39-4293-b2c1-8e8896f97c0f.mp4

### CRUD de Estudantes com Conexão 3G Lenta

https://user-images.githubusercontent.com/111741554/222182366-bdca4b68-9f79-406a-b19f-8888215d9fd7.mp4

### CRUD de Responsáveis

https://user-images.githubusercontent.com/111741554/222182430-4918ee67-e8ac-4c3f-a9ac-e279a2d58db4.mp4
