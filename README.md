# Design Patterns — Task Management

Демонстрация паттернов проектирования на примере системы управления задачами.

## Технологии

- TypeScript
- Node.js

## Паттерны

### 1. Composite

Иерархия задач: составные (`Epic`, `Story`) содержат дочерние, листовые (`Bug`, `Feature`) — нет.

### 2. Factory Method

Абстрактный `TaskCreator` с конкретными фабриками (`BugTaskCreator`, `FeatureTaskCreator` и др.) для создания задач.

### 3. Chain of Responsibility

Пайплайн обработки: `Validation` → `Estimation` → `Assignment` → `Execution` с агрегацией результатов для composite-узлов.

## Запуск

Установка:

```
npm ci
```

Сборка:

```
npm run build
```

Запуск:

```
npm run start
```