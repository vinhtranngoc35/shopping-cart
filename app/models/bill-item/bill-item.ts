import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BillItemModel = types
  .model("BillItem")
  .props({
    id: types.identifierNumber,
    idBill: types.maybe(types.number),
    productId: types.maybe(types.number),
    price: types.maybe(types.number),
    quantity: types.maybe(types.number),
    color: types.maybe(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BillItemType = Instance<typeof BillItemModel>
export interface BillItem extends BillItemType { }
type BillItemSnapshotType = SnapshotOut<typeof BillItemModel>
export interface BillItemSnapshot extends BillItemSnapshotType { }
export const createBillItemDefaultModel = () => types.optional(BillItemModel, {})
