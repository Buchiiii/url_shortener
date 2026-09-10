# API DOCUMENTATION

BASE URL: `http:/localhost:3000/api/v1`

## AUTHENTICATION

This api does not have authentication

---

## Create Short URL

This generates the short url

**POST** `/links`

### Request

```json
{
  "long_url": "https://www.google.com",
  "custom_alias": "google"
}
```

`custom_alias` is optional.

### Success Response

```json
{
  "data": {
    "id": 1000001,
    "long_url": "https://www.google.com",
    "short_code": "google",
    "short_url": "http://localhost:3000/google"
  },
  "message": "Success"
}
```

### Error Responses
| Status | Meaning |
| --------- | --------- |
| 400 | Invalid URL |
| 409 | Already exists | 

---

## Redirect

Redirects to the original URL.

**GET** `/:shortCode`

### Example

`GET /google`

### Response

Returns **HTTP 302** with the `Location` header pointing to the original URL.

Example:

```http
HTTP/1.1 302 Found
Location: https://www.google.com
```

If the shortcode does not exist:

```json
{
  "statusCode": 404,
  "message": "Link not found"
}
```