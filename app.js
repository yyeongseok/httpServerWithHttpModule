const http = require('http');
const server = http.createServer();

const users = [
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  const posts = [
    {
      id: 1,
      title: "간단한 HTTP API 개발 시작!",
      content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      userId: 1,
    },
    {
      id: 2,
      title: "HTTP의 특성",
      content: "Request/Response와 Stateless!!",
      userId: 1,
    },
  ];
  const datas = [
    {
      userID: 1,
      UserName: "Rebakah Johnson",
      postingId: 1,
      postingTitle: "간단한 HTTP API 개발 시작!",
      postungContent: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현."
    },
    {
      userID: 2,
      UserName: "Fabian Predovic",
      postingId: 2,
      postingTitle: "HTTP의 속성",
      postungContent: "Request/Response와 Stateless!!"
    }
  ]

  const httpRequestListener = function (request, response){
    const { url, method } = request
    //console.log(url, method);

    if (method === 'POST'){
        if (url === "/users/signup"){
            let body = "";

            request.on("data", (data) => {
                body += data;
            });

            request.on("end", () => {
                const user =JSON.parse(body);

                users.push({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                });
                response.writeHead(200, { "Content-Type": "application/json" });
                response.end(JSON.stringify({message:"Userscreated" }));
            });
        }
    } 
    else if (method === 'POST'){
      if (url === "/posts"){
        let body ="";

        request.on("data", (data)=>{
          body += data;
        });

        request.on ("end", () => {
          const post = JSON.parse(body);

          posts.push({
            id: post.id,
            title: post.title,
            content: post.content,
            userId: post.userId,
          });
          response.writeHead(200, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message : "postCreated "}));
        })
      }
    } else if(method === "GET"){
       if (url === "/inquiry"){
          response.writeHead(200, {"Content-Type": "application/json"});
          response.end(JSON.stringify({"data" : datas}))
          }
         }else if(method === "PATCH"){ //메소드 patch 
          if(url.startsWith("/datas/")){ // startsWith ()안에 참/거짓을 확인후 배열로 나온다?
          let body ="";

          request.on ("data", (data)=>{
            body += data;
          });
          request.on("end",()=>{
            const inputpost = JSON.parse(body);
            const postID= Number(url.split("/")[2]); // 위에서 불러온 url을 split / 으로 나누고 배열 2번째 객체를 숫자로 선언한다.
            const post = posts.find((post)=> {return post.id === postID});

            post.content = inputpost.content;

            response.writeHead(200, {"content-Type":"application/json"});
            response.end(JSON.stringify({
              id: post.id,
              title: post.title,
              content : post.content,
            }))
          })
          }
         }

  }
  server.on ("request", httpRequestListener)

  const IP = '127.0.0.1'
  const PORT = 8001

  server.listen(PORT, IP, function(){
    console.log(`Listening to request on ip ${IP} & port ${PORT}`)
  })

