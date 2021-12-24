import { BillItemModel } from "./bill-item"

test("can be created", () => {
  const instance = BillItemModel.create({})

  expect(instance).toBeTruthy()
})
