# Editor spec

## DBStore

### Editor
```
{
  "editor":{
      "email":"emample@bpm.com", // cheif editor默认admin@bpm.com
      "id":123456789,
      "editorName":"editor", // cheif editor默认admin
      "password":"bpmbpmbpm", // cheif editor默认admin
      "maxReview":10,
      "toReview":[{
          "id":123456789,
          "title":"title1",
          "author":"aaaa"
      }]
  }
}
```
## API
### Editor

#### Login

`POST /api/editor/login`

request body:
```
{
  "editor":{
     "editorName":"editor", // cheif editor默认admin
     "password":"bpmbpmbpm", // cheif editor默认admin
  }
}
```

#### GetReviewList

`GET /api/editor/reviewList/:editorID`

return example:
```
  {
     "reviewList":[{
     "id":123456789,
     "title":"title1",
     "body":"this is a example",
     "author":"author1"
     },
     {
     "id":123456789,
     "title":"title2",
     "body":"this is a example",
     "author":"author2"
     },
     ...]
  }
```

#### review

`POST /api/editor/review`

request body example:
```
{
  "review":{
      "id":123456789,
      "editorName":{
        "id":123456,
        "status":"accept",
        "remark":"this article is too low,kick it out"
      }
  }
}
```

### ChiefEditor
#### getAvaliableEditors

`GET /api/chiefEditor/editors`

return example:
```
{     
    "editors":["editorName1","editorName2",...]
}
```
#### assignEditor

`POST /api/chiefEditor/assign`

request body example:
```
{
  "article":{
      "id":123456789,
      "editor1ID":123456,
      "editor2ID":654321
  }
}
```
