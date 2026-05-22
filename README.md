# HairDay ✂️ 
O **HairDay** é um sistema de gestão de agendamentos desenvolvido para barbeiros que buscam organizar seus horários de atendimento de maneira simples, intuitiva e eficiente.



---

## ⚙️ Funcionalidades e Recursos

### 1. Criação Dinâmica de Agendamento

O formulário na barra lateral permite cadastrar novos atendimentos:

* **Filtro em tempo real de horários**: Ao escolher uma data, a aplicação analisa os agendamentos registrados no banco de dados para o dia correspondente e desabilita instantaneamente os botões dos horários já ocupados.

* **Prevenção de duplicidade**: Caso a chamada à API seja feita de forma direta para um horário concorrente, o backend retorna um erro `409 Conflict` com uma mensagem amigável ao usuário.

### 2. Remoção de Agendamentos

Qualquer cartão de agendamento possui um botão de exclusão rápida (ícone da lixeira 🗑️).

### 3. Agrupamento por Períodos

Os atendimentos do dia selecionado são exibidos de forma categorizada por períodos do dia:

* 🌅 **Manhã**: das `09:00` às `12:00`
* ☀️ **Tarde**: das `13:00` às `18:00`
* 🌙 **Noite**: das `19:00` às `21:00`

Se um determinado período não possuir atendimentos cadastrados para a data escolhida, uma mensagem amigável e estilizada é exibida em seu lugar: *"Você ainda não tem agendamentos cadastrados nesse período."*

### 4. Filtro por Data

O filtro de data superior permite que o usuário navegue dia a dia para planejar a agenda da barbearia de forma otimizada.


---

## 🛠️ Stack Tecnológica

### Frontend
* **React 19**.
* **Vite 8**.
* **Tailwind CSS**.
* **Phosphor Icons**.
* **TypeScript**.

### Backend
* **Fastify**.
* **TypeScript & TSX**.
* **Prisma ORM 7**.
* **SQLite**.
