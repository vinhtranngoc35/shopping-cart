import { BillModel } from "./bill"

test("can be created", () => {
  const instance = BillModel.create({})

  expect(instance).toBeTruthy()
})
