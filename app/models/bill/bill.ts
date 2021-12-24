import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BillModel = types
  .model("Bill")
  .props({
    id: types.identifierNumber,
    customerId: types.identifierNumber,
    total: types.maybe(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BillType = Instance<typeof BillModel>
export interface Bill extends BillType { }
type BillSnapshotType = SnapshotOut<typeof BillModel>
export interface BillSnapshot extends BillSnapshotType { }
export const createBillDefaultModel = () => types.optional(BillModel, {})
