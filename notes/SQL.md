# SQL

Notes regarding SQL

# Prepared Statement vs Statement

It is best practice to use PreparedStatements

Statement - used to execute string-based SQL queries
PreparedStatement - used to execute parameterized SQL queries

## Statments

Statement Queries examples:

JAVA

````java
    String query = "INSERT INTO persons(id, name) VALUES(" + personEntity.getId() + ", '"
    ```
````

JAVASCRIPT

```javascript
const userId = 5;
const query = `SELECT * FROM users WHERE id = ${userId}`;
```

Hence Statements are pure strings that can use string interpolation.

**Statements are prone to SQL injection risk**

## PreparedStatements

PrepareStatement Queries Example:

JAVA

```java
   String query = "INSERT INTO persons(id, name) VALUES( ?, ?)";

    PreparedStatement preparedStatement = connection.prepareStatement(query);
    preparedStatement.setInt(1, personEntity.getId());
    preparedStatement.setString(2, personEntity.getName());
    preparedStatement.executeUpdate();
```

```javascript
const userId = 5;
const query = `SELECT * FROM users WHERE id = ${userId}`;
connection.query(query, (err, results) => {
  // handle results
});
```
