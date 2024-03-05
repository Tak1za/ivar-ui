export class UserService {
  createUser = (id: string, username: string) => {
    return fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, username }),
    }).catch((e) => console.error(e));
  };
}
