import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductApi } from "../../services/api/product-api"
import { ProductModel, ProductSnapshot } from "../product/product"
import { withEnvironment } from "../extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */
export const ProductStoreModel = types
  .model("ProductStore")
  .props({
    products: types.optional(types.array(ProductModel), []),
    product: types.maybe(types.reference(ProductModel))
  })
  .extend(withEnvironment)
  .views((self) => ({}))
  .actions((self) => ({
    saveProducts(products: ProductSnapshot[]) {
      self.products.replace(products)
      console.log('products: ', self.products)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getProducts: async () => {
      const productApi = new ProductApi(self.environment.api)
      const result = await productApi.getProducts()
      if (result.kind === "ok") {
        self.saveProducts(result.products)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
    setProductSelected(productSelected) {
      self.product = productSelected
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ProductStoreType = Instance<typeof ProductStoreModel>
export interface ProductStore extends ProductStoreType { }
type ProductStoreSnapshotType = SnapshotOut<typeof ProductStoreModel>
export interface ProductStoreSnapshot extends ProductStoreSnapshotType { }
export const createProductStoreDefaultModel = () => types.optional(ProductStoreModel, {})
