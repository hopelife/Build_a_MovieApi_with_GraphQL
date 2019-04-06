# Build_a_MovieApi_with_GraphQL

## reference urls
- 강의: [Build a MovieApi with GraphQL](https://academy.nomadcoders.co/courses/357405/lectures/5476213)

- 저장소: [Github nomadcorders movieql](https://github.com/nomadcoders/movieql)

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

## 강의

## #1 Hello and Introduction
- [github #1](https://github.com/nomadcoders/movieql/tree/6e080ec546e8457915eb05e2ee22eacf03e8d5a8)

## #2 Problems solved by GraphQL


## #3 Creating a GraphQL Server with GraphQL Yoga
- [github #3]()

## #4 Creating the first Query and Resolver
- [github #4]()



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
- [github #5]()

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
- [github #6]()

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
- [github #7]()

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


## #8 Defining Mutations
- [github #8](https://github.com/nomadcoders/movieql/tree/8ef9716d55883eccc4d8590c1adecab82c0892fa)

### schema.graphql

```
type Movie {
  id: Int!
  name: String!
  score: Int!
}

type Query {
  movies: [Movie]!
  movie(id: Int!): Movie
}

type Mutation {
  addMovie(score: Int!, name: String!): Movie!
}
```

### db.js
```
let movies = [
  {
    id: 0,
    name: "Star Wars - The new one",
    score: 1
  },
  {
    id: 1,
    name: "Avengers - The new one",
    score: 8
  },
  {
    id: 2,
    name: "The Godfather I",
    score: 99
  },
  {
    id: 3,
    name: "Logan",
    score: 2
  }
];

export const getMovies = () => movies;

export const getById = id => {
  const filteredMovies = movies.filter(movie => movie.id === String(id));
  return filteredMovies[0];
};

export const deleteMovie = id => {
  const cleanedMovies = movies.filter(movie => movie.id !== String(id));
  if (movies.length > cleanedMovies.length) {
    movies = cleanedMovies;
    return true;
  } else {
    return false;
  }
};

export const addMovie = (name, score) => {
  const newMovie = {
    id: `${movies.length + 1}`,
    name,
    score
  };
  movies.push(newMovie);
  return newMovie;
};
```

### resolvers.js
```
import { getMovies, getById, addMovie } from "./db";

const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, { id }) => getById(id)
  },
  Mutation: {
    addMovie: (_, { name, score }) => addMovie(name, score)
  }
};

export default resolvers;
```


### 브라우저 확인

```
http://localhost:4000/

# query
query {
  movies {
    name
    score
  }
}


# response
{
  "data": {
    "movies": [
      {
        "name": "Star Wars - The new one",
        "score": 1
      },
      {
        "name": "Avengers - The new one",
        "score": 8
      },
      {
        "name": "The Godfather I",
        "score": 99
      },
      {
        "name": "Logan",
        "score": 2
      }
    ]
  }
}
```


## #9 Creating first Mutation
- [github #9]()

### schema.graphql
```

```

### resolves.js
```

```

### db.js
```

```

### 브라우저 확인

```
http://localhost:4000/

# query



# response

```



## #10 Delete Mutation
- [github #10]()

### schema.graphql
```

```

### resolves.js
```

```

### db.js
```

```

### 브라우저 확인

```
http://localhost:4000/

# query



# response

```

## #11 Wrapping a REST API with GraphQL Part One
- [github #11]()

### schema.graphql
```

```

### resolves.js
```

```

### db.js
```

```

### 브라우저 확인

```
http://localhost:4000/

# query



# response

```

## #12 Wrapping a REST API with GraphQL Part Two
- [github #12]()

### schema.graphql
```

```

### resolves.js
```

```

### db.js
```

```

### 브라우저 확인

```
http://localhost:4000/

# query



# response

```

## Movie Suggestions


## getMovies and getMovie. Axios. Async


## 



