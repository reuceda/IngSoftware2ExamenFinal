# Refactorizacion: Patron Factory para Gestion de Movimientos

## Objetivo
Reducir el acoplamiento entre la UI y las clases concretas de movimientos, centralizando la creación de objetos mediante el patrón Factory.

## Problema Identificado
El archivo `MovementList.jsx` tenía:
1. **Acoplamiento fuerte**: Importaba directamente 4 clases concretas (`Deposit`, `Withdrawal`, `Transfer`, `Payment`)
2. **Violación de OCP**: Usaba un `switch` para decidir qué clase instanciar, lo que requería modificar este archivo cada vez que se agregaba un nuevo tipo
3. **Responsabilidad dispersa**: La lógica de creación estaba mezclada con la lógica de presentación

## Solución Implementada

### 1. **MovementFactory.js**
Clase central que encapsula toda la lógica de creación:
- **Registro dinámico**: Usa un `Map` para registrar tipos de movimiento
- **Creación encapsulada**: Expone solo el método `createMovement()`
- **Extensible**: Nuevos tipos se registran sin modificar la fábrica

### 2. **Beneficios Obtenidos**

#### Reducción de Acoplamiento
- **Antes**: UI importaba 4 clases concretas + tenía lógica de creación
- **Después**: UI solo importa `MovementFactory` y recibe `IMovement` (abstracción)

#### Incremento de Cohesión
- **Antes**: `MovementList.jsx` tenía responsabilidades múltiples (presentación + creación)
- **Después**: Cada clase tiene una única responsabilidad bien definida

#### Cumplimiento de OCP (Open/Closed Principle)
La UI está **cerrada para modificación** pero **abierta para extensión**:
- Para agregar nuevo tipo: solo modificar dominio + registrar en fábrica
- La UI permanece intacta

### 3. **Pasos para Agregar Nuevo Tipo (ej: CHARGEBACK)**

1. **Crear nueva clase** en `domain/`:`javascript`
export class Chargeback extends Movement {
  getNetAmount() { return -Math.abs(this.amount); }
  getColor() { return '#dc2626'; }
  getIcon() { return '↩️'; }
  getTypeName() { return 'Contracargo'; }
}