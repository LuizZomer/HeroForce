# 📘 Relação entre Project e ProjectGoal

Este documento descreve as **regras de negócio** e a **lógica de domínio** que regem a relação entre as entidades `Project` e `ProjectGoal`.

---

## 🧩 Contexto Geral

Um **Project** representa um projeto gerenciado pela aplicação.  
Cada projeto pode possuir **várias metas (`ProjectGoal`)** que descrevem **objetivos específicos** a serem alcançados — por exemplo, número de tarefas concluídas, receita atingida, número de usuários ativos, etc.

A relação entre eles é de **1:N** (um projeto → várias metas).

---

## ⚙️ Estrutura e Regras da Relação

### 1. **Entidade `Project`**

- Cada projeto tem:
  - Um **responsável (`User`)** — representado por `responsibleId`.
  - Um **status** (`ProjectStatusEnum`) que indica o estágio atual do projeto (ex.: pendente, em progresso, concluído).
  - Um **conjunto de metas (`goals`)** ligadas a ele, definidas pela relação:
    ```ts
    @OneToMany(() => ProjectGoal, (goal) => goal.project, { cascade: true })
    goals: ProjectGoal[];
    ```
  - O `cascade: true` indica que **ao salvar ou remover um projeto**, as metas associadas também são automaticamente persistidas/removidas.

---

### 2. **Entidade `ProjectGoal`**

- Cada meta (`ProjectGoal`) pertence a **um único projeto**, via:
  ```ts
  @ManyToOne(() => Project, (project) => project.goals)
  @JoinColumn({ name: 'project_id' })
  project: Project;
  ```
- Contém os seguintes atributos de negócio:
  - `type`: o tipo da meta (ex.: agility, enchantment, efficiency, etc.. — definido pelo enum `GoalType`).
  - `targetValue`: o **valor-alvo** a ser alcançado.
  - `currentValue`: o **valor atual** de progresso.
  - `deadline`: o **prazo limite** da meta.
  - `achieved`: se a meta foi **alcançada** ou não (booleano).

O campo currentValue pode representar métricas diferentes para cada meta, dependendo do tipo de objetivo definido. Isso significa que o valor de targetValue e a forma como o progresso é interpretado variam conforme o contexto da meta. Por exemplo, uma meta pode ter targetValue = 100 e usar porcentagem (%) como unidade de medida — indicando que o objetivo é atingir 100% de progresso. Já outra meta pode ter targetValue = 5 com a métrica "tarefas concluídas", representando que o objetivo é finalizar 5 tarefas específicas. Essa flexibilidade permite que cada ProjectGoal seja configurado com a métrica mais adequada ao seu propósito, mantendo um modelo genérico e reutilizável para diferentes tipos de projetos.

---

## 💡 Regras de Negócio Derivadas da Relação

1. **Cada projeto pode ter várias metas (`ProjectGoal`)**, mas uma meta pertence a apenas um projeto.
2. O progresso de um projeto é **calculado a partir do progresso de suas metas**.
3. O progresso de cada meta é dado por:
   ```ts
   progress = (currentValue / targetValue) * 100;
   ```
   - Se `targetValue` for 0, o progresso é 0%.
   - O valor é limitado a **100% no máximo** (não pode ultrapassar).
4. O **progresso total do projeto** é uma **média aritmética simples** do progresso de todas as suas metas:
   ```ts
   totalProgress = soma(progress das metas) / número de metas
   ```
5. Caso um projeto **não tenha metas**, o progresso total é **0%**.

💬 Exemplo prático:

| Projeto   | Meta   | Current | Target | Progresso |
| --------- | ------ | ------- | ------ | --------- |
| Projeto A | Meta 1 | 50      | 100    | 50%       |
| Projeto A | Meta 2 | 100     | 200    | 50%       |

➡️ `totalProgress = (50 + 50) / 2 = 50%`

---

## 📈 Resumo Conceitual

| Conceito               | Descrição                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Project**            | Entidade principal que representa um projeto.                                       |
| **ProjectGoal**        | Subentidade que define metas mensuráveis para o projeto.                            |
| **Relação**            | 1 projeto → N metas (com cascata).                                                  |
| **Regra de progresso** | Cada meta tem progresso individual; o projeto reflete a média das metas.            |
| **Persistência**       | Operações em `Project` afetam automaticamente `ProjectGoal` por causa do `cascade`. |
| **Finalidade**         | Permitir acompanhamento granular e agregado do desempenho do projeto.               |

---

## 🗂️ Possível Diagrama ER Simplificado

```
+------------+           +------------------+
|  projects  | 1       N |  project_goals   |
+------------+-----------+------------------+
| id         |           | id               |
| name       |           | type             |
| status     |           | target_value     |
| responsible_id |       | current_value    |
| created_at |           | project_id (FK)  |
+------------+           +------------------+
```

---
