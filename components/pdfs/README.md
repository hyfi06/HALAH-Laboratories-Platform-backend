# PDF

This component manager the result in pdf.

## Routes

```http
/api/pdfs
```

### GET `/api/pdfs`

Generate a pdf with de results of given ordersId

Data send in body as JSON.

```js
{
  "orderIds": [
    ""
  ]
}
```

Response code 200:

Return a stream with content type 'application/pdf'
