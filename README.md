# fidzulu-backend6-laptops

**GET** `'/toys?location=<location>'` - Returns a list of all toys.
Location = US-NC, IN or IE.

```json
[
    {
     "name": "string",
     "brand": "string",
     "age-group": "string",
     "prize": number
    },
]
```

**GET** `'/toys/team'` - Returns a JSON object with team and member names.

```json
{
  "team": "string",
  "membersNames": ["string", "array"]
}
```

**POST** `'/toys'` - Add a new toy to the dataset.

```json
{
    "name": "string",
    "brand": "string",
    "age-group": "string",
    "prize": number
}
```
