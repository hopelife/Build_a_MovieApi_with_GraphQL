# Build_a_MovieApi_with_GraphQL

[Build a MovieApi with GraphQL](https://academy.nomadcoders.co/courses/357405/lectures/5476213)

## settings

### 개발환경
- OS: OSX
- language: nodejs
- editor: Visual Studio Code
- requirements:
  - 
  - 

### github
- 원격저장소 생성: hopelife/Build_a_MovieApi_with_GraphQL

- 원격저장소 복제(로컬저장소 생성)
```
/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders$ git clone https://github.com/hopelife/Build_a_MovieApi_with_GraphQL.git
```

- .ignore
```
# Yarn integrity file
.yarn-integrity

# dotenv environment variable file
.environment
dist

# git
.git

# node
node_modules
```

- yarn init
```
/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn init

/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn add graphql-yoga

/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn global add nodemon

/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn add babel-node --dev

/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn global add babel-cli --ignore-engines

/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
```



### Visual Studio Code 환경 설정
- GraphQL for VSCode(마켓플레이스) 설치



### .babelrc
```
{
	"presets": ["env", "stage-3"]
}
```

### index.js
```
import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({
  
})

server.start(() => console.log("Graphql Server Running"));
```

### yarn start
```
/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ yarn start


throw new Error('No schema defined');

Error: No schema defined
```

### graphql 디렉토리/파일 생성
- 디렉토리 생성
```
/Volumes/data/dev/SynologyDrive/training/lecture/nomadcoders/Build_a_MovieApi_with_GraphQL$ mkdir graphql
```

#### 파일 생성
- schema.graphql : Query / Mutation / Object 정의
  - Query: 서버-클라이언트 주고받는 정보
    - name: String! # '!': 필수 정보
  - Mutation: 서버, 메모리 등의 변형(변경)을 요구하는 정보

```
type Query {
    name: String!
}
```

- resolvers.js : Query를 해결하는 방법?
  - 
```
const resolvers = {
    Query: {
        name: () => 'Moon Jungsam'
    }
};

export default resolvers;
```


### index.js 수정
```
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
})

server.start(() => console.log("Graphql Server Running"));
```


### 브라우저 확인

```
http://localhost:4000/

# query

query {
  name
}


# response

{
  "data": {
    "name": "Moon Jungsam"
  }
}
```

## #5 Extending the Schema

### schema.graphql

```
type Person {
    name: String!
    age: Int!
    gender: String!
}

type Query {
    person: Person!
}
```

### resolvers.js

```
type Person {
    name: String!
    age: Int!
    gender: String!
}

type Query {
    person: Person!
}
```


### 브라우저 확인

```
http://localhost:4000/

# query

query {
  person {
    name
  }
}



# response

{
  "data": {
    "person": {
      "name": "Moon"
    }
  }
}
```

## #6 Extending the Schema part Two

### schema.graphql

```
type Person {
    id: Int!
    name: String!
    age: Int!
    gender: String!
}

type Query {
    people: [Person]!
    person(id: Int!): Person!
}
```

### db.js 생성
```
export const people = [
  {
      id: 1,
      name: "Moon",
      age: 50,
      gender: "male"
  },
  {
      id: 2,
      name: "Ann",
      age: 16,
      gender: "female"
  },
  {
      id: 3,
      name: "Nicolas",
      age: 23,
      gender: "male"
  }
];

export const getById = id => {
    const filteredPeople = people.filter(person => people.id === id );
    return filteredPeople[0]
}
```


### resolvers.js

```
import { people, getById } from "./db";

const resolvers = {
  Query: {
      people: () => people,
      person: () => getById()
  }
};

export default resolvers;
```


### 브라우저 확인

```
http://localhost:4000/

# query
query {
  people {
    id
    name
    gender
  }
}



# response
{
  "data": {
    "person": {
      "name": "Moon"
    }
  }
}
```


## #7 Creating Queries with Arguments

### schema.graphql

```
type Person {
    id: Int!
    name: String!
    age: Int!
    gender: String!
}

type Query {
    people: [Person]!
    person(id: Int!): Person!
}
```

### db.js
```
export const people = [
  {
      id: 1,
      name: "Moon",
      age: 50,
      gender: "male"
  },
  {
      id: 2,
      name: "Ann",
      age: 16,
      gender: "female"
  },
  {
      id: 3,
      name: "Nicolas",
      age: 23,
      gender: "male"
  }
];

export const getById = id => {
    const filteredPeople = people.filter(person => person.id === id );
    return filteredPeople[0]
}
```

### resolvers.js
```
import { people, getById } from "./db";

const resolvers = {
  Query: {
      people: () => people,
      person: (_, {id}) => getById(id)
  }
};

export default resolvers;
```


### 브라우저 확인

```
http://localhost:4000/

# query
query {
  person(id: 2) {
    gender
    name
  }
}




# response
{
  "data": {
    "person": {
      "gender": "female",
      "name": "Ann"
    }
  }
}
```

