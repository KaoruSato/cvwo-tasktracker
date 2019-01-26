# ![](app/javascript/src/images/logo.png)
[![CircleCI](https://circleci.com/gh/dvrylc/cvwo-tasktracker.svg?style=svg)](https://circleci.com/gh/dvrylc/cvwo-tasktracker) [![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)](https://cvwo-tasktracker.herokuapp.com)

## Details
- Name: Chan Kok Jing, Daryl
- Matriculation number: A0183998B
- [Mid-assignment Write-up](writeups/Mid-assignment%20Write-up.pdf)
- [Final Write-up](writeups/Final%20Write-up.pdf)
- [Heroku Deployment](https://cvwo-tasktracker.herokuapp.com)

![](https://i.imgur.com/RTnF2X1.png)

## Setup

### Requirements
- PostgreSQL
- Ruby
- Node.js

### Steps
1. Clone the repository
2. `bundle && yarn`
3. `rails db:create && rails db:migrate`
4. Start two terminal sessions -
    - `rails s` for the Rails server
    - `bin/webpack-dev-server` for the webpack server, supports [HMR](https://webpack.js.org/concepts/hot-module-replacement/)

## API Documentation

### Read all tasks and tags
<details>
  <summary>Request</summary>
  <p>

  ```
  GET /api/all
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK

  {
    "tasks": [
      {
        "id": 1,
        "title": "Eat breakfast",
        "done": true,
        "created_at": "2019-01-21T03:42:40.591Z",
        "updated_at": "2019-01-21T03:42:41.631Z",
        "tag_id": 1
      },
      {
        "id": 2,
        "title": "Eat lunch",
        "done": false,
        "created_at": "2019-01-21T03:42:47.966Z",
        "updated_at": "2019-01-21T03:42:47.966Z",
        "tag_id": 1
      }
    ],
    "tags": [
      {
        "id": 1,
        "title": "meals",
        "created_at": "2019-01-21T03:37:02.839Z",
        "updated_at": "2019-01-21T03:37:02.839Z"
      },
      {
        "id": 2,
        "title": "homework",
        "created_at": "2019-01-21T03:44:37.477Z",
        "updated_at": "2019-01-21T03:44:37.477Z"
      }
    ]
  }
  ```

  </p>
</details>

### Read all tasks
<details>
  <summary>Request</summary>
  <p>

  ```
  GET /api/tasks
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK

  [
    {
      "id": 1,
      "title": "Eat breakfast",
      "done": true,
      "created_at": "2019-01-21T03:42:40.591Z",
      "updated_at": "2019-01-21T03:42:41.631Z",
      "tag_id": 1
    },
    {
      "id": 2,
      "title": "Eat lunch",
      "done": false,
      "created_at": "2019-01-21T03:42:47.966Z",
      "updated_at": "2019-01-21T03:42:47.966Z",
      "tag_id": 1
    }
  ]
  ```

  </p>
</details>

### Create a task
<details>
  <summary>Request</summary>
  <p>

  ```json
  POST /api/tasks

  {
    "task": {
      "title": "Eat breakfast",
      "done": false,
      "tag_id": 1
    }
  }
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  201 Created

  {
    "id": 1,
    "title": "Eat breakfast",
    "done": false,
    "created_at": "2019-01-21T03:37:26.166Z",
    "updated_at": "2019-01-21T03:37:26.166Z",
    "tag_id": 1
  }
  ```

  </p>
</details>

### Read a task
<details>
  <summary>Request</summary>
  <p>

  ```
  GET /api/tasks/:id
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK

  {
    "id": 1,
    "title": "Eat breakfast",
    "done": false,
    "created_at": "2019-01-21T03:37:26.166Z",
    "updated_at": "2019-01-21T03:37:26.166Z",
    "tag_id": 1
  }
  ```

  </p>
</details>

### Update a task
<details>
  <summary>Request</summary>
  <p>

  ```json
  PUT /api/tasks/:id

  {
    "task": {
      "id": 1,
      "title": "Eat lunch",
      "done": false,
      "created_at": "2019-01-21T03:37:26.166Z",
      "updated_at": "2019-01-21T03:37:26.166Z",
      "tag_id": 1
    }
  }
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK

  {
    "id": 1,
    "title": "Eat lunch",
    "done": false,
    "tag_id": 1,
    "created_at": "2019-01-21T03:37:26.166Z",
    "updated_at": "2019-01-21T03:39:32.939Z"
  }
  ```

  </p>
</details>

### Delete a task
<details>
  <summary>Request</summary>
  <p>

  ```
  DELETE /api/tasks/:id
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK
  ```

  </p>
</details>

### Read all tags
<details>
  <summary>Request</summary>
  <p>

  ```
  GET /api/tags
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK

  [
    {
      "id": 1,
      "title": "meals",
      "created_at": "2019-01-21T03:37:02.839Z",
      "updated_at": "2019-01-21T03:37:02.839Z"
    },
    {
      "id": 2,
      "title": "homework",
      "created_at": "2019-01-21T03:44:37.477Z",
      "updated_at": "2019-01-21T03:44:37.477Z"
    }
  ]
  ```

  </p>
</details>

### Create a tag
<details>
  <summary>Request</summary>
  <p>

  ```json
  POST /api/tags

  {
    "tag": {
      "title": "homework"
    }
  }
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  201 Created

  {
    "id": 2,
    "title": "homework",
    "created_at": "2019-01-21T03:44:37.477Z",
    "updated_at": "2019-01-21T03:44:37.477Z"
  }
  ```

  </p>
</details>

### Delete a tag
<details>
  <summary>Request</summary>
  <p>

  ```
  DELETE /api/tags/:id
  ```

  </p>
</details>

<details>
  <summary>Response</summary>
  <p>

  ```json
  200 OK
  ```

  </p>
</details>
