import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CustomerModel = types
  .model("Customer")
  .props({
    id: types.identifierNumber,
    name: types.maybe(types.string),
    avatar: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type CustomerType = Instance<typeof CustomerModel>
export interface Customer extends CustomerType { }
type CustomerSnapshotType = SnapshotOut<typeof CustomerModel>
export interface CustomerSnapshot extends CustomerSnapshotType { }
export const createCustomerDefaultModel = () => types.optional(CustomerModel, {})
