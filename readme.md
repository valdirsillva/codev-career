# Projeto de Vagas de Tecnologia

Bem-vindo ao projeto **Codev-Career**! O Codev-Career e um sistema para conectar empresas e candidatos, permitindo que ambos interajam em um ambiente digital para divulgar e se candidatar a oportunidades de trabalho na área de tecnologia.

## Diagramas do Sistema

### Visão Geral da Arquitetura

#### Diagrama de classe:

![Exemplo de Diagrama](https://github.com/valdirsillva/codev-career/blob/main/docs/diagram-class.png)

#### Diagrama de objetos:
![Exemplo de Objetos](https://github.com/valdirsillva/codev-career/blob/main/docs/diagram-object.png)

## Tecnologias Utilizadas

### Frontend
- **ReactJS**: Framework para a construção de interfaces de usuário dinâmicas e modernas.
- **React Query**: Gerenciamento de estado assíncrono e caching de dados de forma otimizada.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, garantindo maior segurança e produtividade.
- **Tailwind CSS**: Estilização com classes utilitárias, permitindo uma abordagem rápida e customizável.
- **Lucide React**: Biblioteca de icones.

### Backend
- **Node.js**: Ambiente de execução JavaScript para desenvolvimento do servidor.
- **Fastify**: Framework web leve e de alta performance.
- **Prisma**: ORM para interagir com o banco de dados de forma simples e eficiente.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações do sistema.

### Arquitetura
- **MVVM** (Model-View-ViewModel): Arquitetura que separa responsabilidades e facilita a manutenção e evolução do código.

## Funcionalidades

### Para Candidatos
- Cadastro e autenticação.
- Atualização de perfil, incluindo informações pessoais e experiências profissionais.
- Pesquisa e candidatura a vagas de tecnologia.

### Para Empresas
- Cadastro e autenticação.
- Publicação de vagas detalhadas (título, requisitos, salário, entre outros).
- Gerenciamento de candidaturas recebidas.

### Gerais
- Interface intuitiva e responsiva.
- Gerenciamento eficiente de estado e dados com React Query.
- Segurança na manipulação de dados sensíveis com TypeScript e Prisma.

## Estrutura do Projeto

```plaintext
.
├── frontend/         # Código do frontend com ReactJS;
├── backend/          # Código do backend com Fastify e Prisma;
├── docker-composer   # Definição docker-compose para gerenciar conteineres da aplicação;
├── docs/             # Diagramas do sistema;
└── README.md         # Documentação do projeto;
```

## Requisitos

- **Node.js** (v18 ou superior)
- **PostgreSQL** (v13 ou superior)
- **Docker** (opcional, para facilitar o setup do ambiente)

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/valdirsillva/codev-career.git
   cd vagas-de-tecnologia
   ```

2. Configure o banco de dados:
   - Certifique-se de que o PostgreSQL está em execução.
   - Atualize o arquivo `.env` com as credenciais do banco de dados:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/vagas_de_tecnologia
     ```

3. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

6. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

7. Inicie o frontend:
   ```bash
   npm run dev
   ```

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Basta seguir os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature ou correção de bug:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Adiciona minha nova feature"
   ```
4. Envie as alterações para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto é licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

## Contato

Se tiver dúvidas ou sugestões, entre em contato:
- **Email**: valdirpiresba@gmail.com
- **GitHub**: [seu-usuario](https://github.com/valdirsillva)

---

Agradecemos por usar o **Codev-career**! 🚀




