import { ActivitiesList } from "../cmps/ActivitiesList.jsx";
import { userService } from "../services/user.service.js";
const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;

export function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    userService
      .getById(params.userId)
      .then(setUser)
      .catch((err) => {
        console.log("User not found", err);
      })
      .finally(() => {
        console.log("User:", user);
      });
  }, []);
  return (
    user &&
    <section>
      <h1>Hello there {user.fullname}!</h1>
      <h3>Sorry we meant {user.username}...</h3>
      <h2>This is your data</h2>
      <form>
        <h2>Details:</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={user.fullname} />
        <label htmlFor="email">Color:</label>
        <input type="color" id="color" name="color" value={user.color} />
        <label htmlFor="birthDate">BGColor:</label>
        <input type="color" id="bgColor" name="bgColor" value={user.bgColor} />
      </form>
      <ActivitiesList activities={user.activities} />
    </section>
  );
}
