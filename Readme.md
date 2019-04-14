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

| Endpoint                | Method | Description           | isAuthenticated |
| ----------------------- | ------ | --------------------- | --------------- |
| `/`                     | GET    | Hello jasa            |                 |
| `/customer/register`    | POST   | Register new customer |                 |
| `/customer/login`       | POST   | Login to customer     |                 |
| `/customer/profile/:id` | GET    | Get profile customer  | YES             |
