import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ProductModel = types
  .model("Product")
  .props({
    id: types.identifierNumber,
    categoryId: types.maybe(types.number),
    name: types.maybe(types.string),
    imageUrl: types.maybe(types.string),
    salePrice: types.maybe(types.number),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProductType = Instance<typeof ProductModel>
export interface Product extends ProductType { }
type ProductSnapshotType = SnapshotOut<typeof ProductModel>
export interface ProductSnapshot extends ProductSnapshotType { }
export const createProductDefaultModel = () => types.optional(ProductModel, {})
