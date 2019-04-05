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

