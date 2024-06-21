# API Documentation

## Retrieve an item by ID

**GET** `/api/items/:id`

### Parameters

| Nom  | Type   | Description                |
|------|--------|----------------------------|
| id   | String | ID of the item to retrieve |

### Response

**200 OK**

```json
{
  "id": "1",
  "name": "Item One",
  "price": 100
}