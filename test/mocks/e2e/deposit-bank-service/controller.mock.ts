export const controllerParamsMock = {
  "destination": {
      "vatNumber": "0000000000"
  },
  "amount": {
      "currency": "USD",
      "value": 225.00
  },
  "description": "any_description_for_this_transfer"
}

export const controllerResponseMock = {
  "id": "any_deposit_id",
  "object": "deposit",
  "amount": {
      "currency": "BRL",
      "value": 250.78
  },
  "created": 1405637071,
  "transactionAccountInfos": {
      "source": {
          "vatNumber": "00000000000"
      },
      "destination": {
          "vatNumher": "00000000000"
      }
  }
}