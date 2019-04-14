# Customer Backend

## Setup

```sh
yarn
yarn setup
```

Update the `.env` file.

## Development

```sh
yarn dev
```

## Production

```sh
yarn start
```

---

# Endpoint and Data

## Customers

| Endpoint             | Method | Description           | isAuthenticated |
| -------------------- | ------ | --------------------- | --------------- |
| `/`                  | GET    | Hello jasa            |                 |
| `/customet/register` | POST   | Register new customer |                 |
| `/users/login`       | POST   | Login to customer     |                 |
| `/users/profile/:id` | GET    | Get profile customer  | YES             |
