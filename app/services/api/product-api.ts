import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetProductsResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import axios from "axios"


export class ProductApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    async getProducts(): Promise<GetProductsResult> {
        try {
            // make the api call
            const response: ApiResponse<any> = await this.api.apisauce.get(
                "http://10.0.2.2:3000/products"
            )
            // the typical ways to die when calling an api
            if (!response.ok) {
                const problem = getGeneralApiProblem(response)
                if (problem) return problem
            }

            const products = response.data

            return { kind: "ok", products: products }
        } catch (e) {
            __DEV__ && console.tron.log(e.message)
            return { kind: "bad-data" }
        }
    }
}
